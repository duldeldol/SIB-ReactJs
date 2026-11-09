import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Book from './pages/Book';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import Dashboard from './pages/admin/Dashboard';
import Genres from './pages/admin/Genres';
import Authors from './pages/admin/Authors';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Kategori Layout Publik (Navbar & Footer Toko) */}
          <Route element={<MainLayout />}>
            {/* Rute Publik Terbuka */}
            <Route index element={<Home />} />
            <Route path="books" element={<Book />} />
            <Route path="book" element={<Book />} />
            <Route path="team" element={<Team />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* Rute Terproteksi Pengguna Terotentikasi (User & Admin) */}
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Kategori Rute Khusus Administrator (Role-Based Access Control: 'admin') */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="genres" element={<Genres />} />
              <Route path="authors" element={<Authors />} />
            </Route>
          </Route>

          {/* Rute Catch-all Fallback (404 Not Found) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
