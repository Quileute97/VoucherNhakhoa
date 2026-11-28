import React, { useState, useEffect } from 'react';
import MainLanding from './components/Website/MainLanding';
import VoucherGenerator from './components/VoucherGenerator';
import BookingPage from './components/BookingPage';

export default function App() {
  // Trạng thái route: 'website' (mặc định), 'generator', 'booking'
  const [currentRoute, setCurrentRoute] = useState('website');
  const [activeRefCode, setActiveRefCode] = useState('');

  // Đồng bộ route từ URL (hỗ trợ cả pathname và hash)
  useEffect(() => {
    const handleUrlChange = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;

      const urlParams = new URLSearchParams(search || (hash.includes('?') ? hash.split('?')[1] : ''));
      const ref = urlParams.get('ref');
      if (ref) {
        setActiveRefCode(ref);
      }

      if (pathname.includes('/dat-lich') || hash.includes('/dat-lich') || hash.includes('dat-lich')) {
        setCurrentRoute('booking');
      } else if (pathname.includes('/tao-voucher') || hash.includes('/tao-voucher') || hash.includes('tao-voucher')) {
        setCurrentRoute('generator');
      } else {
        // Mặc định hiển thị toàn bộ trang web Nha khoa HH Dental được clone từ hhdental.vn
        setCurrentRoute('website');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (route, ref) => {
    setCurrentRoute(route);
    if (ref) setActiveRefCode(ref);

    let path = '/';
    if (route === 'generator') path = '/tao-voucher';
    else if (route === 'booking') path = ref ? `/dat-lich?ref=${encodeURIComponent(ref)}` : '/dat-lich';

    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-slate-900 selection:bg-teal-600 selection:text-white">
      {/* 1. TOÀN BỘ WEBSITE NHA KHOA HH DENTAL (hhdental.vn) */}
      {currentRoute === 'website' && (
        <MainLanding 
          onNavigate={(targetRoute) => navigateTo(targetRoute, activeRefCode)}
          onBookService={(serviceName) => navigateTo('booking', activeRefCode)}
        />
      )}

      {/* 2. CHUYÊN MỤC TẠO VOUCHER CHO ĐỐI TÁC (CTV 1HUMAN.AT DESIGN) */}
      {currentRoute === 'generator' && (
        <div className="bg-[#090D14] text-slate-100 min-h-screen">
          <VoucherGenerator 
            onNavigateToBooking={(ref) => navigateTo('booking', ref)}
            onNavigateToWebsite={() => navigateTo('website')}
          />
        </div>
      )}

      {/* 3. TRANG ĐẶT LỊCH KHI KHÁCH QUÉT MÃ QR TỪ VOUCHER */}
      {currentRoute === 'booking' && (
        <div className="bg-[#090D14] text-slate-100 min-h-screen">
          <BookingPage 
            initialRefCode={activeRefCode}
            onBackToGenerator={() => navigateTo('generator')}
            onBackToWebsite={() => navigateTo('website')}
          />
        </div>
      )}
    </div>
  );
}