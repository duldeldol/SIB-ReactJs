import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth';

function Unauthorized() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSwitchAccount = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="py-5 my-auto text-center" style={{ minHeight: '80vh', backgroundColor: '#f8fafc' }}>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white position-relative overflow-hidden">
              {/* Garis Aksen Hijau Teal BookStore */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '5px',
                  background: 'linear-gradient(90deg, #0f766e 0%, #14b8a6 50%, #2dd4bf 100%)',
                }}
              />

              {/* Ikon Gembok Keamanan */}
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-4 mx-auto mb-3 shadow-sm"
                style={{
                  width: '68px',
                  height: '68px',
                  backgroundColor: '#ccfbf1',
                  border: '1px solid #99f6e4',
                  color: '#0f766e',
                }}
              >
                <i className="fa-solid fa-lock fs-2"></i>
              </div>

              <h3 className="fw-bold text-dark mb-2">Halaman Dibatasi</h3>
              <p className="text-secondary small mb-4" style={{ lineHeight: 1.6 }}>
                Halaman yang Anda tuju merupakan <strong>Portal Internal Pengelolaan Toko</strong> yang hanya dapat dibuka oleh akun pengelola resmi BookStore.
              </p>

              {/* Info Pengguna Aktif */}
              <div className="bg-light p-3 rounded-3 mb-4 text-start border">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <i className="fa-solid fa-circle-user" style={{ color: '#0f766e' }}></i>
                  <strong className="small text-dark">Akun Aktif Saat Ini:</strong>
                </div>
                <p className="small text-muted mb-0">
                  Masuk sebagai: <strong>{user?.fullName || 'Pelanggan'}</strong> (
                  <span className="text-success fw-semibold">Member Resmi</span>)
                </p>
              </div>

              {/* Tombol Aksi */}
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                <Link
                  to="/"
                  className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm text-white"
                  style={{ backgroundColor: '#0f766e', borderColor: '#0f766e' }}
                >
                  <i className="fa-solid fa-store me-2"></i> Kembali ke Toko
                </Link>
                <Link to="/profile" className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold">
                  <i className="fa-solid fa-user me-2"></i> Profil Saya
                </Link>
                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  className="btn btn-outline-dark px-4 py-2 rounded-pill fw-semibold"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> Masuk Akun Lain
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
