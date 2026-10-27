import React from 'react';
import { Link } from 'react-router';

/**
 * Footer - Komponen Footer Aplikasi BookStore
 * Menggunakan Link dari React Router untuk navigasi cepat antar rute
 * serta menyajikan informasi toko dan identitas pengembang.
 */
function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto border-top border-secondary border-opacity-25">
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

          {/* Kolom 2: Navigasi Cepat (React Router Links) */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="fw-bold text-white text-uppercase mb-3 small tracking-wider">
              Navigasi
            </h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li>
                <Link
                  to="/"
                  className="text-secondary text-decoration-none small footer-link d-inline-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-secondary text-decoration-none small footer-link d-inline-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Books
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-secondary text-decoration-none small footer-link d-inline-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-secondary text-decoration-none small footer-link d-inline-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kategori Populer (Tautan Interaktif ke /books) */}
          <div className="col-lg-3 col-md-3 col-6">
            <h6 className="fw-bold text-white text-uppercase mb-3 small tracking-wider">
              Kategori Populer
            </h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li>
                <Link
                  to="/books"
                  className="text-secondary text-decoration-none small footer-link d-inline-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Teknologi & Pemrograman
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-secondary text-decoration-none small footer-link d-inline-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Self Improvement & Filsafat
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-secondary text-decoration-none small footer-link d-inline-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Fiksi & Sejarah
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-secondary text-decoration-none small footer-link d-inline-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right me-1 small"></i> Finansial & Bisnis
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  to="/books"
                  className="text-primary text-decoration-none small fw-semibold d-inline-flex align-items-center footer-cta-link"
                >
                  Lihat Semua Kategori <i className="fa-solid fa-arrow-right ms-1 small"></i>
                </Link>
              </li>
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
                href="https://github.com/duldeldol/SIB-ReactJs"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center social-hover"
                style={{ width: '36px', height: '36px' }}
                title="GitHub"
              >
                <i className="fa-brands fa-github text-white"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center social-hover"
                style={{ width: '36px', height: '36px' }}
                title="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in text-white"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center social-hover"
                style={{ width: '36px', height: '36px' }}
                title="Instagram"
              >
                <i className="fa-brands fa-instagram text-white"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-top border-secondary border-opacity-25 pt-4 mt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
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
