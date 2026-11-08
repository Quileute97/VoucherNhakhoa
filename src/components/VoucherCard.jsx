import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Sparkles, Award, QrCode } from 'lucide-react';

/**
 * Thẻ VIP / Voucher Ticket Card chuyên nghiệp cho CTV Nha khoa HH Dental
 * Chuẩn tỷ lệ VIP Boarding Pass / Ticket (khoảng 2:1 hoặc 16:9)
 * Thiết kế sang trọng lấy cảm hứng từ 1Human.at (Dark Luxury, Gold / Medical Cyan accents)
 */
export const VoucherCard = forwardRef(({ partner, theme = 'obsidian-gold', qrTargetUrl }, ref) => {
  const partnerName = partner?.name || 'Đối Tác Nha Khoa';
  const partnerCode = partner?.code || 'HH-VIP';
  const partnerTitle = partner?.title || 'Cộng Tác Viên Chính Thức';
  
  // URL mã hóa vào QR Code
  const qrUrl = qrTargetUrl || `${window.location.origin}/dat-lich?ref=${partnerCode}`;

  // Mã định danh vé VIP độc quyền
  const ticketSerial = `VIP-${partnerCode}-${new Date().getFullYear()}`;

  // Cấu hình chủ đề màu sắc sang trọng
  const themeStyles = {
    'obsidian-gold': {
      cardBg: 'bg-gradient-to-br from-[#0c0f17] via-[#111827] to-[#080b11]',
      border: 'border-[#cfb06c]/40',
      glow: 'shadow-[0_20px_60px_-15px_rgba(207,176,108,0.25)]',
      accentText: 'text-[#f5d78e]',
      accentBg: 'bg-[#cfb06c]/15 text-[#f5d78e] border-[#cfb06c]/30',
      pillBg: 'bg-gradient-to-r from-[#dec993]/20 via-[#cfb06c]/10 to-transparent border-[#cfb06c]/30',
      divider: 'border-[#cfb06c]/25',
      qrBg: 'bg-white',
      badgeGradient: 'from-[#e4c987] via-[#f7e7b4] to-[#caa050] text-[#1a1305]',
      subtleText: 'text-slate-400',
    },
    'medical-cyan': {
      cardBg: 'bg-gradient-to-br from-[#081b24] via-[#0f2938] to-[#041017]',
      border: 'border-teal-400/40',
      glow: 'shadow-[0_20px_60px_-15px_rgba(20,184,166,0.3)]',
      accentText: 'text-teal-300',
      accentBg: 'bg-teal-500/15 text-teal-300 border-teal-400/30',
      pillBg: 'bg-gradient-to-r from-teal-500/20 via-teal-500/10 to-transparent border-teal-400/30',
      divider: 'border-teal-400/25',
      qrBg: 'bg-white',
      badgeGradient: 'from-teal-300 via-emerald-200 to-teal-400 text-[#04201d]',
      subtleText: 'text-slate-400',
    },
    'sapphire-royal': {
      cardBg: 'bg-gradient-to-br from-[#0a1128] via-[#101f42] to-[#060b18]',
      border: 'border-blue-400/40',
      glow: 'shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]',
      accentText: 'text-blue-300',
      accentBg: 'bg-blue-500/15 text-blue-300 border-blue-400/30',
      pillBg: 'bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent border-blue-400/30',
      divider: 'border-blue-400/25',
      qrBg: 'bg-white',
      badgeGradient: 'from-blue-300 via-indigo-200 to-sky-400 text-[#051329]',
      subtleText: 'text-slate-400',
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles['obsidian-gold'];

  return (
    <div
      ref={ref}
      id="voucher-ticket-node"
      className={`relative w-full max-w-[850px] mx-auto rounded-3xl overflow-hidden border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.glow} transition-all duration-300 select-none`}
      style={{
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px -10px rgba(207, 176, 108, 0.15)',
      }}
    >
      {/* Background ambient lighting pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(207,176,108,0.08),transparent_50%)]" />
      
      {/* Holographic top accent strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#cfb06c] to-teal-400 opacity-90" />

      {/* Main Ticket Grid: Left (Offers & Sponsor) + Right (QR Code stub) */}
      <div className="relative flex flex-col md:flex-row items-stretch">
        
        {/* ===================== PHẦN TRÁI: THÔNG TIN ƯU ĐÃI & CTV (68%) ===================== */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between relative z-10">
          
          {/* Header nha khoa & Badge VIP */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#134e4a] to-[#042f2e] border border-teal-500/40 p-1 flex items-center justify-center shadow-lg shadow-teal-950/50">
                  <img
                    src="/logo.png"
                    alt="HH Dental Clinic"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback icon if logo image fails
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span class="text-teal-400 font-bold text-lg font-serif">HH</span>';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-extrabold text-lg sm:text-xl tracking-tight text-white uppercase">
                      HH Dental Clinic
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
                      Official Partner
                    </span>
                  </div>
                  <p className="text-[11px] tracking-widest uppercase text-slate-400 font-medium">
                    Hệ Thống Nha Khoa Thẩm Mỹ Quốc Tế
                  </p>
                </div>
              </div>

              {/* VIP Gold Tag */}
              <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r ${currentTheme.badgeGradient} shadow-md`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special VIP Ticket</span>
              </div>
            </div>

            {/* Tiêu đề Voucher Ưu Đãi */}
            <div className="mt-3">
              <div className="text-[11px] tracking-widest uppercase font-semibold text-[#cfb06c] flex items-center gap-1.5 mb-1">
                <Award className="w-3.5 h-3.5" />
                Voucher Ưu Đãi Đặc Quyền Khách Hàng Mới
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                VOUCHER ƯU ĐÃI ĐẶC BIỆT
              </h2>
            </div>

            {/* Khung 2 Quyền Lợi Vàng (Highlights) */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Quyền lợi 1 */}
              <div className="rounded-2xl p-3 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm flex items-start gap-3 hover:border-teal-400/30 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-teal-300 font-bold text-xs">0đ</span>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-teal-400">
                    Quyền Lợi 1
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                    MIỄN PHÍ Khám &amp; Chụp X-Quang CT Cone Beam
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Trị giá 500.000đ tại phòng khám</div>
                </div>
              </div>

              {/* Quyền lợi 2 */}
              <div className="rounded-2xl p-3 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm flex items-start gap-3 hover:border-[#cfb06c]/40 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-[#cfb06c]/20 border border-[#cfb06c]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#f5d78e] font-bold text-xs">-500k</span>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#cfb06c]">
                    Quyền Lợi 2
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                    TẶNG 500.000đ Dịch Vụ Sứ &amp; Niềng Răng
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Áp dụng trực tiếp vào hóa đơn</div>
                </div>
              </div>
            </div>
          </div>

          {/* Phần Người Giới Thiệu & Điều Kiện Áp Dụng */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#cfb06c] to-amber-200 text-slate-950 font-bold flex items-center justify-center shadow-sm text-xs shrink-0 font-mono">
                ID
              </div>
              <div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  Được tài trợ bởi Đối tác:
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400 inline" />
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-white/10 text-[#f5d78e] border border-white/10 font-bold">
                    Mã CTV: {partnerCode}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[10.5px] text-slate-400 max-w-xs leading-relaxed italic bg-black/20 px-3 py-1.5 rounded-xl border border-white/5">
              * Vui lòng xuất trình voucher này tại quầy lễ tân khi làm thủ tục.
            </div>
          </div>
        </div>

        {/* ===================== RĂNH XÉ PERFORATION DIVIDER ===================== */}
        <div className="relative hidden md:flex flex-col items-center justify-between py-3">
          {/* Khuyết tròn trên (Ticket cutout top) */}
          <div className="w-6 h-6 rounded-full bg-[#090D14] -mt-6 border-b border-white/10 shadow-inner" />
          
          {/* Đường nét đứt xé vé */}
          <div className="w-[1px] h-full border-r-2 border-dashed border-white/20 my-2" />
          
          {/* Khuyết tròn dưới (Ticket cutout bottom) */}
          <div className="w-6 h-6 rounded-full bg-[#090D14] -mb-6 border-t border-white/10 shadow-inner" />
        </div>

        {/* ===================== PHẦN PHẢI: QR CODE & STUB CHECK-IN (32%) ===================== */}
        <div className="md:w-[260px] p-6 sm:p-7 bg-black/35 backdrop-blur-md flex flex-col items-center justify-between text-center border-t md:border-t-0 md:border-l border-white/10 relative">
          
          {/* Top stub metadata */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest pb-3 border-b border-white/10">
            <span>Pass Scan</span>
            <span className="text-[#cfb06c] font-bold">{ticketSerial}</span>
          </div>

          {/* QR Code Container */}
          <div className="my-4 p-3 bg-white rounded-2xl shadow-xl border-2 border-[#cfb06c]/40 flex flex-col items-center justify-center">
            <QRCodeSVG
              value={qrUrl}
              size={136}
              level="H"
              includeMargin={false}
              className="w-full h-auto"
            />
          </div>

          {/* QR Scan Instructions */}
          <div className="w-full">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-1">
              <QrCode className="w-3 h-3" />
              <span>Quét Mã Đặt Lịch</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Quét camera điện thoại để giữ ưu đãi &amp; chọn lịch hẹn
            </p>
          </div>

          {/* Bottom security strip */}
          <div className="w-full pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-500 font-mono">
            <span>SECURE CODE: 20% REF</span>
            <span>HH-AUTH</span>
          </div>
        </div>

      </div>

      {/* Bottom subtle luxury watermark */}
      <div className="py-1 px-6 bg-black/50 text-[9.5px] font-mono text-slate-500 flex items-center justify-between border-t border-white/5">
        <span>HỆ THỐNG VOUCHER TỰ ĐỘNG HH DENTAL CRM</span>
        <span className="text-teal-400/80">HOTLINE: 1900 6868</span>
      </div>
    </div>
  );
});

VoucherCard.displayName = 'VoucherCard';
export default VoucherCard;

