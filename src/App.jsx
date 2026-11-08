import React, { useState, useEffect } from 'react';
import VoucherGenerator from './components/VoucherGenerator';
import BookingPage from './components/BookingPage';

export default function App() {
  // Trạng thái route: 'generator' hoặc 'booking'
  const [currentRoute, setCurrentRoute] = useState('generator');
  const [activeRefCode, setActiveRefCode] = useState('');

  // Đồng bộ route từ URL
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
      } else {
        setCurrentRoute('generator');
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

  const navigateToBooking = (ref) => {
    setActiveRefCode(ref || '');
    setCurrentRoute('booking');
    const newUrl = ref ? `/dat-lich?ref=${encodeURIComponent(ref)}` : '/dat-lich';
    window.history.pushState({}, '', newUrl);
  };

  const navigateToGenerator = () => {
    setCurrentRoute('generator');
    window.history.pushState({}, '', '/tao-voucher');
  };

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 selection:bg-[#FF5722] selection:text-white relative">
      {/* View router */}
      {currentRoute === 'generator' ? (
        <VoucherGenerator onNavigateToBooking={navigateToBooking} />
      ) : (
        <BookingPage 
          initialRefCode={activeRefCode} 
          onBackToGenerator={navigateToGenerator} 
        />
      )}
    </div>
  );
}
