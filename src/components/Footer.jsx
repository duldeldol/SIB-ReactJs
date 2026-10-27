import React from 'react';

function Footer({ setActivePage }) {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4 justify-content-between">
          {/* Kolom 1: Brand & Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-book text-primary fs-3 me-2"></i>
              <span className="fs-4 fw-bold text-white">
                Book<span className="text-primary">Store</span>
              </span>
            </div>
            <p className="text-secondary small mb-3" style={{ lineHeight: '1.7' }}>
              Platform penjualan buku online terpercaya yang menyediakan berbagai macam pilihan buku best-seller, 
              pengembangan diri, sastra, dan ilmu pengetahuan dengan kualitas 100% original.
            </p>
            <div className="text-secondary small">
              <i className="fa-solid fa-location-dot text-primary me-2"></i>
              STT Terpadu Nurul Fikri, Jakarta Selatan
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="fw-bold text-white text-uppercase mb-3 small tracking-wider">
              Navigasi
            </h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li>
                <button
                  type="button"
                  className="btn btn-link text-secondary text-decoration-none p-0 small text-start"
                  onClick={() => {
                    setActivePage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-link text-secondary text-decoration-none p-0 small text-start"
                  onClick={() => {
                    setActivePage('team');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Team
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-link text-secondary text-decoration-none p-0 small text-start"
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kategori Buku */}
          <div className="col-lg-3 col-md-3 col-6">
            <h6 className="fw-bold text-white text-uppercase mb-3 small tracking-wider">
              Kategori Buku
            </h6>
            <ul className="list-unstyled text-secondary small mb-0 d-flex flex-column gap-2">
              <li>Self Improvement</li>
              <li>Fiksi & Sastra</li>
              <li>Finansial & Bisnis</li>
              <li>Sains & Teknologi</li>
            </ul>
          </div>

          {/* Kolom 4: Media Sosial & Creator */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white text-uppercase mb-3 small tracking-wider">
              Terhubung Dengan Kami
            </h6>
            <p className="text-secondary small mb-3">
              Ikuti perkembangan dan rekomendasi buku terbaru melalui media sosial kami.
            </p>
            <div className="d-flex gap-2 mb-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                title="GitHub"
              >
                <i className="fa-brands fa-github text-white"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                title="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in text-white"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                title="Instagram"
              >
                <i className="fa-brands fa-instagram text-white"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-top border-secondary pt-4 mt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="text-secondary small mb-0">
            © 2026 <strong>BookStore</strong> • Dikembangkan oleh <strong>Haydar Ali Ayyubi</strong>
          </p>
          <p className="text-secondary small mb-0">
            Studi Kasus React JS — STT Terpadu Nurul Fikri & NF Academy
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
