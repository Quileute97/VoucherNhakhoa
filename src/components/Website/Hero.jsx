import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ArrowRight,
  Clock,
  HeartHandshake
} from 'lucide-react';

export default function Hero({ onBookNow }) {
  const slides = [
    {
      id: 1,
      badge: 'CÔNG NGHỆ CHỤP PHIM CT CONE BEAM 3D',
      titleHighlight: 'RĂNG SỨ',
      titleMain: 'THẨM MỸ',
      desc: 'Bảo tồn răng thật tối đa. Thiết kế dáng răng chuẩn nhân tướng học và tỷ lệ vàng khuôn mặt, độ trong mờ tự nhiên như răng sinh học.',
      img: '/hhdental/service-boc-su.webp',
      ctaText: 'Đăng Ký Tư Vấn Răng Sứ',
    },
    {
      id: 2,
      badge: 'TRỤ NHẬP KHẨU CHÍNH HÃNG THỤY SĨ - MỸ - HÀN QUỐC',
      titleHighlight: 'TRỒNG RĂNG',
      titleMain: 'IMPLANT',
      desc: 'Phục hồi khả năng ăn nhai trọn đời. Tích hợp xương sinh học nhanh chóng, không đau, cấy ghép chuẩn xác từng milimet.',
      img: '/hhdental/hero-implant.webp',
      ctaText: 'Tư Vấn Trồng Răng 0đ',
    },
    {
      id: 3,
      badge: 'CHỈNH NHA CHUẨN Y KHOA',
      titleHighlight: 'NIỀNG RĂNG',
      titleMain: 'INVISALIGN & MẮC CÀI',
      desc: 'Khắc phục hoàn toàn hô móm, khấp khểnh. Mô phỏng lộ trình dịch chuyển răng 3D bằng công nghệ iTero Element 5D hiện đại.',
      img: '/hhdental/service-nieng-rang.webp',
      ctaText: 'Quét Răng 3D Miễn Phí',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-950 via-teal-900 to-[#091a18] text-white py-12 md:py-20 lg:py-24">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(20,184,166,0.2),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(217,119,6,0.12),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Cột trái: Thông điệp thương hiệu */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badge uy tín */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-400/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{slide.badge}</span>
            </div>

            {/* Tiêu đề chính lớn */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none font-serif">
                <span className="text-white block">{slide.titleHighlight}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 block mt-1">
                  {slide.titleMain}
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-teal-100/90 max-w-xl leading-relaxed font-sans font-light">
                {slide.desc}
              </p>
            </div>

            {/* 3 Cam kết vàng của HH Dental */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Bảo hành chính hãng 15 năm</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>100% Bác sĩ Chuyên khoa RHM</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <Award className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Thăm khám &amp; Chụp CT 0đ</span>
              </div>
            </div>

            {/* Các nút hành động chính */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBookNow}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{slide.ctaText}</span>
              </button>

              <a
                href="tel:0933989918"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 active:scale-95 transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Phone className="w-4 h-4 text-teal-300" />
                <span>Hotline: 093 398 9918</span>
              </a>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2 pt-4">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeSlide ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Cột phải: Hình ảnh dịch vụ & Box tiếp nhận nhanh */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Frame with glowing border */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-teal-400/30 shadow-2xl shadow-black/60 bg-teal-950 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={slide.img}
                  alt={slide.titleMain}
                  className="w-full h-full object-cover transition-opacity duration-700"
                  onError={(e) => {
                    e.target.src = '/hhdental/hero-implant.webp';
                  }}
                />
                
                {/* Floating Discount Badge */}
                <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-amber-400/40 text-right">
                  <div className="text-[10px] text-amber-300 font-mono font-bold uppercase tracking-wider">
                    Đặc quyền Voucher
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    0đ Khám &amp; Chụp X-Quang
                  </div>
                </div>

                {/* Bottom gradient caption */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white font-bold block">HH Dental Clinic</span>
                    <span className="text-teal-300 text-[11px]">251 Vĩnh Viễn, Q.10, TP.HCM</span>
                  </div>
                  <a href="tel:0933989918" className="font-mono font-bold text-amber-300 hover:underline">
                    093 398 9918
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
