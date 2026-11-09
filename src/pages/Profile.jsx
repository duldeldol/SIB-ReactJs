import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth';

function Profile() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '02 Oktober 2026';

  const userInitial = user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';

  return (
    <div className="py-5" style={{ minHeight: '85vh', backgroundColor: '#f8fafc' }}>
      <div className="container py-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
              {/* Header Cover Banner Toko Buku */}
              <div
                className="position-relative d-flex align-items-end justify-content-end p-3 p-md-4"
                style={{
                  height: '140px',
                  background: isAdmin
                    ? 'linear-gradient(135deg, #0f172a 0%, #0f766e 60%, #1e293b 100%)'
                    : 'linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #06b6d4 100%)',
                }}
              >
              </div>

              {/* Konten Kartu Profil */}
              <div className="card-body px-4 px-md-5 pb-5 pt-0 position-relative">
                {/* Avatar dan Badge Status */}
                <div className="d-flex justify-content-between align-items-end mb-3" style={{ marginTop: '-45px' }}>
                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center shadow-sm bg-white p-1 border"
                    style={{ width: '84px', height: '84px' }}
                  >
                    <div
                      className="w-100 h-100 rounded-3 d-flex align-items-center justify-content-center text-white fw-bold fs-2"
                      style={{
                        background: isAdmin
                          ? 'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)'
                          : 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                      }}
                    >
                      {userInitial}
                    </div>
                  </div>
                </div>

                {/* Nama dan Kredensial Pengguna */}
                <div className="mb-4">
                  <h3 className="fw-bold text-dark mb-1">{user?.fullName || 'Pengguna BookStore'}</h3>
                  <p className="text-muted small mb-0">
                    <span>@{user?.username || 'username'}</span> &bull; <span>{user?.email || 'email'}</span>
                  </p>
                </div>

                {/* Kartu Ringkasan E-Commerce Asli */}
                <div className="row g-2 g-md-3 mb-4">
                  {isAdmin ? (
                    <>
                      <div className="col-4">
                        <div className="p-3 bg-light rounded-3 border text-center">
                          <i className="fa-solid fa-book text-primary fs-5 mb-1 d-block"></i>
                          <div className="fw-bold text-dark small">Katalog Toko</div>
                          <div className="text-muted" style={{ fontSize: '0.7rem' }}>Koleksi Lengkap</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-3 bg-light rounded-3 border text-center">
                          <i className="fa-solid fa-tags text-teal fs-5 mb-1 d-block" style={{ color: '#0f766e' }}></i>
                          <div className="fw-bold text-dark small">Kelola Genre</div>
                          <div className="fw-semibold text-teal" style={{ color: '#0f766e', fontSize: '0.7rem' }}>Kategori Aktif</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-3 bg-light rounded-3 border text-center">
                          <i className="fa-solid fa-feather-pointed text-warning fs-5 mb-1 d-block"></i>
                          <div className="fw-bold text-dark small">Kelola Penulis</div>
                          <div className="fw-semibold text-teal" style={{ color: '#0f766e', fontSize: '0.7rem' }}>Penulis Terdaftar</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-4">
                        <div className="p-3 bg-light rounded-3 border text-center">
                          <i className="fa-solid fa-truck-fast text-primary fs-5 mb-1 d-block"></i>
                          <div className="fw-bold text-dark small">Bebas Ongkir</div>
                          <div className="text-muted" style={{ fontSize: '0.7rem' }}>Min. Rp100rb</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-3 bg-light rounded-3 border text-center">
                          <i className="fa-solid fa-star text-warning fs-5 mb-1 d-block"></i>
                          <div className="fw-bold text-dark small">Poin Belanja</div>
                          <div className="fw-semibold text-success" style={{ fontSize: '0.7rem' }}>250 Poin</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-3 bg-light rounded-3 border text-center">
                          <i className="fa-solid fa-ticket text-danger fs-5 mb-1 d-block"></i>
                          <div className="fw-bold text-dark small">Kupon Diskon</div>
                          <div className="fw-semibold text-teal" style={{ color: '#0f766e', fontSize: '0.7rem' }}>2 Voucher Aktif</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Detail Data Akun */}
                <div className="bg-light rounded-3 p-3 border mb-4">
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span className="small text-muted">Status Keanggotaan</span>
                    <span className="small fw-semibold text-dark">
                      {isAdmin ? 'Pengelola & Administrator Toko' : 'Pelanggan Aktif'}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span className="small text-muted">Tanggal Bergabung</span>
                    <span className="small fw-semibold text-dark">{formattedDate}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span className="small text-muted">Tipe Akun</span>
                    <span className="small fw-semibold text-success">
                      {isAdmin
                        ? 'Akses Penuh Manajemen Toko'
                        : 'Akses Penuh Katalog & Pembelian'}
                    </span>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pt-2 border-top">
                  <div className="d-flex gap-2">
                    {isAdmin ? (
                      <Link
                        to="/admin"
                        className="btn btn-primary rounded-pill px-4 py-2 fw-semibold text-white shadow-sm"
                        style={{ backgroundColor: '#0f766e', borderColor: '#0f766e' }}
                      >
                        <i className="fa-solid fa-gauge me-2"></i> Buka Portal Admin Toko
                      </Link>
                    ) : (
                      <Link
                        to="/books"
                        className="btn btn-primary rounded-pill px-4 py-2 fw-semibold text-white shadow-sm"
                        style={{ backgroundColor: '#0f766e', borderColor: '#0f766e' }}
                      >
                        <i className="fa-solid fa-bag-shopping me-2"></i> Mulai Belanja Buku
                      </Link>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-outline-danger rounded-pill px-4 py-2 fw-semibold"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> Keluar Akun
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
