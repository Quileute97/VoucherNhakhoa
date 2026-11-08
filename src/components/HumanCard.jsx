import React, { forwardRef, useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Globe } from 'lucide-react';

/**
 * Thẻ Human Card / Voucher VIP chuẩn 100% phong cách 1Human.at
 * - CHỈ HIỂN THỊ ID CỘNG TÁC VIÊN (Không hiển thị tên thật)
 * - Tỷ lệ chuẩn ID Card (1.58 : 1)
 * - Typography siêu đậm, tối giản, thanh lịch
 * - Chữ ký mờ chìm 'HH.' lớn ở góc phải
 * - Hiệu ứng nghiêng 3D & ánh sáng lấp lánh (Interactive 3D Tilt) khi di chuột
 */
export const HumanCard = forwardRef(({
  partnerId = 'P102',
  branchName = 'HH DENTAL - PHỐ HUẾ',
  voucherName = 'VOUCHER KHÁM 0Đ',
  discount = 'GIẢM 500.000Đ DỊCH VỤ SỨ & NIỀNG RĂNG',
  url = 'hhdental.vn/dat-lich?ref=P102',
  theme = 'ivory',
  codeType = 'qr', // 'qr' hoặc 'barcode'
}, ref) => {
  // CHỈ HIỂN THỊ ID (Không hiển thị tên CTV)
  const cleanId = (partnerId || 'P102').trim().toUpperCase();
  const displayId = cleanId ? `#${cleanId}` : '#----';
  const displayBranch = (branchName || 'HH DENTAL').toUpperCase();
  const displayVoucher = (voucherName || 'VOUCHER ĐẶC BIỆT').toUpperCase();
  const displayDiscount = discount || 'GIẢM 500.000Đ';
  const displayUrl = url || `hhdental.vn/dat-lich?ref=${cleanId}`;

  // 3D Tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tính góc nghiêng mềm mại tối đa ~9 độ
    const rX = ((y - centerY) / centerY) * -9;
    const rY = ((x - centerX) / centerX) * 9;
    
    setRotateX(rX);
    setRotateY(rY);

    // Tính vị trí ánh sáng bóng (glare effect)
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50, opacity: 0 });
  };

  // 5 Bảng màu chuẩn theo 1Human
  const themeStyles = {
    ivory: {
      cardBg: 'bg-[#F7F5F0]',
      textPrimary: 'text-[#0F172A]',
      textSecondary: 'text-[#334155]',
      textMuted: 'text-[#64748B]',
      dotColor: 'bg-[#FF5722]', // Chấm cam đặc trưng 1Human
      badgeBg: 'bg-black/5 text-[#0F172A] border-black/10',
      watermarkColor: 'text-[#000000]',
      watermarkOpacity: 'opacity-[0.05]',
      borderColor: 'border-black/[0.08]',
      barcodeColor: '#0F172A',
      shadow: 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]',
      brandMark: 'text-[#0F172A]',
      qrBg: 'bg-white',
      qrFg: '#0F172A',
    },
    terracotta: {
      cardBg: 'bg-gradient-to-br from-[#FF6B4A] to-[#E84D2B]',
      textPrimary: 'text-white',
      textSecondary: 'text-white/95',
      textMuted: 'text-white/80',
      dotColor: 'bg-white',
      badgeBg: 'bg-white/15 text-white border-white/20',
      watermarkColor: 'text-white',
      watermarkOpacity: 'opacity-[0.09]',
      borderColor: 'border-white/20',
      barcodeColor: '#FFFFFF',
      shadow: 'shadow-[0_25px_60px_-15px_rgba(232,77,43,0.45)]',
      brandMark: 'text-white',
      qrBg: 'bg-white',
      qrFg: '#E84D2B',
    },
    white: {
      cardBg: 'bg-[#FFFFFF]',
      textPrimary: 'text-[#000000]',
      textSecondary: 'text-[#1E293B]',
      textMuted: 'text-[#64748B]',
      dotColor: 'bg-[#0D9488]', // Chấm ngọc y tế
      badgeBg: 'bg-teal-500/10 text-teal-900 border-teal-500/20',
      watermarkColor: 'text-[#000000]',
      watermarkOpacity: 'opacity-[0.04]',
      borderColor: 'border-black/10',
      barcodeColor: '#000000',
      shadow: 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)]',
      brandMark: 'text-[#000000]',
      qrBg: 'bg-white',
      qrFg: '#000000',
    },
    dark: {
      cardBg: 'bg-gradient-to-br from-[#181A20] via-[#121317] to-[#0A0B0E]',
      textPrimary: 'text-[#FFFFFF]',
      textSecondary: 'text-slate-300',
      textMuted: 'text-slate-400',
      dotColor: 'bg-[#F59E0B]', // Chấm vàng kim
      badgeBg: 'bg-white/10 text-amber-300 border-white/10',
      watermarkColor: 'text-white',
      watermarkOpacity: 'opacity-[0.05]',
      borderColor: 'border-white/10',
      barcodeColor: '#FFFFFF',
      shadow: 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]',
      brandMark: 'text-white',
      qrBg: 'bg-white',
      qrFg: '#121317',
    },
    gold: {
      cardBg: 'bg-gradient-to-br from-[#1C1813] via-[#14120E] to-[#0D0B08]',
      textPrimary: 'text-[#F6E3B4]',
      textSecondary: 'text-[#DEC993]',
      textMuted: 'text-[#A78B55]',
      dotColor: 'bg-[#CFB06C]',
      badgeBg: 'bg-[#CFB06C]/15 text-[#F6E3B4] border-[#CFB06C]/30',
      watermarkColor: 'text-[#CFB06C]',
      watermarkOpacity: 'opacity-[0.08]',
      borderColor: 'border-[#CFB06C]/35',
      barcodeColor: '#F6E3B4',
      shadow: 'shadow-[0_25px_60px_-15px_rgba(207,176,108,0.25)]',
      brandMark: 'text-[#F6E3B4]',
      qrBg: 'bg-white',
      qrFg: '#1C1813',
    },
  };

  const current = themeStyles[theme] || themeStyles.ivory;

  return (
    <div
      style={{ perspective: '1200px' }}
      className="w-full flex justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={ref}
        id="human-card-node"
        className={`relative w-full max-w-[540px] aspect-[1.58/1] rounded-[28px] ${current.cardBg} ${current.borderColor} border ${current.shadow} p-6 sm:p-7 flex flex-col justify-between overflow-hidden select-none mx-auto transition-transform duration-150 ease-out`}
        style={{
          boxSizing: 'border-box',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ===================== ÁNH SÁNG LƯỚT 3D (SPECULAR GLARE) ===================== */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glarePosition.opacity}), transparent 60%)`,
          }}
        />

        {/* ===================== CHỮ KÝ IN CHÌM WATERMARK HH. ===================== */}
        <div
          className={`absolute -right-2 top-1/2 -translate-y-1/2 pointer-events-none select-none font-black text-[130px] sm:text-[170px] tracking-tighter leading-none z-0 font-sans ${current.watermarkColor} ${current.watermarkOpacity} italic`}
          style={{
            transform: 'translateY(-48%) rotate(-2deg)',
          }}
        >
          HH.
        </div>

        {/* ===================== HÀNG TRÊN: BRAND MARK & PARTNER ID ===================== */}
        <div className="relative z-10 flex items-start justify-between">
          {/* Brand Mark HH. với chấm màu */}
          <div className="flex items-center">
            <span className={`font-black tracking-tighter text-2xl sm:text-3xl font-sans italic ${current.brandMark}`}>
              HH
            </span>
            <span className={`w-2.5 h-2.5 rounded-full ml-0.5 mt-2 ${current.dotColor} shrink-0`} />
          </div>

          {/* STEP 1: PARTNER ID METADATA */}
          <div className="text-right">
            <span className={`font-mono text-[10px] sm:text-xs font-semibold tracking-widest uppercase ${current.textMuted}`}>
              PARTNER ID <span className={`${current.textPrimary} font-bold ml-1`}>{displayId}</span>
            </span>
          </div>
        </div>

        {/* ===================== PHẦN GIỮA: CHỈ HIỂN THỊ ID CTV & DỰ ÁN ===================== */}
        <div className="relative z-10 my-auto py-1.5">
          
          {/* CHỈ HIỂN THỊ ID CỘNG TÁC VIÊN (KHÔNG HIỂN THỊ TÊN THẬT) */}
          <h1
            className={`font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none uppercase truncate font-mono ${current.textPrimary}`}
            style={{ letterSpacing: '-0.02em' }}
          >
            {cleanId}
          </h1>

          {/* STEP 2: TÊN CHI NHÁNH NHA KHOA */}
          <div className={`mt-2 font-mono text-[11px] sm:text-[12.5px] tracking-wide flex items-center gap-1.5 ${current.textSecondary}`}>
            <span className={current.textMuted}>Human at</span>
            <strong className={`font-bold ${current.textPrimary}`}>{displayBranch}</strong>
          </div>

          {/* STEP 3 & STEP 4: TÊN VOUCHER + MỨC DISCOUNT */}
          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            {/* STEP 3: Tên Voucher */}
            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border ${current.badgeBg}`}>
              {displayVoucher}
            </span>

            {/* STEP 4: Mức Discount */}
            <span className={`font-mono text-[11px] sm:text-xs font-semibold tracking-tight ${current.textPrimary}`}>
              {displayDiscount}
            </span>
          </div>

        </div>

        {/* ===================== HÀNG DƯỚI: LINK TRANG ĐẶT LỊCH & MÃ SCAN ===================== */}
        <div className="relative z-10 flex items-end justify-between pt-1">
          
          {/* Link góc trái: Icon Globe + URL đặt lịch chứa ref */}
          <div className="flex items-center gap-2 max-w-[65%]">
            <Globe className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 ${current.textPrimary}`} />
            <span className={`font-mono text-[10.5px] sm:text-xs tracking-tight truncate ${current.textSecondary}`}>
              {displayUrl}
            </span>
          </div>

          {/* Mã góc phải: Barcode hoặc QR Code */}
          <div className="shrink-0">
            {codeType === 'barcode' ? (
              /* Barcode phong cách 1Human */
              <div className="flex flex-col items-end">
                <svg
                  width="70"
                  height="32"
                  viewBox="0 0 70 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-90"
                >
                  <rect x="0" y="0" width="2.5" height="32" fill={current.barcodeColor} />
                  <rect x="4.5" y="0" width="1.2" height="32" fill={current.barcodeColor} />
                  <rect x="8" y="0" width="3" height="32" fill={current.barcodeColor} />
                  <rect x="13" y="0" width="1.2" height="32" fill={current.barcodeColor} />
                  <rect x="16" y="0" width="2" height="32" fill={current.barcodeColor} />
                  <rect x="20" y="0" width="4" height="32" fill={current.barcodeColor} />
                  <rect x="26.5" y="0" width="1.2" height="32" fill={current.barcodeColor} />
                  <rect x="30" y="0" width="3.2" height="32" fill={current.barcodeColor} />
                  <rect x="35.5" y="0" width="1.5" height="32" fill={current.barcodeColor} />
                  <rect x="39" y="0" width="2.5" height="32" fill={current.barcodeColor} />
                  <rect x="43.5" y="0" width="3.5" height="32" fill={current.barcodeColor} />
                  <rect x="49" y="0" width="1.2" height="32" fill={current.barcodeColor} />
                  <rect x="52" y="0" width="2.2" height="32" fill={current.barcodeColor} />
                  <rect x="56" y="0" width="3" height="32" fill={current.barcodeColor} />
                  <rect x="61" y="0" width="1.2" height="32" fill={current.barcodeColor} />
                  <rect x="64.5" y="0" width="2" height="32" fill={current.barcodeColor} />
                  <rect x="68" y="0" width="2" height="32" fill={current.barcodeColor} />
                </svg>
              </div>
            ) : (
              /* QR Code quét camera tiện lợi */
              <div className={`p-1.5 rounded-xl ${current.qrBg} shadow-sm border border-black/10 flex items-center justify-center`}>
                <QRCodeSVG
                  value={`https://${displayUrl.replace(/^https?:\/\//, '')}`}
                  size={52}
                  level="M"
                  fgColor={current.qrFg}
                  bgColor="transparent"
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
});

HumanCard.displayName = 'HumanCard';
export default HumanCard;
