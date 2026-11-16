import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  PhoneCall, 
  MapPin, 
  Gift, 
  Check, 
  QrCode,
  Tag
} from 'lucide-react';
import { verifyPartner, createBookingCustomer } from '../lib/supabase';

export default function BookingPage({ initialRefCode, onBackToGenerator, onBackToWebsite, onGoToReception }) {
  // 1. Đọc tham số `?ref=...` từ URL
  const [refCode, setRefCode] = useState('');
  const [partner, setPartner] = useState(null);
  const [verifyingRef, setVerifyingRef] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: 'Khám tổng quát & Chụp X-Quang 0đ',
    appointmentDate: '',
    appointmentTime: '09:00',
    note: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Danh mục dịch vụ phổ biến
  const popularServices = [
    { id: 'kham-0d', name: 'Khám & Chụp X-Quang 0đ', badge: 'Quà tặng 0đ' },
    { id: 'rang-su', name: 'Răng Sứ Thẩm Mỹ', badge: 'Giảm 500k' },
    { id: 'nieng-rang', name: 'Niềng Răng Invisalign / Mắc Cài', badge: 'Giảm 500k' },
    { id: 'implant', name: 'Trồng Răng Implant', badge: 'Tặng trụ' },
    { id: 'nho-rang', name: 'Nhổ Răng Khôn Sóng Siêu Âm', badge: 'Không đau' },
    { id: 'tay-trang', name: 'Tẩy Trắng Răng Laser Whitening', badge: 'Sáng bóng' },
  ];

  const timeSlots = [
    '08:30', '09:30', '10:30', '11:30',
    '14:00', '15:00', '16:00', '17:30', '18:30'
  ];

  // Khởi tạo và đọc `?ref=...` từ window.location
  useEffect(() => {
    let codeFromUrl = initialRefCode || '';

    if (!codeFromUrl) {
      // Đọc từ query string ?ref=...
      const searchParams = new URLSearchParams(window.location.search);
      codeFromUrl = searchParams.get('ref') || '';
    }

    if (!codeFromUrl) {
      // Đọc từ hash nếu dạng #/dat-lich?ref=...
      const hash = window.location.hash;
      if (hash.includes('?')) {
        const hashParams = new URLSearchParams(hash.split('?')[1]);
        codeFromUrl = hashParams.get('ref') || '';
      }
    }

    if (!codeFromUrl) {
      // Kiểm tra localStorage dự phòng
      codeFromUrl = localStorage.getItem('last_used_ref_code') || '';
    }

    if (codeFromUrl) {
      setRefCode(codeFromUrl);
      checkPartner(codeFromUrl);
    } else {
      setVerifyingRef(false);
    }

    // Mặc định ngày hẹn là ngày mai
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, appointmentDate: dateStr }));
  }, [initialRefCode]);

  const checkPartner = async (code) => {
    setVerifyingRef(true);
    const res = await verifyPartner(code);
    setVerifyingRef(false);
    if (res.success && res.partner) {
      setPartner(res.partner);
    } else {
      setPartner(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Vui lòng nhập Họ và tên.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 9) {
      setErrorMsg('Vui lòng nhập Số điện thoại hợp lệ để lễ tân liên hệ xác nhận.');
      return;
    }

    setSubmitting(true);

    const res = await createBookingCustomer({
      name: formData.name,
      phone: formData.phone,
      treatment: formData.treatment,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      note: formData.note,
      refCode: partner?.code || refCode,
    });

    setSubmitting(false);

    if (!res.success) {
      setErrorMsg(res.error);
    } else {
      setBookingSuccess(res);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  return (
    <div className="min-h-screen bg-ambient-mesh pb-20 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation Bar back to Website / Generator / Reception */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToWebsite}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-semibold transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Về Trang Chủ HH Dental</span>
            </button>
            <button
              type="button"
              onClick={onBackToGenerator}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Tạo Voucher CTV</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onGoToReception}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-semibold transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CRM Lễ Tân</span>
            </button>
          </div>
        </div>

        {/* ===================== TRƯỜNG HỢP: ĐÃ ĐẶT LỊCH THÀNH CÔNG ===================== */}
        {bookingSuccess ? (
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 text-center animate-fade-in border-teal-500/40">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-teal-950/50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Đặt Lịch Ưu Đãi Thành Công
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Chúc Mừng {formData.name}!
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
              Lễ tân HH Dental đã tiếp nhận thông tin và sẽ gọi điện cho bạn qua số <strong className="text-white font-mono">{formData.phone}</strong> trong vòng 15 phút để xác nhận giờ hẹn.
            </p>

            {/* Thẻ Vé Check-in Tiếp Nhận Điện Tử */}
            <div className="mt-8 p-6 rounded-2xl bg-black/40 border border-[#cfb06c]/30 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                    Mã Đặt Lịch Tiếp Nhận
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#f5d78e] mt-0.5">
                    {bookingSuccess.bookingCode}
                  </div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    Đã áp dụng Voucher Khám 0đ &amp; Giảm 500k
                  </div>
                </div>

                {/* QR Code Check-in tại quầy */}
                <div className="p-2.5 bg-white rounded-xl shadow-md shrink-0">
                  <QRCodeSVG
                    value={`HH-CHECKIN:${bookingSuccess.bookingCode}:${formData.phone}`}
                    size={90}
                    level="M"
                  />
                  <div className="text-[9px] font-mono text-center text-slate-800 font-bold mt-1">
                    QR LỄ TÂN
                  </div>
                </div>
              </div>

              {/* Thông tin chi tiết lịch hẹn */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Dịch vụ đăng ký:</span>
                  <span className="font-semibold text-white mt-0.5 block">{formData.treatment}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Thời gian hẹn:</span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {formData.appointmentTime} - Ngày {formData.appointmentDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Đối tác bảo trợ:</span>
                  <span className="font-semibold text-teal-300 mt-0.5 block">
                    {partner ? `Mã Đối Tác ${partner.code}` : 'HH Dental Partner'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Trạng thái hồ sơ:</span>
                  <span className="font-semibold text-amber-300 mt-0.5 block uppercase">
                    Đã ghi nhận CRM (Lead)
                  </span>
                </div>
              </div>

              {/* Địa chỉ & Hotline HH Dental */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>HH Dental: 251 Vĩnh Viễn, P.4, Q.10, TP.HCM</span>
                </div>
                <div className="flex items-center gap-1.5 text-teal-300 font-bold">
                  <PhoneCall className="w-4 h-4 text-teal-400 shrink-0" />
                  <a href="tel:0933989918" className="hover:underline">Hotline: 093 398 9918</a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setBookingSuccess(null);
                  setFormData({
                    name: '',
                    phone: '',
                    treatment: 'Khám tổng quát & Chụp X-Quang 0đ',
                    appointmentDate: '',
                    appointmentTime: '09:00',
                    note: '',
                  });
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold transition-all"
              >
                Đặt thêm lịch khác
              </button>

              <a
                href="https://hh-dental-crm.drminhdat-work.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Mở Hệ Thống CRM Live</span>
              </a>

              <button
                type="button"
                onClick={onGoToReception}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold transition-all"
              >
                Quầy Lễ Tân Nội Bộ
              </button>

              <button
                type="button"
                onClick={onBackToWebsite}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold transition-all"
              >
                Về Trang Chủ
              </button>
            </div>
          </div>
        ) : (
          /* ===================== FORM ĐIỀN ĐẶT LỊCH ===================== */
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-10">
            
            {/* Header Form */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-300 flex items-center justify-center mx-auto mb-3 shadow-md shadow-teal-950/50">
                <Calendar className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Đặt Lịch Khám &amp; Kích Hoạt Voucher
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
                Điền thông tin bên dưới để giữ chỗ và nhận trọn bộ quyền lợi VIP từ phòng khám HH Dental.
              </p>
            </div>

            {/* Banner hiển thị đối tác bảo trợ nếu có ref */}
            {partner ? (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-teal-950/60 to-emerald-950/40 border border-teal-500/40 text-teal-100 flex items-center gap-3.5 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold shrink-0">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-[#f5d78e]" />
                    Được Giới Thiệu Bởi Đối Tác
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    Mã đối tác: <span className="font-mono text-base px-2.5 py-0.5 rounded bg-black/40 text-[#f5d78e] border border-white/10 ml-1">{partner.code}</span>
                  </div>
                  <div className="text-[11px] text-teal-200/80 mt-0.5">
                    ✅ Nhận ngay: Khám 0đ + Voucher 500k dịch vụ sứ &amp; niềng răng
                  </div>
                </div>
              </div>
            ) : refCode ? (
              <div className="mb-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-xs flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#cfb06c]" />
                <span>Mã giới thiệu đang áp dụng: <strong className="font-mono text-white">{refCode}</strong></span>
              </div>
            ) : null}

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-950/50 border border-rose-800/50 text-rose-200 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Trường Họ và Tên */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Họ và Tên Khách Hàng <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              {/* Trường Số Điện Thoại */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Số Điện Thoại Liên Hệ <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ví dụ: 0912 345 678"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Chọn Dịch Vụ */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Dịch Vụ Bạn Quan Tâm <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                  {popularServices.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, treatment: srv.name })}
                      className={`p-3 rounded-2xl text-left border transition-all flex items-center justify-between ${
                        formData.treatment === srv.name
                          ? 'bg-teal-500/20 border-teal-500/50 text-white font-bold shadow-sm'
                          : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xs">{srv.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        formData.treatment === srv.name
                          ? 'bg-teal-400 text-slate-950'
                          : 'bg-white/10 text-slate-400'
                      }`}>
                        {srv.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ngày & Giờ Hẹn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Ngày Khám Mong Muốn
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <input
                      type="date"
                      value={formData.appointmentDate}
                      onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Khung Giờ Hẹn
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <select
                      value={formData.appointmentTime}
                      onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#0e1626] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-mono"
                    >
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Ghi Chú Tình Trạng Răng */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Tình Trạng Răng Miệng / Ghi Chú Thêm
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-4 pointer-events-none text-slate-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <textarea
                    rows={2}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Ví dụ: Răng hàm dưới bị ê buốt, muốn tư vấn bọc sứ răng cửa..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              {/* Hidden / Read-only Mã Ref */}
              <input type="hidden" name="ref" value={refCode} />

              {/* Nút Đăng Ký Đặt Lịch */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl font-extrabold text-base tracking-wide bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 text-slate-950 shadow-xl shadow-teal-500/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
              >
                {submitting ? (
                  <span>Đang Ghi Nhận Đặt Lịch...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Xác Nhận Đặt Lịch &amp; Giữ Ưu Đãi 0đ</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-400 mt-2">
                🔒 Thông tin của bạn được bảo mật theo tiêu chuẩn y tế. Không phát sinh chi phí khi chưa đồng ý.
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

