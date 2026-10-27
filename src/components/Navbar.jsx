import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';

/**
 * Navbar - Komponen Navigasi Utama Aplikasi BookStore
 * Menggunakan NavLink dari React Router dengan styling aktif interaktif
 * serta menu responsif untuk perangkat mobile.
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <header className="custom-navbar sticky-top border-bottom">
      <div className="container py-2">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo & Brand Name (Format Asli) */}
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

          {/* Desktop Auth Action Buttons */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-primary me-2 px-3 py-2 rounded-pill fw-semibold"
              onClick={() => alert('Fitur Login akan segera hadir!')}
            >
              <i className="fa-solid fa-right-to-bracket me-1"></i> Login
            </button>
            <button
              type="button"
              className="btn btn-primary px-3 py-2 rounded-pill fw-semibold shadow-sm"
              onClick={() => alert('Fitur Register akan segera hadir!')}
            >
              <i className="fa-solid fa-user-plus me-1"></i> Register
            </button>
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

            <div className="d-flex gap-2 pt-2 border-top">
              <button
                type="button"
                className="btn btn-outline-primary w-50 py-2 rounded-pill fw-semibold"
                onClick={() => {
                  closeNav();
                  alert('Fitur Login akan segera hadir!');
                }}
              >
                <i className="fa-solid fa-right-to-bracket me-1"></i> Login
              </button>
              <button
                type="button"
                className="btn btn-primary w-50 py-2 rounded-pill fw-semibold"
                onClick={() => {
                  closeNav();
                  alert('Fitur Register akan segera hadir!');
                }}
              >
                <i className="fa-solid fa-user-plus me-1"></i> Register
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
