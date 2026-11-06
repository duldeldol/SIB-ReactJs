import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Book from './pages/Book';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/admin/Dashboard';
import Genres from './pages/admin/Genres';
import Authors from './pages/admin/Authors';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Kategori Layout Publik (Navbar & Footer Toko) */}
        <Route element={<MainLayout />}>
          {/* Halaman Index / Utama */}
          <Route index element={<Home />} />

          {/* Halaman Katalog Buku (Mendukung path 'books' dan 'book') */}
          <Route path="books" element={<Book />} />
          <Route path="book" element={<Book />} />

          {/* Halaman Profil Tim */}
          <Route path="team" element={<Team />} />

          {/* Halaman Kontak & Bantuan */}
          <Route path="contact" element={<Contact />} />

          {/* Halaman Registrasi Pengguna Baru (Tugas 6) */}
          <Route path="register" element={<Register />} />
        </Route>

        {/* Kategori Layout Admin (Admin Sidebar & Topbar - Tugas 4) */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="genres" element={<Genres />} />
          <Route path="authors" element={<Authors />} />
        </Route>

        {/* Rute Catch-all Fallback (404 Not Found) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
