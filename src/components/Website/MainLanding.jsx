import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Technology from './Technology';
import ProcessAndStories from './ProcessAndStories';
import Footer from './Footer';

export default function MainLanding({ onNavigate, onBookService }) {
  const handleBookNow = (serviceName) => {
    onNavigate('booking');
  };

  const handleOpenVoucherHub = () => {
    onNavigate('generator');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-600 selection:text-white">
      {/* 1. Header & Navigation Bar */}
      <Navbar currentRoute="website" onNavigate={onNavigate} />

      {/* 2. Hero Section with dynamic slides */}
      <Hero 
        onBookNow={() => handleBookNow('Tư vấn tổng quát')} 
        onOpenVoucherHub={handleOpenVoucherHub} 
      />

      {/* 3. Services & Pricing Grid (9 Services) */}
      <Services 
        onBookService={handleBookNow} 
        onOpenVoucher={handleOpenVoucherHub} 
      />

      {/* 4. Modern Medical Technology */}
      <Technology 
        onBookAppointment={() => handleBookNow('Khám máy 3D')} 
      />

      {/* 5. Clinical Workflow & Customer Testimonials */}
      <ProcessAndStories 
        onBookNow={() => handleBookNow('Khám tổng quát 0đ')} 
      />

      {/* 6. Footer & Clinic Info */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}