import { createClient } from '@supabase/supabase-js';

// Cấu hình Supabase cố định của hệ thống phòng khám HH Dental CRM
export const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || 
  'https://cbumyrnukqqznfizcgwi.supabase.co';

export const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || 
  'sb_publishable_9HMdUlPmoyyVvGClSVUG7Q_pYyxErsI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Kiểm tra Mã CTV / Số điện thoại từ bảng `partners`
 * Query chuẩn: select id, code, name, phone, title, status from partners where (code = :input or phone = :input) and status = 'ACTIVE'
 */
export async function verifyPartner(input) {
  if (!input || !input.trim()) {
    return {
      success: false,
      error: 'Vui lòng nhập Mã đối tác (Ref Code) hoặc Số điện thoại.',
      partner: null,
    };
  }

  const cleanInput = input.trim();
  const upperCode = cleanInput.toUpperCase();

  try {
    const { data, error } = await supabase
      .from('partners')
      .select('id, code, name, phone, title, status')
      .or(`code.eq.${upperCode},code.eq.${cleanInput},phone.eq.${cleanInput}`)
      .eq('status', 'ACTIVE')
      .limit(1);

    if (error) {
      console.error('Supabase query error:', error);
      return {
        success: false,
        error: 'Lỗi truy vấn hệ thống đối tác: ' + error.message,
        partner: null,
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: 'Mã đối tác hoặc Số điện thoại chưa được đăng ký trong hệ thống.',
        partner: null,
      };
    }

    return {
      success: true,
      error: null,
      partner: data[0],
    };
  } catch (err) {
    console.error('Network or client error verifying partner:', err);
    return {
      success: false,
      error: 'Không thể kết nối máy chủ xác thực: ' + (err.message || 'Lỗi không xác định'),
      partner: null,
    };
  }
}

/**
 * Đăng ký đặt lịch khách hàng gắn liền với CTV (owner_partner_id)
 * Tự động chèn khách hàng mới vào bảng `customers` với status = 'lead'
 */
export async function createBookingCustomer({ name, phone, treatment, appointmentDate, appointmentTime, note, refCode }) {
  if (!name || !name.trim()) {
    return { success: false, error: 'Vui lòng nhập họ và tên của bạn.' };
  }
  if (!phone || !phone.trim()) {
    return { success: false, error: 'Vui lòng nhập số điện thoại liên hệ.' };
  }

  // 1. Kiểm tra đối tác bảo trợ qua refCode nếu có
  let partnerId = null;
  let partnerCode = null;
  if (refCode && refCode.trim()) {
    const verified = await verifyPartner(refCode.trim());
    if (verified.success && verified.partner) {
      partnerId = verified.partner.id;
      partnerCode = verified.partner.code;
    }
  }

  // 2. Tạo mã khách hàng & mã booking chuyên nghiệp
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const customerCode = `KH-${year}-${randomSuffix}`;
  const bookingCode = `VIP-${year}-${randomSuffix}`;

  const treatmentText = treatment || 'Khám tổng quát & Chụp X-Quang 0đ';
  const fullNote = [
    appointmentDate ? `Ngày hẹn: ${appointmentDate}` : '',
    appointmentTime ? `Giờ: ${appointmentTime}` : '',
    note ? `Tình trạng: ${note}` : '',
    partnerCode ? `Mã CTV: ${partnerCode}` : '',
    `Mã đặt lịch: ${bookingCode}`,
  ].filter(Boolean).join(' | ');

  try {
    const { data, error } = await supabase
      .from('customers')
      .insert([
        {
          code: customerCode,
          name: name.trim(),
          phone: phone.trim(),
          owner_partner_id: partnerId,
          referrer_customer_id: null,
          depth: 1,
          treatment: `${treatmentText} [${fullNote}]`,
          status: 'lead', // Khách mới chuyển ngay sang danh sách chờ khám của Lễ tân
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Lỗi khi lưu khách hàng vào Supabase:', error);
      return {
        success: false,
        error: 'Lỗi ghi nhận đặt lịch: ' + error.message,
      };
    }

    return {
      success: true,
      bookingCode,
      customer: data,
      partnerCode,
    };
  } catch (err) {
    console.error('Lỗi ngoại lệ khi đặt lịch:', err);
    return {
      success: false,
      error: 'Không thể kết nối máy chủ đặt lịch: ' + (err.message || 'Lỗi không xác định'),
    };
  }
}

/**
 * LẤY DANH SÁCH CHỜ KHÁM DÀNH CHO USER LỄ TÂN (CRM RECEPTION DESK)
 * Bao gồm thông tin đối tác bảo trợ để tự động gắn CTV nhận 20%
 */
export async function fetchReceptionWaitingList() {
  try {
    const [cRes, pRes] = await Promise.all([
      supabase.from('customers').select('*').order('created_at', { ascending: false }).limit(100),
      supabase.from('partners').select('id, code, name, phone, status'),
    ]);

    if (cRes.error) {
      console.error('Error fetching customers:', cRes.error);
      return { success: false, error: cRes.error.message, data: [] };
    }

    const partnersMap = new Map((pRes.data || []).map(p => [p.id, p]));

    const waitingList = (cRes.data || []).map(c => {
      const owner = c.owner_partner_id ? partnersMap.get(c.owner_partner_id) : null;
      return {
        ...c,
        partnerCode: owner ? owner.code : null,
        partnerName: owner ? owner.name : null,
      };
    });

    return {
      success: true,
      data: waitingList,
    };
  } catch (err) {
    console.error('Error in fetchReceptionWaitingList:', err);
    return { success: false, error: err.message, data: [] };
  }
}

/**
 * CẬP NHẬT TRẠNG THÁI KHÁCH HÀNG TẠI QUẦY LỄ TÂN
 * status: 'lead' (Chờ khám) | 'consulting' (Đang tư vấn) | 'treating' (Đang điều trị) | 'completed' (Đã xong)
 */
export async function updateCustomerStatus(customerId, newStatus) {
  try {
    const { data, error } = await supabase
      .from('customers')
      .update({ status: newStatus })
      .eq('id', customerId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export default supabase;
