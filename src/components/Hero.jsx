import React from 'react';

function Hero({ onExploreClick }) {
  return (
    <section className="py-5 bg-white" id="hero-section">
      <div className="container col-xxl-10 px-4">
        <div className="row flex-lg-row-reverse align-items-center g-5">
        {/* Hero Image */}
        <div className="col-10 col-sm-8 col-lg-6 mx-auto text-center">
          <div className="position-relative d-inline-block shadow-lg rounded-4 overflow-hidden border border-2 border-white">
            <img
              src="/books/atomic-habits.jpg"
              className="d-block mx-lg-auto img-fluid rounded-4"
              alt="Buku Rekomendasi Atomic Habits"
              width="500"
              height="350"
              loading="lazy"
              style={{ objectFit: 'cover', maxHeight: '420px', width: '100%' }}
            />
          </div>
        </div>

        {/* Hero Text Content */}
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-dark lh-sm mb-3">
            Atomic Habits: <span className="text-primary">Perubahan Kecil</span> yang Menghasilkan Dampak Luar Biasa
          </h1>
          <p className="lead text-secondary mb-3">
            Oleh <strong>James Clear</strong> • Diterbitkan oleh Gramedia Pustaka Utama
          </p>
          <p className="text-muted mb-4 fs-6">
            Temukan cara ampuh membangun kebiasaan baik dan merontokkan kebiasaan buruk melalui metode ilmiah 
            1% lebih baik setiap hari. Buku pengembangan diri paling transformatif yang telah menginspirasi 
            lebih dari 15 juta orang di seluruh dunia.
          </p>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="text-warning fs-5">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
            </div>
            <span className="fw-semibold text-dark">4.9 / 5.0</span>
            <span className="text-secondary small">(14.800+ Ulasan Pembaca)</span>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2 fw-semibold shadow-sm"
              onClick={() => alert('Terima kasih! Buku Atomic Habits ditambahkan ke keranjang belanja.')}
            >
              <i className="fa-solid fa-cart-shopping me-2"></i> Beli Sekarang • Rp 108.000
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
              onClick={onExploreClick}
            >
              <i className="fa-solid fa-book-bookmark me-2"></i> Jelajahi Buku Lain
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Hero;
