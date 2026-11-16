import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Heart,
  Calendar,
  Users,
  ChevronRight
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer id="lien-he" className="bg-[#0b1319] text-slate-300 font-sans border-t border-slate-800">
      
      {/* Top Footer Banner */}
      <div className="bg-teal-950/80 border-b border-teal-900/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
              Tư Vấn Miễn Phí 24/7
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Bạn Cần Tư Vấn Răng Sứ, Implant Hay Niềng Răng?
            </h3>
            <p className="text-xs sm:text-sm text-teal-200/80 mt-1">
              Đội ngũ Bác sĩ chuyên khoa RHM tại HH Dental luôn sẵn sàng giải đáp mọi thắc mắc.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:0933989918"
              className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline: 093 398 9918</span>
            </a>

            <button
              onClick={() => onNavigate('booking')}
              className="px-6 py-3 rounded-full bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Đặt Lịch Khám 0đ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Cột 1: Thông tin phòng khám & Pháp lý (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/hhdental/logo.webp"
                alt="HH Dental"
                className="h-10 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  e.target.src = '/logo.png';
                }}
              />
              <div>
                <h4 className="font-extrabold text-base text-white tracking-wide uppercase font-serif">
                  Nha Khoa HH Dental
                </h4>
                <p className="text-[11px] text-teal-400 font-medium">
                  Phòng Khám Chuyên Khoa Răng Hàm Mặt
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Nha khoa HH Dental tự hào là đơn vị nha khoa uy tín tại TP.HCM với cơ sở vật chất hiện đại, 
              trang thiết bị máy móc CT Cone Beam 3D và iTero 5D chuyển giao từ Châu Âu và Hàn Quốc.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong>Địa chỉ:</strong> 251 Vĩnh Viễn, Phường 4, Quận 10, TP. Hồ Chí Minh
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300">
                  <strong>Hotline:</strong> 093 398 9918 (Hỗ trợ 24/7)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300">
                  <strong>Email:</strong> nhakhoahhdental@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300">
                  <strong>Giờ làm việc:</strong> T2 - T7: 08:30 - 19:30 | CN: 08:30 - 17:00
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <span className="block font-semibold text-teal-300">Giấy phép hoạt động khám chữa bệnh:</span>
              Số: 09252/HCM-GPHĐ cấp bởi Sở Y Tế Thành Phố Hồ Chí Minh.
            </div>
          </div>

          {/* Cột 2: Danh mục dịch vụ (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Dịch Vụ Điều Trị
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#dich-vu" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Trồng răng Implant kỹ thuật số</span>
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Bọc răng sứ thẩm mỹ Ceramill</span>
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Niềng răng Invisalign &amp; Mắc cài</span>
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Dán sứ Veneer không mài răng</span>
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Tẩy trắng răng Laser Whitening</span>
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Trám răng thẩm mỹ Composite</span>
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Cạo vôi răng sóng siêu âm</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Tiện ích hệ thống & Cổng CTV (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Hệ Thống &amp; Cổng Đối Tác
            </h5>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Cổng tương tác dành riêng cho Đối tác (CTV) và Lễ tân trực ca của Phòng khám Nha khoa HH Dental.
            </p>

            <div className="space-y-2.5">
              {/* Nút Tạo Voucher CTV */}
              <button
                onClick={() => onNavigate('generator')}
                className="w-full p-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-200 flex items-center justify-between text-xs font-bold transition-all text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                    1H
                  </div>
                  <div>
                    <span className="block text-white font-bold">Tạo Voucher Cho Đối Tác (CTV)</span>
                    <span className="text-[10px] text-amber-300 font-normal">Hệ thống tạo mã QR &amp; Voucher tự động</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Nút Quầy Lễ Tân CRM */}
              <button
                onClick={() => onNavigate('reception')}
                className="w-full p-3 rounded-2xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-200 flex items-center justify-between text-xs font-bold transition-all text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="block text-white font-bold">Cổng Tiếp Nhận Lễ Tân (CRM)</span>
                    <span className="text-[10px] text-teal-300 font-normal">Danh sách khách hàng chờ khám</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <span className="block font-semibold text-slate-200 mb-0.5">Chính sách hoa hồng Đối tác:</span>
              Chi trả 20% tự động khi khách hàng thực hiện điều trị thành công tại phòng khám.
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-14 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Nha Khoa HH Dental (hhdental.vn). All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Thiết kế &amp; vận hành bởi</span>
            <span className="text-teal-400 font-semibold">Hệ thống Voucher Generator CTV</span>
          </p>
        </div>

      </div>

    </footer>
  );
}