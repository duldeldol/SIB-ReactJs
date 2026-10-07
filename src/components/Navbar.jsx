import React from 'react';

function Navbar({ activePage, setActivePage }) {
  return (
    <header className="p-3 mb-0 border-bottom bg-white sticky-top shadow-sm">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between">
          {/* Logo & Brand Name */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
            }}
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          >
            <i className="fa-solid fa-book text-primary fs-3 me-2"></i>
            <span className="fs-4 fw-bold text-dark">Book<span className="text-primary">Store</span></span>
          </a>

          {/* Navigation Links */}
          <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <button
                type="button"
                className={`btn btn-link nav-link px-3 ${activePage === 'home' ? 'text-primary fw-bold' : 'text-secondary'}`}
                onClick={() => setActivePage('home')}
              >
                <i className="fa-solid fa-house me-1"></i> Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`btn btn-link nav-link px-3 ${activePage === 'team' ? 'text-primary fw-bold' : 'text-secondary'}`}
                onClick={() => setActivePage('team')}
              >
                <i className="fa-solid fa-users me-1"></i> Team
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`btn btn-link nav-link px-3 ${activePage === 'contact' ? 'text-primary fw-bold' : 'text-secondary'}`}
                onClick={() => setActivePage('contact')}
              >
                <i className="fa-solid fa-envelope me-1"></i> Contact
              </button>
            </li>
          </ul>

          {/* Auth Action Buttons */}
          <div className="col-md-3 text-end">
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={() => alert('Fitur Login akan segera hadir!')}
            >
              <i className="fa-solid fa-right-to-bracket me-1"></i> Login
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => alert('Fitur Register akan segera hadir!')}
            >
              <i className="fa-solid fa-user-plus me-1"></i> Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
