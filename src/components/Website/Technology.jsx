import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Zap,
  ArrowRight
} from 'lucide-react';

export default function Technology({ onBookAppointment }) {
  const techList = [
    {
      id: 'ct-cone-beam',
      title: 'Hệ Thống Chụp Phim CT Cone Beam 3D',
      badge: 'Chẩn đoán hình ảnh 3D',
      image: '/hhdental/tech-ct-cone-beam.webp',
      desc: 'Cho hình ảnh cắt lớp 3 chiều sắc nét cấu trúc xương hàm, hệ thống thần kinh và xoang hàm với liều tia X cực thấp, an toàn tuyệt đối cho người bệnh.',
      benefits: [
        'Đo đạc mật độ xương chính xác từng milimet cho Implant',
        'Xác định hướng mọc răng khôn ngầm để nhổ không đau',
        'Thời gian chụp nhanh chỉ mất 15-20 giây',
      ],
    },
    {
      id: 'itero-5d',
      title: 'Máy Quét Dấu Hàm iTero Element 5D',
      badge: 'Công nghệ mô phỏng nụ cười',
      image: '/hhdental/tech-itero.webp',
      desc: 'Thay thế hoàn toàn phương pháp lấy dấu cao su truyền thống gây buồn nôn. Quét đa chiều toàn hàm chỉ trong 60 giây và mô phỏng nụ cười niềng răng ngay trên màn hình.',
      benefits: [
        'Công nghệ NIRI phát hiện sớm sâu răng kẽ ẩn',
        'Mô phỏng kết quả niềng răng trước & sau chuẩn xác',
        'Dữ liệu số hóa truyền thẳng đến hãng Invisalign Hoa Kỳ',
      ],
    },
    {
      id: 'ghe-osstem',
      title: 'Hệ Thống Ghế Nha Khoa Osstem Hàn Quốc',
      badge: 'Tiêu chuẩn vô trùng khép kín',
      image: '/hhdental/tech-osstem.webp',
      desc: 'Thiết kế công thái học đệm da cao cấp giúp khách hàng thư giãn tối đa trong suốt buổi khám. Tích hợp hệ thống lọc nước tiệt trùng và vô khuẩn vòi xịt tự động.',
      benefits: [
        'Hệ thống vô trùng khép kín 1 khách hàng - 1 bộ tay khoan',
        'Bơm xịt tự động làm sạch đường ống vô trùng',
        'Đèn LED phẫu thuật hội tụ ánh sáng chuẩn y khoa',
      ],
    },
  ];

  return (
    <section id="cong-nghe" className="py-20 bg-white font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
            <Cpu className="w-3.5 h-3.5 text-teal-600" />
            <span>Đầu Tư Công Nghệ Hiện Đại</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
            Trang Thiết Bị Y Khoa Tiên Tiến Nhất Tại HH Dental
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Chúng tôi liên tục cập nhật các thiết bị chẩn đoán hình ảnh và điều trị hàng đầu thế giới 
            nhằm đảm bảo phác đồ điều trị chính xác, an toàn, không đau và rút ngắn tối đa thời gian cho khách hàng.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {techList.map((tech) => (
            <div
              key={tech.id}
              className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/80 hover:border-teal-300 hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Tech Image */}
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 mb-5">
                  <img
                    src={tech.image}
                    alt={tech.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/hhdental/hero-implant.webp';
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 bg-teal-900/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    {tech.badge}
                  </div>
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">
                  {tech.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tech.desc}
                </p>

                {/* Key Benefits */}
                <div className="mt-4 space-y-2 pt-3 border-t border-slate-200/60">
                  {tech.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={onBookAppointment}
                  className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-700 text-teal-800 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Trải Nghiệm Khám Với Máy 3D</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Guarantees Box */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-teal-900 text-white text-center">
            <span className="block font-black text-2xl font-mono text-amber-300">100%</span>
            <span className="text-xs text-teal-100 font-medium mt-1 block">Khí cụ &amp; vật liệu nhập khẩu chính hãng</span>
          </div>
          <div className="p-4 rounded-2xl bg-teal-900 text-white text-center">
            <span className="block font-black text-2xl font-mono text-amber-300">1 Khách</span>
            <span className="text-xs text-teal-100 font-medium mt-1 block">1 Bộ dụng cụ vô trùng chuyên biệt</span>
          </div>
          <div className="p-4 rounded-2xl bg-teal-900 text-white text-center">
            <span className="block font-black text-2xl font-mono text-amber-300">0đ</span>
            <span className="text-xs text-teal-100 font-medium mt-1 block">Phí chụp phim CT 3D khi có Voucher CTV</span>
          </div>
          <div className="p-4 rounded-2xl bg-teal-900 text-white text-center">
            <span className="block font-black text-2xl font-mono text-amber-300">15 Năm</span>
            <span className="text-xs text-teal-100 font-medium mt-1 block">Chế độ bảo hành bằng thẻ điện tử</span>
          </div>
        </div>

      </div>
    </section>
  );
}