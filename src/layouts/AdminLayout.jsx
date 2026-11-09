import React, { useState } from 'react';
import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router';
import ScrollToTop from '../components/ScrollToTop';
import { useAuth } from '../context/useAuth';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Helper title berdasarkan path
  const getPageTitle = () => {
    if (location.pathname === '/admin/genres') return 'Kelola Genre Buku';
    if (location.pathname === '/admin/authors') return 'Kelola Penulis & Author';
    return 'Admin Dashboard';
  };

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    closeSidebar();
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-wrapper d-flex min-vh-100 bg-light">
      <ScrollToTop />

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="admin-backdrop d-lg-none"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`admin-sidebar bg-dark text-white d-flex flex-column flex-shrink-0 p-3 ${
          sidebarOpen ? 'open' : ''
        }`}
      >
        {/* Brand Header */}
        <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-secondary border-opacity-25">
          <Link
            to="/admin"
            onClick={closeSidebar}
            className="d-flex align-items-center text-white text-decoration-none gap-2"
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white"
              style={{ width: '40px', height: '40px' }}
            >
              <i className="fa-solid fa-book-bookmark fs-5"></i>
            </div>
            <div>
              <span className="fs-5 fw-bold d-block lh-1">
                Book<span className="text-primary">Admin</span>
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary d-lg-none text-white border-0"
            onClick={closeSidebar}
            aria-label="Tutup menu sidebar"
          >
            <i className="fa-solid fa-xmark fs-5"></i>
          </button>
        </div>

        {/* Sidebar Menu NavLink */}
        <ul className="nav nav-pills flex-column mb-auto gap-1">
          <li className="nav-item">
            <NavLink
              to="/admin"
              end
              onClick={closeSidebar}
              className={({ isActive }) =>
                `nav-link admin-nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white ${
                  isActive ? 'active bg-primary' : 'text-secondary'
                }`
              }
            >
              <i className="fa-solid fa-chart-pie admin-icon"></i>
              <span>Dashboard Ringkasan</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin/genres"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `nav-link admin-nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white ${
                  isActive ? 'active bg-primary' : 'text-secondary'
                }`
              }
            >
              <i className="fa-solid fa-tags admin-icon"></i>
              <span>Kelola Genre</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin/authors"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `nav-link admin-nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white ${
                  isActive ? 'active bg-primary' : 'text-secondary'
                }`
              }
            >
              <i className="fa-solid fa-feather-pointed admin-icon"></i>
              <span>Kelola Author</span>
            </NavLink>
          </li>
        </ul>

        {/* User Admin Info & Actions */}
        <div className="pt-3 mt-auto border-top border-secondary border-opacity-25 d-flex flex-column gap-2">
          <Link
            to="/profile"
            onClick={closeSidebar}
            className="d-flex align-items-center gap-2 p-2 rounded-3 text-white text-decoration-none bg-secondary bg-opacity-25 hover-bg-secondary"
            title="Lihat Profil Admin"
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold bg-danger"
              style={{ width: 32, height: 32, fontSize: '0.8rem' }}
            >
              {user?.fullName?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="fw-semibold small text-truncate">{user?.fullName || 'Admin'}</div>
              <div className="text-secondary" style={{ fontSize: '0.7rem' }}>Administrator</div>
            </div>
          </Link>

          <Link
            to="/"
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-2 small fw-semibold"
          >
            <i className="fa-solid fa-store"></i>
            <span>Kembali ke Toko</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-1 small fw-semibold"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main flex-grow-1 d-flex flex-column min-vh-100 overflow-hidden">
        {/* Admin Topbar */}
        <header className="admin-topbar bg-white border-bottom px-3 px-md-4 py-3 d-flex align-items-center justify-content-between sticky-top shadow-sm">
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-outline-secondary d-lg-none btn-sm px-2 py-1"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle admin sidebar"
            >
              <i className="fa-solid fa-bars fs-5"></i>
            </button>
            <div>
              <h5 className="mb-0 fw-bold text-dark">{getPageTitle()}</h5>
              <small className="text-secondary d-none d-sm-inline">
                Sistem Manajemen Data BookStore
              </small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="vr mx-2 d-none d-md-block" style={{ height: '24px' }}></div>
            <Link
              to="/profile"
              className="d-flex align-items-center gap-2 bg-light px-3 py-1 rounded-pill border text-decoration-none text-dark"
              title="Profil Admin"
            >
              <i className="fa-solid fa-shield-halved text-danger"></i>
              <span className="small fw-semibold">{user?.fullName?.split(' ')[0] || 'Admin'}</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <main className="admin-content flex-grow-1 p-3 p-md-4">
          <Outlet />
        </main>

        {/* Admin Footer */}
        <footer className="admin-footer bg-white border-top py-3 px-4 text-center text-muted small">
          <span>
            © 2026 <strong>BookStore Admin Portal</strong> • Dikembangkan oleh <strong>Haydar Ali Ayyubi</strong> (STT Terpadu Nurul Fikri)
          </span>
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;
