import React, { useState } from 'react';
import { 
  Phone, 
  Calendar, 
  Sparkles, 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  Users, 
  ChevronDown, 
  ShieldCheck, 
  Ticket,
  Stethoscope
} from 'lucide-react';

export default function Navbar({ currentRoute, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleNav = (route, hash) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setDropdownOpen(null);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-100 font-sans">
      
      {/* Top emergency & address bar (Chuẩn HH Dental) */}
      <div className="hidden lg:block bg-gradient-to-r from-teal-900 to-teal-800 text-teal-100 text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-300" />
              <span>251 Vĩnh Viễn, Phường 4, Quận 10, TP. Hồ Chí Minh</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-300" />
              <span>T2 - T7: 08:30 - 19:30 | CN: 08:30 - 17:00</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-teal-200">Giấy phép hoạt động Sở Y Tế: 09252/HCM-GPHĐ</span>
            <span>•</span>
            <button
              onClick={() => handleNav('reception')}
              className="text-amber-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <Stethoscope className="w-3 h-3" />
              <span>Cổng Lễ Tân CRM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Nha khoa HH Dental */}
        <div 
          onClick={() => handleNav('website')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="/hhdental/logo.webp"
            alt="Nha khoa HH Dental"
            className="h-12 w-auto object-contain"
            onError={(e) => {
              e.target.src = '/logo.png';
            }}
          />
          <div className="hidden sm:block">
            <span className="font-extrabold text-base tracking-tight text-teal-950 uppercase block font-serif">
              Nha Khoa HH Dental
            </span>
            <span className="text-[10px] text-teal-700 tracking-wider font-semibold uppercase block">
              Phòng khám Nha khoa Quận 10, TP.HCM
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-semibold text-slate-700">
          <button
            onClick={() => handleNav('website')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'website' ? 'text-teal-700 font-bold bg-teal-50' : 'hover:text-teal-700 hover:bg-slate-50'
            }`}
          >
            Trang chủ
          </button>

          {/* Dịch vụ & Bảng giá dropdown */}
          <div className="relative group">
            <button 
              onClick={() => handleNav('website', '#dich-vu')}
              className="px-3 py-2 rounded-lg hover:text-teal-700 hover:bg-slate-50 flex items-center gap-1 transition-colors"
            >
              <span>Dịch vụ &amp; Bảng giá</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
            </button>

            <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="#dich-vu" onClick={() => handleNav('website', '#dich-vu')} className="block px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium">Trồng răng Implant</a>
              <a href="#dich-vu" onClick={() => handleNav('website', '#dich-vu')} className="block px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium">Bọc răng sứ thẩm mỹ</a>
              <a href="#dich-vu" onClick={() => handleNav('website', '#dich-vu')} className="block px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium">Niềng răng Invisalign / Mắc cài</a>
              <a href="#dich-vu" onClick={() => handleNav('website', '#dich-vu')} className="block px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium">Dán sứ Veneer</a>
              <a href="#dich-vu" onClick={() => handleNav('website', '#dich-vu')} className="block px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium">Tẩy trắng răng Laser</a>
              <a href="#dich-vu" onClick={() => handleNav('website', '#dich-vu')} className="block px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium">Trám răng &amp; Chữa tủy</a>
              <a href="#dich-vu" onClick={() => handleNav('website', '#dich-vu')} className="block px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium">Cạo vôi răng sóng siêu âm</a>
            </div>
          </div>

          <a 
            href="#cong-nghe"
            onClick={() => handleNav('website', '#cong-nghe')}
            className="px-3 py-2 rounded-lg hover:text-teal-700 hover:bg-slate-50 transition-colors"
          >
            Công nghệ
          </a>

          <a 
            href="#cau-chuyen"
            onClick={() => handleNav('website', '#cau-chuyen')}
            className="px-3 py-2 rounded-lg hover:text-teal-700 hover:bg-slate-50 transition-colors"
          >
            Khách hàng
          </a>

          <a 
            href="#lien-he"
            onClick={() => handleNav('website', '#lien-he')}
            className="px-3 py-2 rounded-lg hover:text-teal-700 hover:bg-slate-50 transition-colors"
          >
            Liên hệ
          </a>
        </nav>

        {/* Right CTA: Hotline & Nút Đặt Lịch */}
        <div className="flex items-center gap-3">
          <a
            href="tel:0933989918"
            className="hidden md:flex items-center gap-2 text-teal-900 font-extrabold text-sm hover:text-teal-700 transition-colors bg-teal-50/80 px-3 py-2 rounded-full border border-teal-100"
          >
            <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono tracking-tight">093 398 9918</span>
          </a>

          <button
            onClick={() => handleNav('booking')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-700/20 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Đặt Lịch Khám</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex flex-col gap-1 text-sm font-semibold text-slate-800">
            <button
              onClick={() => handleNav('website')}
              className="text-left px-3 py-2 rounded-lg hover:bg-teal-50"
            >
              Trang chủ
            </button>
            <button
              onClick={() => handleNav('website', '#dich-vu')}
              className="text-left px-3 py-2 rounded-lg hover:bg-teal-50"
            >
              Dịch vụ &amp; Bảng giá
            </button>
            <button
              onClick={() => handleNav('website', '#cong-nghe')}
              className="text-left px-3 py-2 rounded-lg hover:bg-teal-50"
            >
              Công nghệ hiện đại
            </button>
            <button
              onClick={() => handleNav('website', '#cau-chuyen')}
              className="text-left px-3 py-2 rounded-lg hover:bg-teal-50"
            >
              Câu chuyện khách hàng
            </button>
            <button
              onClick={() => handleNav('website', '#lien-he')}
              className="text-left px-3 py-2 rounded-lg hover:bg-teal-50"
            >
              Địa chỉ &amp; Liên hệ
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
