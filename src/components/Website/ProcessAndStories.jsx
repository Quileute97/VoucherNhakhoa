import React from 'react';
import { 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  Calendar,
  MessageSquare
} from 'lucide-react';

export default function ProcessAndStories({ onBookNow }) {
  const steps = [
    {
      num: '01',
      title: 'Tiếp Nhận & Khám 0đ',
      desc: 'Lễ tân tiếp đón, chụp phim CT Cone Beam 3D và quét mẫu hàm số hóa miễn phí 100% khi có Voucher CTV.',
    },
    {
      num: '02',
      title: 'Hội Chẩn & Tư Vấn Phác Đồ',
      desc: 'Bác sĩ chuyên khoa Răng Hàm Mặt trực tiếp phân tích phim, giải thích minh bạch chi phí và kế hoạch điều trị.',
    },
    {
      num: '03',
      title: 'Vô Trùng Dụng Cụ Chuẩn Y Tế',
      desc: 'Mỗi khách hàng được phục vụ trong phòng điều trị riêng, sử dụng 1 bộ khay khám và tay khoan vô khuẩn riêng biệt.',
    },
    {
      num: '04',
      title: 'Thực Hiện Điều Trị Nhẹ Nhàng',
      desc: 'Ứng dụng kỹ thuật gây tê không đau và thiết bị công nghệ cao giúp quá trình diễn ra êm ái, an toàn, nhanh chóng.',
    },
    {
      num: '05',
      title: 'Kiểm Tra Khớp Cắn & Thẩm Mỹ',
      desc: 'Bác sĩ tinh chỉnh từng chi tiết thẩm mỹ nụ cười và khớp cắn chuẩn sinh học, đảm bảo chức năng ăn nhai hoàn hảo.',
    },
    {
      num: '06',
      title: 'Cấp Thẻ Bảo Hành Chính Hãng',
      desc: 'Kích hoạt mã bảo hành điện tử chính hãng từ 10 - 15 năm, hướng dẫn chăm sóc tại nhà và hẹn lịch tái khám định kỳ.',
    },
  ];

  const testimonials = [
    {
      name: 'Chị Mai Lan',
      age: '32 tuổi - Quận 3, TP.HCM',
      treatment: 'Bọc 16 răng sứ Ceramill',
      content: 'Trước đây răng mình bị xỉn màu và khấp khểnh nhẹ làm mình rất tự ti khi giao tiếp. Sau khi làm sứ tại HH Dental, nụ cười sáng trong tự nhiên vô cùng, ăn nhai hoàn toàn bình thường!',
      rating: 5,
      partnerRef: 'Voucher Mã: P102',
    },
    {
      name: 'Anh Hoàng Nam',
      age: '45 tuổi - Quận 10, TP.HCM',
      treatment: 'Trồng 2 trụ Implant Osstem',
      content: 'Mình bị mất 2 răng hàm dưới nhiều năm, cứ sợ đau mãi không dám làm. Bác sĩ tại HH Dental gây tê nhẹ tênh, cấy trụ chỉ mất 20 phút mà không hề sưng đau. Rất cảm ơn đội ngũ nha khoa!',
      rating: 5,
      partnerRef: 'Voucher Mã: REF-N5JY',
    },
    {
      name: 'Bạn Thu Trang',
      age: '24 tuổi - Tân Bình, TP.HCM',
      treatment: 'Niềng răng trong suốt Invisalign',
      content: 'Nhờ quét dấu răng 3D iTero 5D mà mình thấy trước được hàm răng sau khi niềng. Bác sĩ lên phác đồ rất kỹ, khay niềng trong suốt đeo không ai nhận ra luôn. Voucher CTV giảm được 500k nữa.',
      rating: 5,
      partnerRef: 'Voucher Mã: P102',
    },
  ];

  return (
    <section id="cau-chuyen" className="py-20 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Phần 1: Quy trình 6 bước chuẩn Y khoa */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>Quy Trình Chuẩn Y Khoa</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
            6 Bước Thăm Khám &amp; Điều Trị Chuẩn Sở Y Tế
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Mỗi khách hàng tại Nha Khoa HH Dental đều được trải nghiệm quy trình khép kín, minh bạch và an toàn tuyệt đối.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-300 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-3xl font-black text-teal-600/30 group-hover:text-teal-600 transition-colors">
                  {st.num}
                </span>
                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Phần 2: Cảm nhận khách hàng thực tế */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>Khách Hàng Nói Về HH Dental</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif uppercase">
              Hơn 10.000+ Khách Hàng Hài Lòng Với Nụ Cười Mới
            </h3>
            <p className="text-slate-600 text-sm">
              Sự hài lòng và nụ cười tự tin của khách hàng là động lực lớn nhất của đội ngũ Y Bác sĩ HH Dental.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
                      {t.partnerRef}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                    <span className="text-[11px] text-slate-500 block">{t.age}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-lg">
                    {t.treatment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner cuối trang */}
        <div className="mt-16 text-center">
          <button
            onClick={onBookNow}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-sm shadow-xl shadow-teal-700/25 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Đăng Ký Khám Tổng Quát 0đ Hôm Nay</span>
          </button>
        </div>

      </div>
    </section>
  );
}