import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  X, 
  Check, 
  Download, 
  Copy, 
  MessageCircle, 
  Sparkles, 
  RefreshCw, 
  QrCode, 
  Barcode, 
  ShieldCheck, 
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  Building2,
  Tag,
  Percent,
  IdCard
} from 'lucide-react';
import { verifyPartner } from '../lib/supabase';
import HumanCard from './HumanCard';

export default function VoucherGenerator({ onNavigateToBooking, onNavigateToWebsite, onNavigateToReception }) {
  // 4 BƯỚC ĐÚNG THEO YÊU CẦU:
  // Step 1: Nhập ID cộng tác viên
  // Step 2: Tên chi nhánh Nha khoa
  // Step 3: Tên Voucher
  // Step 4: Mức Discount
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Dữ liệu tương ứng với 4 bước
  const [partnerIdInput, setPartnerIdInput] = useState('P102');
  const [partnerName, setPartnerName] = useState('TRẦN THỊ THU HÀ');
  const [branchName, setBranchName] = useState('HH DENTAL - PHỐ HUẾ');
  const [voucherName, setVoucherName] = useState('VOUCHER KHÁM 0Đ');
  const [discount, setDiscount] = useState('GIẢM 500.000Đ DỊCH VỤ SỨ & NIỀNG RĂNG');

  // Chủ đề màu sắc (5 swatches chuẩn 1Human)
  const [selectedStyle, setSelectedStyle] = useState('ivory'); // 'ivory', 'terracotta', 'white', 'dark', 'gold'
  const [codeType, setCodeType] = useState('qr'); // 'qr' hoặc 'barcode'

  // Trạng thái kiểm tra Supabase
  const [partner, setPartner] = useState(null);
  const [loadingLookup, setLoadingLookup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [verifiedStep1, setVerifiedStep1] = useState(false);

  // Xuất ảnh & chia sẻ
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedZaloMsg, setCopiedZaloMsg] = useState(false);
  const [toast, setToast] = useState(null);

  const cardRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3800);
  };

  // Khởi tạo: Đọc mã CTV từ localStorage hoặc mặc định P102
  useEffect(() => {
    const savedCode = localStorage.getItem('last_used_ref_code') || 'P102';
    setPartnerIdInput(savedCode);
    handleVerifyPartner(savedCode, false);
  }, []);

  // Xử lý kiểm tra Partner trên Supabase
  const handleVerifyPartner = async (inputVal, triggerConfetti = true) => {
    const code = (inputVal || partnerIdInput || '').trim();
    if (!code) {
      setErrorMessage('Vui lòng nhập Mã đối tác (VD: P102) hoặc Số điện thoại.');
      setVerifiedStep1(false);
      return false;
    }

    setLoadingLookup(true);
    setErrorMessage('');

    const res = await verifyPartner(code);
    setLoadingLookup(false);

    if (!res.success) {
      setErrorMessage(res.error);
      setVerifiedStep1(false);
      showToast(res.error, 'error');
      return false;
    } else {
      const p = res.partner;
      setPartner(p);
      setPartnerIdInput(p.code);
      setPartnerName(p.name);
      setErrorMessage('');
      setVerifiedStep1(true);
      localStorage.setItem('last_used_ref_code', p.code);

      if (triggerConfetti) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
        showToast(`Đã xác thực Đối tác Mã: ${p.code}`);
      }
      return true;
    }
  };

  // Link đặt lịch thực tế được mã hóa vào mã QR
  // Khi chạy localhost/127.0.0.1: Tự động dùng IP mạng LAN (192.168.1.4) để điện thoại quét màn hình là mở được ngay!
  const isLocalHost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const baseBookingOrigin = isLocalHost 
    ? `http://192.168.1.4:${window.location.port || '5174'}` 
    : (typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:5174');

  const activePartnerCode = partner?.code || partnerIdInput || 'P102';
  const actualBookingUrl = `${baseBookingOrigin}/dat-lich?ref=${activePartnerCode}`;
  const displayShortLink = `hhdental.vn/dat-lich?ref=${activePartnerCode}`;

  // Tin nhắn chia sẻ qua Zalo
  const zaloShareContent = `Nha khoa ${branchName} đang tặng ${voucherName} (${discount}) nè! Bạn bấm link này đặt lịch ủng hộ mình nha: ${actualBookingUrl}`;

  // Xuất ảnh PNG độ nét cao (4K Retina)
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3, // Siêu nét 4K Retina
        quality: 1,
      });

      const fileName = `Voucher_${activePartnerCode}.png`;
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
      showToast(`Đã tải ảnh Voucher ${fileName} về máy!`);
    } catch (err) {
      console.error('Lỗi khi xuất ảnh:', err);
      showToast('Lỗi xuất ảnh: ' + (err.message || 'Thử lại sau'), 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(actualBookingUrl);
      setCopiedLink(true);
      showToast('Đã copy link đặt lịch vào Clipboard!');
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      showToast('Không thể sao chép link tự động.', 'error');
    }
  };

  const handleShareZalo = async () => {
    try {
      await navigator.clipboard.writeText(zaloShareContent);
      setCopiedZaloMsg(true);
      showToast('Đã copy tin nhắn! Đang mở Zalo...');
      setTimeout(() => setCopiedZaloMsg(false), 3000);
      const zaloUrl = `https://zalo.me/share?url=${encodeURIComponent(actualBookingUrl)}&title=${encodeURIComponent(`${voucherName} - ${branchName}`)}`;
      window.open(zaloUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error(err);
    }
  };

  // 4 Bước định nghĩa chuẩn theo prompt
  const steps = [
    {
      step: 1,
      title: "Step 1: Nhập ID cộng tác viên",
      subtitle: "Hệ thống tự động kiểm tra Partner ID hợp lệ trên Supabase.",
      label: "ID đối tác hoặc Số điện thoại",
      placeholder: "Ví dụ: P102 hoặc 0359389615...",
      value: partnerIdInput,
      setValue: (val) => {
        setPartnerIdInput(val);
        setVerifiedStep1(false);
        if (errorMessage) setErrorMessage('');
      },
      icon: IdCard,
      suggestions: [
        { label: 'Mã: REF-N5JY', value: 'REF-N5JY' },
        { label: 'SĐT: 0359389615', value: '0359389615' },
        { label: 'Mã: REF-YRW43C', value: 'REF-YRW43C' },
        { label: 'Mã: P102', value: 'P102' },
      ],
    },
    {
      step: 2,
      title: "Step 2: Tên chi nhánh Nha khoa",
      subtitle: "Cơ sở hoặc phòng khám áp dụng Voucher ưu đãi.",
      label: "Tên chi nhánh phòng khám",
      placeholder: "Ví dụ: HH DENTAL - PHỐ HUẾ",
      value: branchName,
      setValue: setBranchName,
      icon: Building2,
      suggestions: [
        { label: 'HH Dental - Phố Huế', value: 'HH DENTAL - PHỐ HUẾ' },
        { label: 'HH Dental - Cầu Giấy', value: 'HH DENTAL - CẦU GIẤY' },
        { label: 'HH Dental - TP.HCM', value: 'HH DENTAL - TP.HCM' },
        { label: 'HH Dental Clinic', value: 'HH DENTAL CLINIC' },
      ],
    },
    {
      step: 3,
      title: "Step 3: Tên Voucher",
      subtitle: "Tiêu đề loại Voucher hoặc vé ưu đãi dành tặng khách hàng.",
      label: "Tên chương trình Voucher",
      placeholder: "Ví dụ: VOUCHER KHÁM 0Đ",
      value: voucherName,
      setValue: setVoucherName,
      icon: Tag,
      suggestions: [
        { label: 'VOUCHER KHÁM 0Đ', value: 'VOUCHER KHÁM 0Đ' },
        { label: 'VOUCHER NỤ CƯỜI MỚI', value: 'VOUCHER NỤ CƯỜI MỚI' },
        { label: 'SPECIAL VIP TICKET', value: 'SPECIAL VIP TICKET' },
        { label: 'TRI ÂN KHÁCH HÀNG', value: 'TRI ÂN KHÁCH HÀNG' },
      ],
    },
    {
      step: 4,
      title: "Step 4: Mức Discount",
      subtitle: "Quyền lợi giảm giá hoặc quà tặng áp dụng trực tiếp vào dịch vụ.",
      label: "Mức Discount & Quyền lợi",
      placeholder: "Ví dụ: GIẢM 500.000Đ DỊCH VỤ SỨ & NIỀNG RĂNG",
      value: discount,
      setValue: setDiscount,
      icon: Percent,
      suggestions: [
        { label: 'Giảm 500.000đ dịch vụ Sứ & Niềng', value: 'GIẢM 500.000Đ DỊCH VỤ SỨ & NIỀNG RĂNG' },
        { label: 'Khám 0đ + Giảm 500.000đ', value: 'MIỄN PHÍ KHÁM 0Đ & GIẢM 500.000Đ' },
        { label: 'Giảm 20% Dịch vụ', value: 'GIẢM 20% TẤT CẢ DỊCH VỤ' },
        { label: 'Giảm 10% Trồng Răng', value: 'GIẢM 10% TRỒNG RĂNG IMPLANT' },
        { label: 'Voucher 5%', value: 'VOUCHER 5% TOÀN HÓA ĐƠN' },
      ],
    },
  ];

  const currentStepData = steps[currentStep - 1];

  const handleNextStep = async () => {
    // Nếu đang ở Step 1: Phải kiểm tra Supabase
    if (currentStep === 1) {
      const ok = await handleVerifyPartner(partnerIdInput);
      if (!ok) return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      showToast('Đã thiết lập đầy đủ 4 bước! Bạn có thể tải ảnh hoặc chia sẻ ngay.');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-between select-none">
      
      {/* ===================== HÌNH NỀN MOODY WORKSPACE (1HUMAN.AT AESTHETIC) ===================== */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/desk-bg.jpg')",
          filter: 'brightness(0.35) contrast(1.15) saturate(1.1)',
          transform: 'scale(1.05)',
        }}
      />
      {/* Lớp gradient tối & blur kính mờ */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-black/60 to-black/75 z-0 backdrop-blur-[6px]" />

      {/* ===================== TOAST THÔNG BÁO ===================== */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-bounce duration-300">
          <div className={`px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-xl border flex items-center gap-2.5 text-xs font-semibold ${
            toast.type === 'error'
              ? 'bg-rose-950/90 text-rose-200 border-rose-800/50'
              : 'bg-teal-950/90 text-teal-200 border-teal-700/50'
          }`}>
            {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-400" /> : <CheckCircle2 className="w-4 h-4 text-teal-400" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* ===================== TOP HEADER BAR (CHUẨN 1HUMAN PROGRESS) ===================== */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-5 flex items-center justify-between text-white border-b border-white/5">
        
        {/* Left: Back button + Step Number + Step Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              currentStep === 1 
                ? 'opacity-25 cursor-not-allowed text-slate-500' 
                : 'hover:bg-white/10 text-white active:scale-95'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="w-6 h-6 rounded-full bg-white text-slate-950 font-bold text-xs flex items-center justify-center font-mono shrink-0">
            {currentStep}
          </div>

          <div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none">
              {currentStepData.title}
            </h2>
            <p className="text-[11px] sm:text-xs text-white/50 tracking-tight mt-0.5 hidden sm:block">
              {currentStepData.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Step Counter "X / 4" + 4 Segmented Progress Bar + Close */}
        <div className="flex items-center gap-4">
          
          {/* Badge đối tác đã xác thực */}
          {partner && (
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>MÃ ĐỐI TÁC: {partner.code}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/70 font-medium">
              {currentStep} / {totalSteps}
            </span>

            {/* 4 Vạch Tiến Trình (4-segment Progress Bar) */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  onClick={() => {
                    // Nếu muốn nhảy sang bước sau thì bước 1 phải xác thực
                    if (s > 1 && !verifiedStep1) {
                      handleVerifyPartner(partnerIdInput);
                    }
                    setCurrentStep(s);
                  }}
                  className={`h-1.5 w-7 sm:w-10 rounded-full cursor-pointer transition-all duration-300 ${
                    s <= currentStep 
                      ? 'bg-[#FF5722]' 
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Quick Portal Switcher Pills */}
            <div className="hidden lg:flex items-center gap-2 ml-2">
              <button
                type="button"
                onClick={onNavigateToWebsite}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-white/90 transition-all border border-white/10"
              >
                Trang Chủ HH Dental
              </button>
              <button
                type="button"
                onClick={onNavigateToReception}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 transition-all border border-teal-500/30 flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>CRM Lễ Tân</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onNavigateToWebsite}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors ml-1"
              title="Về Trang Chủ HH Dental"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* ===================== TRUNG TÂM: LIVE CARD PREVIEW ===================== */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-4 sm:py-8">
        
        {/* Chuyển đổi kiểu mã quét: Mã QR vs Barcode */}
        <div className="flex items-center gap-1.5 mb-4 bg-black/40 backdrop-blur-xl px-2 py-1 rounded-full border border-white/10">
          <button
            type="button"
            onClick={() => setCodeType('qr')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              codeType === 'qr'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Mã QR Quét Lịch</span>
          </button>

          <button
            type="button"
            onClick={() => setCodeType('barcode')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              codeType === 'barcode'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Barcode className="w-3.5 h-3.5" />
            <span>Mã Vạch Barcode</span>
          </button>
        </div>

        {/* Khung thẻ sống động trung tâm (1Human.at Style) */}
        <div className="w-full max-w-[560px] transform transition-transform duration-300 hover:scale-[1.01]">
          <HumanCard
            ref={cardRef}
            partnerId={activePartnerCode}
            branchName={branchName}
            voucherName={voucherName}
            discount={discount}
            url={displayShortLink}
            qrValue={actualBookingUrl}
            theme={selectedStyle}
            codeType={codeType}
          />
        </div>

        {/* 5 Vòng Tròn Chọn Màu Sắc (Style Swatches) Chuẩn 1Human */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {/* Swatch 1: Ivory */}
          <button
            type="button"
            onClick={() => setSelectedStyle('ivory')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F7F5F0] text-slate-950 font-black text-[11px] italic flex items-center justify-center transition-all ${
              selectedStyle === 'ivory'
                ? 'ring-2 ring-[#FF5722] ring-offset-2 ring-offset-black scale-110 shadow-lg'
                : 'opacity-80 hover:opacity-100 hover:scale-105'
            }`}
            title="Ivory Classic"
          >
            1H.
          </button>

          {/* Swatch 2: Terracotta Orange */}
          <button
            type="button"
            onClick={() => setSelectedStyle('terracotta')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E84D2B] text-white font-black text-[11px] italic flex items-center justify-center transition-all ${
              selectedStyle === 'terracotta'
                ? 'ring-2 ring-[#FF5722] ring-offset-2 ring-offset-black scale-110 shadow-lg'
                : 'opacity-80 hover:opacity-100 hover:scale-105'
            }`}
            title="Terracotta Orange"
          >
            1H.
          </button>

          {/* Swatch 3: Clean White */}
          <button
            type="button"
            onClick={() => setSelectedStyle('white')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-slate-950 font-black text-[11px] italic flex items-center justify-center transition-all ${
              selectedStyle === 'white'
                ? 'ring-2 ring-[#FF5722] ring-offset-2 ring-offset-black scale-110 shadow-lg'
                : 'opacity-80 hover:opacity-100 hover:scale-105'
            }`}
            title="Studio White"
          >
            1H.
          </button>

          {/* Swatch 4: Obsidian Black */}
          <button
            type="button"
            onClick={() => setSelectedStyle('dark')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#16181F] text-white border border-white/20 font-black text-[11px] italic flex items-center justify-center transition-all ${
              selectedStyle === 'dark'
                ? 'ring-2 ring-[#FF5722] ring-offset-2 ring-offset-black scale-110 shadow-lg'
                : 'opacity-80 hover:opacity-100 hover:scale-105'
            }`}
            title="Matte Obsidian"
          >
            1H.
          </button>

          {/* Swatch 5: Luxury Gold */}
          <button
            type="button"
            onClick={() => setSelectedStyle('gold')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#1C1813] to-[#CFB06C] text-[#F6E3B4] border border-[#CFB06C]/40 font-black text-[11px] italic flex items-center justify-center transition-all ${
              selectedStyle === 'gold'
                ? 'ring-2 ring-[#FF5722] ring-offset-2 ring-offset-black scale-110 shadow-lg'
                : 'opacity-80 hover:opacity-100 hover:scale-105'
            }`}
            title="Luxury Gold"
          >
            1H.
          </button>
        </div>

        {/* Chỉ dẫn mã QR thật */}
        <div className="mt-3 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 text-[11px] text-white/80 shadow-md">
            <QrCode className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="text-white/50">Mã QR thật:</span>
            <a
              href={actualBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-teal-300 hover:text-teal-200 hover:underline flex items-center gap-1 font-semibold"
              title="Nhấn để mở liên kết đặt lịch tương ứng"
            >
              <span>{actualBookingUrl}</span>
              <ExternalLink className="w-3 h-3 text-teal-400" />
            </a>
          </div>
        </div>

      </main>

      {/* ===================== BOTTOM CONTROLS (PILL INPUT THEO BƯỚC) ===================== */}
      <footer className="relative z-20 w-full pb-8 pt-2 px-4 flex flex-col items-center">
        
        <div className="w-full max-w-xl mx-auto flex flex-col items-center">
          
          {/* Nhãn mờ phía trên input */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/80 mb-2">
            <currentStepData.icon className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>{currentStepData.label}</span>
          </div>

          {/* Khung Input dạng Viên thuốc (Pill Bar) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNextStep();
            }}
            className="w-full relative flex items-center"
          >
            <div className="w-full relative flex items-center rounded-full bg-black/60 border border-white/25 backdrop-blur-2xl px-5 sm:px-6 py-2 shadow-2xl focus-within:border-white/50 focus-within:ring-2 focus-within:ring-white/20 transition-all">
              
              <input
                type="text"
                required
                value={currentStepData.value}
                onChange={(e) => currentStepData.setValue(e.target.value)}
                placeholder={currentStepData.placeholder}
                className="w-full bg-transparent text-white text-sm sm:text-base font-medium placeholder-white/40 focus:outline-none py-2 font-sans"
              />

              {/* Trạng thái loading khi kiểm tra Supabase ở Step 1 */}
              {currentStep === 1 && loadingLookup && (
                <RefreshCw className="w-4 h-4 text-teal-400 animate-spin mr-2 shrink-0" />
              )}

              {/* Nút Tròn Mũi Tên Trắng (→) */}
              <button
                type="submit"
                disabled={loadingLookup}
                className="w-10 h-10 rounded-full bg-white text-slate-950 font-bold flex items-center justify-center ml-2 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer disabled:opacity-50"
                title="Tiếp tục"
              >
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </form>

          {/* Gợi ý chọn nhanh cho từng bước */}
          {currentStepData.suggestions && (
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
              <span className="text-white/40 mr-1">Gợi ý:</span>
              {currentStepData.suggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    currentStepData.setValue(item.value);
                    if (currentStep === 1) {
                      handleVerifyPartner(item.value);
                    }
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 border border-white/10 transition-colors font-sans"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Báo lỗi tiếng Việt nếu Step 1 không tìm thấy */}
          {currentStep === 1 && errorMessage && (
            <div className="mt-3 p-2.5 px-4 rounded-full bg-rose-950/80 border border-rose-800/50 text-rose-200 text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Báo thành công nếu Step 1 đã xác thực */}
          {currentStep === 1 && verifiedStep1 && partner && !errorMessage && (
            <div className="mt-3 p-2 px-4 rounded-full bg-teal-950/80 border border-teal-700/50 text-teal-200 text-xs flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Đã xác thực đối tác: <strong>Mã {partner.code}</strong> • Hoa hồng 20%</span>
            </div>
          )}

        </div>

        {/* ===================== BỘ NÚT HÀNH ĐỘNG 1-CLICK (XUẤT ẢNH & CHIA SẺ) ===================== */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {/* Nút Tải Ảnh PNG */}
          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="px-5 py-2.5 rounded-full bg-white text-slate-950 font-bold text-xs tracking-wide hover:bg-slate-200 active:scale-95 transition-all flex items-center gap-1.5 shadow-lg shadow-black/50 disabled:opacity-50 cursor-pointer"
          >
            {isDownloading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span>📸 Tải Ảnh Voucher (PNG 4K)</span>
          </button>

          {/* Nút Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wide border border-white/15 active:scale-95 transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Đã Copy!' : '🔗 Copy Link Đặt Lịch'}</span>
          </button>

          {/* Nút Gửi Zalo */}
          <button
            type="button"
            onClick={handleShareZalo}
            className="px-4 py-2.5 rounded-full bg-[#0068FF]/30 hover:bg-[#0068FF]/45 text-white font-semibold text-xs tracking-wide border border-[#0068FF]/50 active:scale-95 transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-blue-300" />
            <span>{copiedZaloMsg ? 'Đã Soạn Tin!' : '💬 Gửi Qua Zalo'}</span>
          </button>

          {/* Nút Trải nghiệm khách đặt lịch */}
          <button
            type="button"
            onClick={() => onNavigateToBooking && onNavigateToBooking(activePartnerCode)}
            className="px-4 py-2.5 rounded-full bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-semibold text-xs tracking-wide border border-teal-500/40 active:scale-95 transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
          >
            <span>Trải nghiệm Đặt Lịch</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Nút Cổng Lễ Tân CRM */}
          <button
            type="button"
            onClick={onNavigateToReception}
            className="px-4 py-2.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-xs tracking-wide border border-emerald-500/40 active:scale-95 transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Quầy Lễ Tân (CRM)</span>
          </button>
        </div>

      </footer>

    </div>
  );
}
