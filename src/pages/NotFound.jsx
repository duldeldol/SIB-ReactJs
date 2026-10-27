import React from 'react';
import { Link } from 'react-router';

/**
 * NotFound - Kategori Elemen Halaman (Page Element)
 * Ditampilkan saat URL yang diakses pengguna tidak cocok dengan rute mana pun (*).
 */
function NotFound() {
  return (
    <div className="py-5 my-auto text-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-5 bg-white">
              <div className="mb-4">
                <span className="badge bg-danger-subtle text-danger fs-6 px-3 py-2 rounded-pill fw-bold">
                  Error 404
                </span>
              </div>
              <div className="display-1 fw-bold text-primary mb-3">
                <i className="fa-solid fa-compass-drafting text-primary"></i>
              </div>
              <h2 className="fw-bold text-dark mb-3">Halaman Tidak Ditemukan</h2>
              <p className="text-secondary mb-4">
                Maaf, halaman yang Anda cari tidak dapat ditemukan atau alamat URL yang Anda masukkan keliru.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <Link to="/" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm">
                  <i className="fa-solid fa-house me-2"></i> Kembali ke Beranda
                </Link>
                <Link to="/contact" className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold">
                  <i className="fa-solid fa-headset me-2"></i> Bantuan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
