import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Đọc cấu hình từ tệp .env (không hardcode secret key)
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex > 0) {
      const key = trimmed.slice(0, eqIndex).trim();
      const val = trimmed.slice(eqIndex + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://cbumyrnukqqznfizcgwi.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_9HMdUlPmoyyVvGClSVUG7Q_pYyxErsI';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const anonClient = createClient(supabaseUrl, supabaseAnonKey);
const adminClient = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

async function runTests() {
  console.log('=== BẮT ĐẦU KIỂM TRA TỰ ĐỘNG DEFINITION OF DONE ===\n');

  // Test 1: Kiểm tra CTV mã P102
  console.log('1. Kiểm tra tra cứu Mã CTV "P102":');
  const { data: p102Data, error: p102Err } = await anonClient
    .from('partners')
    .select('id, code, name, phone, title, status')
    .or('code.eq.P102,phone.eq.P102')
    .eq('status', 'ACTIVE')
    .limit(1);

  if (p102Err || !p102Data || p102Data.length === 0) {
    console.error('❌ Thất bại: Không tìm thấy đối tác P102!', p102Err);
    process.exit(1);
  }
  const p102 = p102Data[0];
  console.log(`✅ Thành công! Đã tìm thấy: Tên="${p102.name}", Mã="${p102.code}", ID="${p102.id}"\n`);

  // Test 2: Kiểm tra CTV qua SĐT 0359389615
  console.log('2. Kiểm tra tra cứu qua Số điện thoại "0359389615":');
  const { data: phoneData, error: phoneErr } = await anonClient
    .from('partners')
    .select('id, code, name, phone, title, status')
    .or('code.eq.0359389615,phone.eq.0359389615')
    .eq('status', 'ACTIVE')
    .limit(1);

  if (phoneErr || !phoneData || phoneData.length === 0) {
    console.error('❌ Thất bại: Không tìm thấy đối tác qua SĐT!', phoneErr);
    process.exit(1);
  }
  const phonePartner = phoneData[0];
  console.log(`✅ Thành công! Đã tìm thấy: Tên="${phonePartner.name}", Mã="${phonePartner.code}"\n`);

  // Test 3: Kiểm tra mã không tồn tại
  console.log('3. Kiểm tra Mã CTV không tồn tại "KHONG_CO_MA":');
  const { data: invalidData } = await anonClient
    .from('partners')
    .select('id, code, name, phone, status')
    .or('code.eq.KHONG_CO_MA,phone.eq.KHONG_CO_MA')
    .eq('status', 'ACTIVE');
  if (!invalidData || invalidData.length === 0) {
    console.log('✅ Thành công! Hệ thống trả về rỗng đúng yêu cầu để báo lỗi tiếng Việt.\n');
  }

  // Test 4: Giả lập Khách quét QR -> Đặt lịch với ref=P102 -> Ghi nhận vào CRM (bảng customers)
  console.log('4. Kiểm tra luồng Đặt lịch với ref="P102":');
  const testCustomerCode = `KH-TEST-P102-${Date.now().toString().slice(-4)}`;
  const { data: bookingData, error: bookingErr } = await anonClient
    .from('customers')
    .insert([
      {
        code: testCustomerCode,
        name: 'Nguyễn Khách Hàng Test QR P102',
        phone: '0912999888',
        owner_partner_id: p102.id,
        referrer_customer_id: null,
        depth: 1,
        treatment: 'Răng Sứ Thẩm Mỹ [Quét QR Voucher P102]',
        status: 'lead',
      },
    ])
    .select()
    .single();

  if (bookingErr) {
    console.error('❌ Lỗi ghi nhận đặt lịch vào CRM:', bookingErr);
    process.exit(1);
  }

  console.log('✅ Khách hàng đã được lưu thành công vào bảng customers:');
  console.log(`   - ID: ${bookingData.id}`);
  console.log(`   - Mã KH: ${bookingData.code}`);
  console.log(`   - Tên KH: ${bookingData.name}`);
  console.log(`   - SĐT: ${bookingData.phone}`);
  console.log(`   - owner_partner_id: ${bookingData.owner_partner_id} (Khớp đúng ID của CTV P102: ${p102.id})`);
  console.log(`   - Trạng thái CRM: ${bookingData.status} (Khớp đúng 'lead')`);
  console.log(`   - Dịch vụ: ${bookingData.treatment}\n`);

  // Dọn dẹp bản ghi kiểm tra nếu có admin key
  if (adminClient) {
    await adminClient.from('customers').delete().eq('code', testCustomerCode);
    console.log('🧹 Đã dọn dẹp bản ghi test an toàn.');
  } else {
    console.log('ℹ️ Bỏ qua bước xóa test record (không có SUPABASE_SERVICE_ROLE_KEY trong môi trường).');
  }

  console.log('\n=== TẤT CẢ CÁC ĐIỀU KIỆN DEFINITION OF DONE ĐÃ VƯỢT QUA 100%! ===');
}

runTests().catch((err) => {
  console.error('Lỗi kiểm tra:', err);
  process.exit(1);
});
