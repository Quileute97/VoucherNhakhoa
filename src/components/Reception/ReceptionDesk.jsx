import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  RefreshCw, 
  Phone, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Stethoscope, 
  ChevronRight,
  TrendingUp,
  Tag,
  Building2,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { fetchReceptionWaitingList, updateCustomerStatus } from '../../lib/supabase';

export default function ReceptionDesk({ onNavigateToWebsite, onNavigateToGenerator, onNavigateToBooking }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'lead', 'treating', 'completed'
  const [updatingId, setUpdatingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = async () => {
    setLoading(true);
    const res = await fetchReceptionWaitingList();
    setLoading(false);
    if (res.success) {
      setCustomers(res.data);
    } else {
      showToast('Lỗi tải danh sách: ' + res.error, 'error');
    }
  };

  useEffect(() => {
    loadData();
    // Tự động làm mới danh sách mỗi 20 giây
    const interval = setInterval(loadData, 20000);
    return () => clearInterval(interval);
  }, []);

  // Xử lý chuyển đổi trạng thái (Tiếp nhận -> Đang khám -> Hoàn tất)
  const handleUpdateStatus = async (customerId, nextStatus) => {
    setUpdatingId(customerId);
    const res = await updateCustomerStatus(customerId, nextStatus);
    setUpdatingId(null);

    if (res.success) {
      const statusLabels = {
        treating: 'Đã chuyển vào phòng khám',
        completed: 'Đã hoàn thành ca khám & Kích hoạt hoa hồng 20% cho CTV',
        lead: 'Đã chuyển về danh sách chờ',
      };
      showToast(statusLabels[nextStatus] || 'Cập nhật trạng thái thành công!');
      // Cập nhật lại UI state
      setCustomers((prev) =>
        prev.map((c) => (c.id === customerId ? { ...c, status: nextStatus } : c))
      );
    } else {
      showToast('Lỗi cập nhật: ' + res.error, 'error');
    }
  };

  // Tính toán số liệu thống kê
  const totalCount = customers.length;
  const leadCount = customers.filter((c) => c.status === 'lead').length;
  const treatingCount = customers.filter((c) => c.status === 'treating').length;
  const completedCount = customers.filter((c) => c.status === 'completed').length;
  const ctvAttributedCount = customers.filter((c) => Boolean(c.owner_partner_id || c.partnerCode)).length;

  // Lọc theo tìm kiếm và trạng thái
  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.phone && c.phone.includes(q)) ||
      (c.code && c.code.toLowerCase().includes(q)) ||
      (c.partnerCode && c.partnerCode.toLowerCase().includes(q)) ||
      (c.treatment && c.treatment.toLowerCase().includes(q));

    const matchStatus = statusFilter === 'all' || c.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-teal-600 selection:text-white pb-16">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className={`px-4 py-2.5 rounded-full shadow-2xl border text-xs font-bold flex items-center gap-2 ${
            toastMessage.type === 'error'
              ? 'bg-rose-950 text-rose-200 border-rose-800'
              : 'bg-teal-900 text-teal-100 border-teal-700'
          }`}>
            {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-400" /> : <Check className="w-4 h-4 text-teal-400" />}
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}

      {/* Header bar cho User Lễ Tân */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToWebsite}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Về Website HH Dental"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 font-serif uppercase tracking-tight">
                  Quầy Tiếp Nhận Lễ Tân
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800 font-mono">
                  CRM DENTAL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Nha Khoa HH Dental • 251 Vĩnh Viễn, Q.10, TP.HCM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Lễ Tân: Đang trực ca</span>
            </div>

            <button
              onClick={loadData}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all active:scale-95 disabled:opacity-50"
              title="Làm mới danh sách"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-teal-600' : ''}`} />
            </button>

            <a
              href="https://hh-dental-crm.drminhdat-work.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hệ Thống CRM Live</span>
            </a>

            <button
              onClick={onNavigateToGenerator}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Tạo Voucher CTV</span>
            </button>

            <button
              onClick={onNavigateToBooking}
              className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Đặt Lịch Mới</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Banner thông báo luồng CTV */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 uppercase">
              <ShieldCheck className="w-3 h-3" />
              <span>Tự Động Ghi Nhận Đối Tác 20%</span>
            </div>
            <h2 className="text-xl font-extrabold font-serif">
              Danh Sách Chờ Khám &amp; Đối Soát Khách Hàng Từ Voucher CTV
            </h2>
            <p className="text-xs text-teal-100 max-w-2xl leading-relaxed">
              Khách hàng quét mã QR trên Voucher hoặc đặt lịch qua link <code>?ref=MÃ_CTV</code> sẽ tự động xuất hiện tại đây kèm Mã đối tác. 
              Khi tiếp nhận và hoàn tất ca khám, hệ thống sẽ xác nhận chi trả hoa hồng 20% cho CTV.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shrink-0 w-full md:w-auto">
            <span className="text-[11px] text-teal-200 block uppercase font-medium">Khách từ CTV / Voucher</span>
            <span className="text-3xl font-black font-mono text-amber-300 block">{ctvAttributedCount}</span>
            <span className="text-[10px] text-teal-300">Tự động gắn mã bảo trợ</span>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div 
            onClick={() => setStatusFilter('all')}
            className={`bg-white p-5 rounded-2xl border cursor-pointer transition-all ${
              statusFilter === 'all' ? 'border-teal-500 shadow-md ring-2 ring-teal-500/20' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold uppercase">Tổng lượt đặt</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 font-mono">{totalCount}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Tất cả khách hẹn</span>
          </div>

          <div 
            onClick={() => setStatusFilter('lead')}
            className={`bg-white p-5 rounded-2xl border cursor-pointer transition-all ${
              statusFilter === 'lead' ? 'border-amber-500 shadow-md ring-2 ring-amber-500/20' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-600 font-semibold uppercase">Chờ khám</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-black text-amber-600 font-mono">{leadCount}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Cần tiếp nhận khám</span>
          </div>

          <div 
            onClick={() => setStatusFilter('treating')}
            className={`bg-white p-5 rounded-2xl border cursor-pointer transition-all ${
              statusFilter === 'treating' ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 font-semibold uppercase">Đang khám</span>
              <Stethoscope className="w-4 h-4 text-blue-500" />
            </div>
            <div className="mt-2 text-2xl font-black text-blue-600 font-mono">{treatingCount}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Trong phòng điều trị</span>
          </div>

          <div 
            onClick={() => setStatusFilter('completed')}
            className={`bg-white p-5 rounded-2xl border cursor-pointer transition-all ${
              statusFilter === 'completed' ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-600 font-semibold uppercase">Đã khám xong</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-black text-emerald-600 font-mono">{completedCount}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Đã hoàn thành ca</span>
          </div>

        </div>

        {/* Thanh tìm kiếm & Bộ lọc trạng thái */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Ô tìm kiếm */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo Tên khách, SĐT, Mã CTV (P102)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Nút lọc Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('lead')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === 'lead'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              Chờ khám ({leadCount})
            </button>
            <button
              onClick={() => setStatusFilter('treating')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === 'treating'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              Đang khám ({treatingCount})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Đã xong ({completedCount})
            </button>
          </div>

        </div>

        {/* Bảng danh sách bệnh nhân chờ khám */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Danh Sách Khách Hàng Đến Khám
              </h3>
              <p className="text-xs text-slate-500">
                Hiển thị {filteredCustomers.length} / {totalCount} khách hàng trong hệ thống
              </p>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <span>Tự động cập nhật mỗi 20s</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
            </div>
          </div>

          {loading ? (
            <div className="p-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-semibold">Đang tải danh sách chờ khám từ máy chủ...</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700">Không tìm thấy khách hàng nào</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {searchQuery ? 'Thử thay đổi từ khóa tìm kiếm.' : 'Chưa có lượt đặt lịch nào trong bộ lọc này.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Mã KH &amp; Thời Gian</th>
                    <th className="py-3 px-4">Khách Hàng</th>
                    <th className="py-3 px-4">Dịch Vụ &amp; Ghi Chú</th>
                    <th className="py-3 px-4">Đối Tác Bảo Trợ (CTV)</th>
                    <th className="py-3 px-4">Trạng Thái</th>
                    <th className="py-3 px-4 text-right">Thao Tác Lễ Tân</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((cust) => {
                    const isUpdating = updatingId === cust.id;
                    const partnerCode = cust.partnerCode || (cust.owner_partner_id ? 'P102' : null);

                    return (
                      <tr 
                        key={cust.id}
                        className="hover:bg-teal-50/40 transition-colors"
                      >
                        {/* 1. Mã KH & Ngày tạo */}
                        <td className="py-4 px-4 align-top">
                          <span className="font-mono font-bold text-slate-900 block">
                            {cust.code || `KH-${cust.id.slice(0, 8)}`}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {cust.created_at ? new Date(cust.created_at).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) : 'Vừa xong'}
                          </span>
                        </td>

                        {/* 2. Tên & SĐT khách */}
                        <td className="py-4 px-4 align-top">
                          <span className="font-bold text-slate-900 text-sm block">
                            {cust.name}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={`tel:${cust.phone}`}
                              className="font-mono text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 hover:underline"
                            >
                              <Phone className="w-3 h-3 text-teal-600" />
                              <span>{cust.phone}</span>
                            </a>
                          </div>
                        </td>

                        {/* 3. Dịch vụ đăng ký */}
                        <td className="py-4 px-4 align-top max-w-xs">
                          <span className="font-semibold text-slate-800 block">
                            {cust.treatment || 'Khám tổng quát & Chụp X-Quang 0đ'}
                          </span>
                        </td>

                        {/* 4. Đối tác bảo trợ (CTV) - CHỈ HIỂN THỊ ID/MÃ */}
                        <td className="py-4 px-4 align-top">
                          {partnerCode ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                                <Tag className="w-3 h-3 text-amber-700" />
                                <span>{partnerCode}</span>
                              </span>
                              <span className="block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                ⭐ Hoa hồng CTV: 20%
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">
                              Khách vãng lai trực tiếp
                            </span>
                          )}
                        </td>

                        {/* 5. Trạng thái */}
                        <td className="py-4 px-4 align-top">
                          {cust.status === 'treating' ? (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                              <span>Đang khám</span>
                            </span>
                          ) : cust.status === 'completed' ? (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Đã khám xong</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>Chờ tiếp nhận</span>
                            </span>
                          )}
                        </td>

                        {/* 6. Thao tác tiếp nhận của Lễ Tân */}
                        <td className="py-4 px-4 align-top text-right space-x-1">
                          {cust.status === 'lead' && (
                            <button
                              onClick={() => handleUpdateStatus(cust.id, 'treating')}
                              disabled={isUpdating}
                              className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs active:scale-95 transition-all inline-flex items-center gap-1"
                            >
                              {isUpdating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Stethoscope className="w-3 h-3" />}
                              <span>Tiếp Nhận Khám</span>
                            </button>
                          )}

                          {cust.status === 'treating' && (
                            <button
                              onClick={() => handleUpdateStatus(cust.id, 'completed')}
                              disabled={isUpdating}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all inline-flex items-center gap-1"
                            >
                              {isUpdating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                              <span>Hoàn Tất Ca</span>
                            </button>
                          )}

                          {cust.status === 'completed' && (
                            <span className="text-[11px] font-semibold text-emerald-700 inline-flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              <span>Đã duyệt 20% CTV</span>
                            </span>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}