import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    closeNav();
    logout();
    navigate('/login');
  };

  const firstName = user?.fullName ? user.fullName.split(' ')[0] : 'Pengguna';

  return (
    <header className="custom-navbar sticky-top border-bottom">
      <div className="container py-2">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo & Brand Name */}
          <Link
            to="/"
            onClick={closeNav}
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          >
            <i className="fa-solid fa-book text-primary fs-3 me-2"></i>
            <span className="fs-4 fw-bold text-dark">
              Book<span className="text-primary">Store</span>
            </span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="navbar-toggler d-lg-none border-0 p-2 rounded-3 text-secondary"
            onClick={toggleNav}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} fs-4 text-dark`}></i>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="d-none d-lg-flex align-items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
            >
              <i className="fa-solid fa-house nav-icon"></i>
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/books"
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
            >
              <i className="fa-solid fa-book-open nav-icon"></i>
              <span>Books</span>
            </NavLink>

            <NavLink
              to="/team"
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
            >
              <i className="fa-solid fa-users nav-icon"></i>
              <span>Team</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
            >
              <i className="fa-solid fa-envelope nav-icon"></i>
              <span>Contact</span>
            </NavLink>
          </nav>

          {/* Desktop Auth Action Buttons & Profile */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary px-3 py-2 rounded-pill fw-semibold"
                >
                  <i className="fa-solid fa-right-to-bracket me-1"></i> Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary px-3 py-2 rounded-pill fw-semibold shadow-sm text-white"
                  style={{ backgroundColor: '#0f766e', borderColor: '#0f766e' }}
                >
                  <i className="fa-solid fa-user-plus me-1"></i> Register
                </Link>
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="btn px-3 py-1.5 rounded-pill fw-semibold small shadow-sm d-inline-flex align-items-center gap-2 text-white"
                    style={{
                      background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                      border: 'none',
                    }}
                    title="Buka Portal Pengelolaan Toko"
                  >
                    <i className="fa-solid fa-shield-halved text-white"></i>
                    <span>Kelola Toko</span>
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="btn btn-light border px-3 py-1.5 rounded-pill fw-semibold d-inline-flex align-items-center gap-2 text-dark text-decoration-none shadow-xs"
                  title="Lihat Profil Saya"
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                      width: 26,
                      height: 26,
                      backgroundColor: isAdmin ? '#dc2626' : '#0f766e',
                      fontSize: '0.75rem',
                    }}
                  >
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <span className="small">{firstName}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px' }}
                  title="Keluar dari akun"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: '0.8rem' }}></i>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isOpen && (
          <div className="d-lg-none pt-3 pb-2 border-top mt-3 mobile-nav-menu animate-fadeIn">
            <div className="d-flex flex-column gap-2 mb-3">
              <NavLink
                to="/"
                end
                onClick={closeNav}
                className={({ isActive }) =>
                  `nav-link-item mobile ${isActive ? 'active' : ''}`
                }
              >
                <i className="fa-solid fa-house nav-icon"></i>
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/books"
                onClick={closeNav}
                className={({ isActive }) =>
                  `nav-link-item mobile ${isActive ? 'active' : ''}`
                }
              >
                <i className="fa-solid fa-book-open nav-icon"></i>
                <span>Books</span>
              </NavLink>

              <NavLink
                to="/team"
                onClick={closeNav}
                className={({ isActive }) =>
                  `nav-link-item mobile ${isActive ? 'active' : ''}`
                }
              >
                <i className="fa-solid fa-users nav-icon"></i>
                <span>Team</span>
              </NavLink>

              <NavLink
                to="/contact"
                onClick={closeNav}
                className={({ isActive }) =>
                  `nav-link-item mobile ${isActive ? 'active' : ''}`
                }
              >
                <i className="fa-solid fa-envelope nav-icon"></i>
                <span>Contact</span>
              </NavLink>
            </div>

            <div className="pt-2 border-top">
              {!isAuthenticated ? (
                <div className="d-flex gap-2">
                  <Link
                    to="/login"
                    onClick={closeNav}
                    className="btn btn-outline-primary w-50 py-2 rounded-pill fw-semibold text-center text-decoration-none"
                  >
                    <i className="fa-solid fa-right-to-bracket me-1"></i> Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeNav}
                    className="btn btn-primary w-50 py-2 rounded-pill fw-semibold text-center text-decoration-none text-white"
                    style={{ backgroundColor: '#0f766e', borderColor: '#0f766e' }}
                  >
                    <i className="fa-solid fa-user-plus me-1"></i> Register
                  </Link>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeNav}
                      className="btn text-white w-100 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm text-decoration-none"
                      style={{
                        background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                        border: 'none',
                      }}
                    >
                      <i className="fa-solid fa-shield-halved"></i>
                      <span>Kelola Toko</span>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    onClick={closeNav}
                    className="btn btn-light d-flex align-items-center justify-content-between p-2 rounded-3 border text-decoration-none"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: isAdmin ? '#dc2626' : '#0f766e',
                        }}
                      >
                        {firstName.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-start">
                        <div className="fw-semibold text-dark small">{user?.fullName}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>@{user?.username}</div>
                      </div>
                    </div>
                    <span className="small text-muted fw-semibold">
                      {isAdmin ? 'Admin Toko' : 'Member'}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-outline-danger w-100 py-2 rounded-pill fw-semibold"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> Keluar Akun
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
