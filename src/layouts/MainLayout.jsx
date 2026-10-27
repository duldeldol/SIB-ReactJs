import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 app-wrapper">
      <ScrollToTop />
      {/* Header & Navigasi Utama */}
      <Navbar />

      {/* Titik Render Konten Rute Anak (Outlet) */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* Footer Aplikasi */}
      <Footer />
    </div>
  );
}

export default MainLayout;
