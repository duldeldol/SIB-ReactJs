import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * App - Konfigurasi Utama Declarative Routing
 * Sesuai panduan resmi React Router (https://reactrouter.com/start/declarative/routing):
 * Menggunakan Layout Route (<Route element={<MainLayout />}>) untuk membungkus
 * seluruh rute ke dalam kategori elemennya masing-masing secara rapi dan modular.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Kategori Layout Route (Membungkus Shell Navbar & Footer) */}
        <Route element={<MainLayout />}>
          {/* Halaman Index / Utama */}
          <Route index element={<Home />} />

          {/* Halaman Profil Tim */}
          <Route path="team" element={<Team />} />

          {/* Halaman Kontak & Bantuan */}
          <Route path="contact" element={<Contact />} />

          {/* Rute Catch-all Fallback (404 Not Found) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
