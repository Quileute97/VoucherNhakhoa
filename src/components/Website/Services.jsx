import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  Tag,
  Star
} from 'lucide-react';

export default function Services({ onBookService, onOpenVoucher }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả dịch vụ' },
    { id: 'implant', name: 'Trồng răng Implant' },
    { id: 'porcelain', name: 'Răng sứ & Veneer' },
    { id: 'orthodontics', name: 'Niềng răng' },
    { id: 'general', name: 'Nha khoa tổng quát' },
  ];

  const serviceList = [
    {
      id: 'implant',
      category: 'implant',
      title: 'Trồng Răng Implant Kỹ Thuật Số',
      badge: 'Công nghệ tiên tiến',
      price: 'Từ 9.500.000đ / trụ',
      discountPrice: 'Tặng Voucher 500k + Khám 0đ',
      warranty: 'Bảo hành chính hãng trọn đời',
      image: '/hhdental/hero-implant.webp',
      desc: 'Phục hình mất răng bằng trụ Titanium chính hãng Thụy Sĩ, Mỹ, Hàn Quốc. Tích hợp sinh học nhanh chóng, không đau, ăn nhai chắc chắn như răng thật.',
      highlights: ['Trụ Osstem, Dentium, Straumann', 'Chụp phim CT Cone Beam 3D miễn phí', 'Không sưng, cấy ghép chuẩn xác'],
    },
    {
      id: 'boc-su',
      category: 'porcelain',
      title: 'Bọc Răng Sứ Thẩm Mỹ Cao Cấp',
      badge: 'Bảo tồn răng thật',
      price: 'Từ 1.800.000đ / răng',
      discountPrice: 'Giảm 500.000đ với Voucher CTV',
      warranty: 'Bảo hành 10 - 15 năm',
      image: '/hhdental/service-boc-su.webp',
      desc: 'Dòng sứ nguyên khối không kim loại (Ceramill, Emax, Cercon, Lava Plus). Thấu quang tự nhiên, trắng trong, không đen viền nướu theo thời gian.',
      highlights: ['Thiết kế nụ cười DSD chuẩn tỷ lệ vàng', 'Công nghệ CAD/CAM chính xác 100%', 'Bảo tồn tủy răng tối đa'],
    },
    {
      id: 'nieng-rang',
      category: 'orthodontics',
      title: 'Niềng Răng Invisalign & Mắc Cài',
      badge: 'Chỉnh nha chuẩn Y khoa',
      price: 'Từ 18.000.000đ / liệu trình',
      discountPrice: 'Trả góp 0% lãi suất',
      warranty: 'Hợp đồng cam kết hiệu quả',
      image: '/hhdental/service-nieng-rang.webp',
      desc: 'Khắc phục hoàn toàn răng hô, móm, thưa, khấp khểnh. Scan dấu răng 3D với máy quét iTero Element 5D xem trước kết quả sau niềng.',
      highlights: ['Mắc cài tự khóa thông minh', 'Khay trong suốt Invisalign Hoa Kỳ', 'Không nhổ răng bừa bãi'],
    },
    {
      id: 'veneer',
      category: 'porcelain',
      title: 'Dán Sứ Veneer Siêu Mỏng',
      badge: 'Bảo tồn răng 100%',
      price: 'Từ 4.500.000đ / mặt dán',
      discountPrice: 'Ưu đãi Voucher CTV độc quyền',
      warranty: 'Bảo hành 15 năm',
      image: '/hhdental/service-veneer.webp',
      desc: 'Độ mỏng chỉ từ 0.2mm - 0.5mm, không mài nhỏ răng thật. Che phủ khuyết điểm xỉn màu, mẻ, răng thưa mang lại nụ cười rạng rỡ tự nhiên.',
      highlights: ['Không lấy tủy, không ê buốt', 'Sứ Emax Press tinh xảo', 'Ăn nhai cảm biến nhiệt như răng thật'],
    },
    {
      id: 'tay-trang',
      category: 'general',
      title: 'Tẩy Trắng Răng Laser Whitening',
      badge: 'Trắng bật 3 - 5 tone',
      price: 'Từ 990.000đ / ca',
      discountPrice: 'Miễn phí cạo vôi răng đi kèm',
      warranty: 'Cam kết trắng sáng rõ rệt',
      image: '/hhdental/service-tay-trang.webp',
      desc: 'Kích hoạt tinh chất làm trắng bằng ánh sáng laser lạnh chuyên dụng. Loại bỏ ố vàng do trà, cà phê, thuốc lá mà không hại men răng.',
      highlights: ['Chỉ 45 phút hoàn thành', 'Thuốc tẩy trắng nhập khẩu Mỹ', 'Không gây buốt rát nướu'],
    },
    {
      id: 'tram-rang',
      category: 'general',
      title: 'Trám Răng Thẩm Mỹ Laser',
      badge: 'Đồng màu răng thật',
      price: 'Từ 200.000đ / răng',
      discountPrice: 'Áp dụng Voucher CTV',
      warranty: 'Bảo hành độ bền miếng trám',
      image: '/hhdental/service-tram-rang.webp',
      desc: 'Vật liệu Composite nano cao cấp phục hình răng sâu, răng mẻ, hở kẽ răng cửa. Kết dính chắc chắn, chống bong tróc khi ăn nhai.',
      highlights: ['Thao tác nhanh 15-20 phút', 'Đồng màu men răng 100%', 'Tiệt trùng khoang sâu triệt để'],
    },
    {
      id: 'chua-tuy',
      category: 'general',
      title: 'Chữa Tủy Răng Công Nghệ Vi Phẫu',
      badge: 'Bảo tồn răng tối đa',
      price: 'Từ 800.000đ / răng',
      discountPrice: 'Chụp phim kiểm tra 0đ',
      warranty: 'Bảo hành răng điều trị',
      image: '/hhdental/service-chua-tuy.webp',
      desc: 'Hệ thống định vị chóp điện tử và trâm xoay Ni-Ti dẻo dai giúp làm sạch tận cùng các ống tủy quanh co, dứt điểm cơn đau nhức răng.',
      highlights: ['Không đau, êm ái nhẹ nhàng', 'Bảo tồn thành răng sinh học', 'Hàn kín ống tủy bằng Gutta Percha'],
    },
    {
      id: 'cao-voi',
      category: 'general',
      title: 'Cạo Vôi Răng Siêu Âm Piezotome',
      badge: 'Sạch mảng bám êm ái',
      price: 'Từ 150.000đ / lần',
      discountPrice: 'Tặng 0đ khi dùng Voucher CTV',
      warranty: 'Đánh bóng men răng cao cấp',
      image: '/hhdental/service-cao-voi.webp',
      desc: 'Sử dụng bước sóng siêu âm rung tần số nhẹ tách rời cao răng dưới nướu mà không xâm lấn men răng hay làm chảy máu chân răng.',
      highlights: ['Đánh bóng chống tái bám vôi', 'Ngăn ngừa viêm nha chu, tụt lợi', 'Hơi thở sạch thơm mát'],
    },
  ];

  const filteredServices = activeCategory === 'all'
    ? serviceList
    : serviceList.filter(s => s.category === activeCategory);

  return (
    <section id="dich-vu" className="py-20 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Dịch Vụ Nha Khoa Toàn Diện</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
            Bảng Giá &amp; Dịch Vụ Tại Nha Khoa HH Dental
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Chúng tôi cam kết 100% bảng giá niêm yết công khai, minh bạch, bảo tồn răng thật tối đa 
            với sự trực tiếp thăm khám của đội ngũ Bác sĩ chuyên khoa Răng Hàm Mặt.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badge Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/hhdental/hero-implant.webp';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-teal-900/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {service.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-amber-400 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md font-mono">
                    {service.warranty}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {service.desc}
                  </p>

                  {/* Highlights checklist */}
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="p-6 pt-0">
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block uppercase font-medium">Chi phí điều trị</span>
                    <span className="text-base font-extrabold text-teal-800 font-mono">{service.price}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-amber-700 font-bold block uppercase bg-amber-100 px-2 py-0.5 rounded-md">
                      {service.discountPrice}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onBookService && onBookService(service.title)}
                    className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs tracking-wide shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Đặt Lịch Khám</span>
                  </button>

                  <button
                    onClick={onOpenVoucher}
                    className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs tracking-wide flex items-center justify-center gap-1 active:scale-95 transition-all"
                  >
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tạo Voucher</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voucher Banner inside Services */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.15),transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 inline-block">
              Đặc quyền Cộng Tác Viên &amp; Đối Tác
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-serif">
              Tạo Thẻ Voucher Khám 0đ &amp; Giảm 500k Cho Khách Hàng Của Bạn
            </h3>
            <p className="text-teal-100 text-sm leading-relaxed">
              Bạn là Đối tác, CTV của HH Dental? Chỉ cần 30 giây để tạo Voucher thẻ VIP cá nhân hóa với Mã Ref và QR Code tự động để chia sẻ qua Zalo, Messenger cho bạn bè, người thân.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenVoucher}
                className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-400/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Mở Trình Tạo Voucher Ngay</span>
              </button>
              <button
                onClick={() => onBookService && onBookService('Khám tổng quát 0đ')}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
              >
                Đặt lịch trực tiếp không cần mã
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}