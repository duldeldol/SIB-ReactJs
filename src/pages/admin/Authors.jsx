import React, { useState, useEffect } from 'react';
import { fetchAuthors, createAuthor } from '../../services/api';
import AuthorModal from '../../components/admin/AuthorModal';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(() => {
    return (
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('modal') === 'true'
    );
  });
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  // 1. Read Data menggunakan useEffect & Axios (Async/Await & try-catch)
  useEffect(() => {
    let isMounted = true;

    const loadInitialAuthors = async () => {
      try {
        setError(null);
        const data = await fetchAuthors();
        if (isMounted) {
          setAuthors(data);
        }
      } catch (err) {
        console.error('Gagal mengambil data author:', err);
        if (isMounted) {
          setError('Gagal memuat data penulis dari server. Pastikan API tersedia.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialAuthors();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handler Refresh Manual
  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAuthors();
      setAuthors(data);
    } catch (err) {
      console.error('Gagal mengambil data author:', err);
      setError('Gagal memuat data penulis dari server. Pastikan API tersedia.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Create Data menggunakan Axios POST
  const handleAddAuthor = async (newAuthorData) => {
    const created = await createAuthor(newAuthorData);
    setAuthors((prev) => [created, ...prev]);
    setNotification({
      type: 'success',
      message: `Author "${created.name}" berhasil ditambahkan ke database!`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Filter pencarian
  const filteredAuthors = authors.filter((a) => {
    const query = searchQuery.toLowerCase();
    return (
      a.name.toLowerCase().includes(query) ||
      (a.country && a.country.toLowerCase().includes(query)) ||
      (a.primaryGenre && a.primaryGenre.toLowerCase().includes(query)) ||
      (a.bio && a.bio.toLowerCase().includes(query))
    );
  });

  // Statistik author
  const localAuthorsCount = authors.filter(
    (a) => a.country && a.country.toLowerCase().includes('indonesia')
  ).length;
  const internationalAuthorsCount = authors.length - localAuthorsCount;

  return (
    <div className="admin-authors-page">
      {/* Toast Notification Melayang */}
      {notification && (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1090, marginTop: '80px' }}
        >
          <div
            className="toast show align-items-center bg-white border border-success border-opacity-50 shadow-lg rounded-4 p-2 animate-fadeIn"
            role="alert"
          >
            <div className="d-flex p-2 align-items-center">
              <div className="me-3 fs-3 text-success">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div className="toast-body p-0 flex-grow-1">
                <div className="fw-bold text-dark small">Berhasil Menambahkan Penulis!</div>
                <div className="text-secondary small">{notification.message}</div>
              </div>
              <button
                type="button"
                className="btn-close ms-2"
                aria-label="Close"
                onClick={() => setNotification(null)}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Header Halaman & Tombol Aksi */}
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Daftar Penulis & Author</h2>
          <p className="text-secondary small mb-0">
            Kelola profil kreator dan penulis buku di BookStore. Terhubung dengan operasi Asynchronous Axios.
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary rounded-pill px-3 btn-sm d-inline-flex align-items-center gap-2"
            onClick={handleRefresh}
            disabled={loading}
            title="Muat ulang data dari API"
          >
            <i className={`fa-solid fa-rotate-right ${loading ? 'fa-spin' : ''}`}></i>
            <span>Refresh</span>
          </button>
          <button
            type="button"
            className="btn btn-primary rounded-pill px-4 btn-sm d-inline-flex align-items-center gap-2 fw-semibold shadow-sm"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fa-solid fa-user-plus"></i>
            <span>Tambah Author Baru</span>
          </button>
        </div>
      </div>

      {/* Ringkasan Statistik Kartu */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary"
                style={{ width: '48px', height: '48px' }}
              >
                <i className="fa-solid fa-users-line fs-4"></i>
              </div>
              <div>
                <span className="text-muted small d-block">Total Author Terdaftar</span>
                <span className="fs-4 fw-bold text-dark">{authors.length} Penulis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-danger bg-opacity-10 text-danger"
                style={{ width: '48px', height: '48px' }}
              >
                <i className="fa-solid fa-flag fs-4"></i>
              </div>
              <div>
                <span className="text-muted small d-block">Penulis Nasional (Indonesia)</span>
                <span className="fs-4 fw-bold text-dark">{localAuthorsCount} Penulis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10 text-warning"
                style={{ width: '48px', height: '48px' }}
              >
                <i className="fa-solid fa-earth-americas fs-4"></i>
              </div>
              <div>
                <span className="text-muted small d-block">Penulis Internasional</span>
                <span className="fs-4 fw-bold text-dark">{internationalAuthorsCount} Penulis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kontainer Tabel Penulis */}
      <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-3 px-md-4 border-bottom d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 bg-white">
          <div className="input-group shadow-sm rounded-pill overflow-hidden border bg-light" style={{ maxWidth: '400px' }}>
            <span className="input-group-text bg-light border-0 ps-3">
              <i className="fa-solid fa-magnifying-glass text-secondary"></i>
            </span>
            <input
              type="text"
              className="form-control bg-light border-0 py-2 small"
              placeholder="Cari nama penulis, negara, atau biografi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="btn bg-light border-0 pe-3 text-secondary"
                onClick={() => setSearchQuery('')}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <div className="text-muted small">
            Menampilkan <strong className="text-dark">{filteredAuthors.length}</strong> dari {authors.length} penulis
          </div>
        </div>

        {/* State Error */}
        {error && (
          <div className="p-4 text-center">
            <div className="alert alert-danger d-inline-flex align-items-center gap-2 mb-0">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* State Loading */}
        {loading ? (
          <div className="p-5 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Memuat data...</span>
            </div>
            <p className="text-muted small mt-2 mb-0">Mengambil data author via Axios...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-secondary small text-uppercase">
                <tr>
                  <th scope="col" className="ps-4" style={{ width: '60px' }}>No</th>
                  <th scope="col">Profil Penulis</th>
                  <th scope="col">Asal Negara</th>
                  <th scope="col">Spesialisasi Genre</th>
                  <th scope="col">Mulai Aktif</th>
                  <th scope="col" style={{ minWidth: '280px' }}>Biografi Ringkas</th>
                  <th scope="col" className="text-end pe-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuthors.length > 0 ? (
                  filteredAuthors.map((author, index) => (
                    <tr key={author.id}>
                      <td className="ps-4 fw-semibold text-secondary small">{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={author.avatar}
                            alt={author.name}
                            className="rounded-circle object-fit-cover shadow-sm border border-2 border-white"
                            style={{ width: '44px', height: '44px' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          <div>
                            <div className="fw-bold text-dark">{author.name}</div>
                            {author.birthYear && (
                              <small className="text-secondary">Lahir thn {author.birthYear}</small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-secondary border px-2 py-1">
                          <i className="fa-solid fa-location-dot me-1 text-primary"></i>
                          {author.country || 'Indonesia'}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2 py-1">
                          {author.primaryGenre || 'Umum'}
                        </span>
                      </td>
                      <td className="text-secondary small">
                        <i className="fa-solid fa-clock-rotate-left me-1"></i>
                        Sejak {author.activeSince || '-'}
                      </td>
                      <td className="text-secondary small">
                        <p className="mb-0 text-truncate-2" style={{ maxWidth: '340px', lineHeight: '1.4' }}>
                          {author.bio || '-'}
                        </p>
                      </td>
                      <td className="text-end pe-4">
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1 small">
                          <i className="fa-solid fa-check me-1"></i> Terverifikasi
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="py-4">
                        <i className="fa-solid fa-feather-pointed text-muted fs-1 mb-3 d-block"></i>
                        <h6 className="fw-bold text-dark">Tidak Ada Penulis Ditemukan</h6>
                        <p className="text-secondary small mb-3">
                          {searchQuery
                            ? `Tidak ada penulis yang cocok dengan kata kunci "${searchQuery}".`
                            : 'Belum ada data author yang terdaftar.'}
                        </p>
                        {searchQuery ? (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm rounded-pill px-3"
                            onClick={() => setSearchQuery('')}
                          >
                            Reset Pencarian
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary btn-sm rounded-pill px-3"
                            onClick={() => setIsModalOpen(true)}
                          >
                            + Tambah Author Pertama
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog Form Tambah Author */}
      <AuthorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAuthor={handleAddAuthor}
      />
    </div>
  );
}

export default Authors;
