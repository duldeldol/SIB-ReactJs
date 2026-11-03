import React, { useState, useEffect } from 'react';
import { fetchGenres, createGenre } from '../../services/api';
import GenreModal from '../../components/admin/GenreModal';

function Genres() {
  const [genres, setGenres] = useState([]);
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

    const loadInitialGenres = async () => {
      try {
        setError(null);
        const data = await fetchGenres();
        if (isMounted) {
          setGenres(data);
        }
      } catch (err) {
        console.error('Gagal mengambil data genre:', err);
        if (isMounted) {
          setError('Gagal memuat data genre dari server. Pastikan API tersedia.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialGenres();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handler Refresh Manual
  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGenres();
      setGenres(data);
    } catch (err) {
      console.error('Gagal mengambil data genre:', err);
      setError('Gagal memuat data genre dari server. Pastikan API tersedia.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Create Data menggunakan Axios POST
  const handleAddGenre = async (newGenreData) => {
    const created = await createGenre(newGenreData);
    setGenres((prev) => [created, ...prev]);
    setNotification({
      type: 'success',
      message: `Genre "${created.name}" berhasil ditambahkan ke database!`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Filter pencarian
  const filteredGenres = genres.filter((g) => {
    const query = searchQuery.toLowerCase();
    return (
      g.name.toLowerCase().includes(query) ||
      (g.description && g.description.toLowerCase().includes(query)) ||
      (g.slug && g.slug.toLowerCase().includes(query))
    );
  });

  // Perhitungan statistik genre
  const totalBooks = genres.reduce((acc, curr) => acc + (curr.bookCount || 0), 0);

  return (
    <div className="admin-genres-page">
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
                <div className="fw-bold text-dark small">Berhasil Menambahkan Genre!</div>
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
          <h2 className="fw-bold text-dark mb-1">Daftar Genre Buku</h2>
          <p className="text-secondary small mb-0">
            Kelola kategori dan klasifikasi buku pada katalog BookStore. Terhubung dengan operasi Asynchronous Axios.
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
            <i className="fa-solid fa-plus-circle"></i>
            <span>Tambah Genre Baru</span>
          </button>
        </div>
      </div>

      {/* Ringkasan Statistik Kartu */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary"
                style={{ width: '48px', height: '48px' }}
              >
                <i className="fa-solid fa-tags fs-4"></i>
              </div>
              <div>
                <span className="text-muted small d-block">Total Genre Terdaftar</span>
                <span className="fs-4 fw-bold text-dark">{genres.length} Kategori</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-success bg-opacity-10 text-success"
                style={{ width: '48px', height: '48px' }}
              >
                <i className="fa-solid fa-book-bookmark fs-4"></i>
              </div>
              <div>
                <span className="text-muted small d-block">Total Buku Terkait</span>
                <span className="fs-4 fw-bold text-dark">{totalBooks} Judul Buku</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kontainer Tabel & Pencarian */}
      <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-3 px-md-4 border-bottom d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 bg-white">
          <div className="input-group shadow-sm rounded-pill overflow-hidden border bg-light" style={{ maxWidth: '380px' }}>
            <span className="input-group-text bg-light border-0 ps-3">
              <i className="fa-solid fa-magnifying-glass text-secondary"></i>
            </span>
            <input
              type="text"
              className="form-control bg-light border-0 py-2 small"
              placeholder="Cari genre berdasarkan nama atau deskripsi..."
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
            Menampilkan <strong className="text-dark">{filteredGenres.length}</strong> dari {genres.length} genre
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
            <p className="text-muted small mt-2 mb-0">Mengambil data genre via Axios...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-secondary small text-uppercase">
                <tr>
                  <th scope="col" className="ps-4" style={{ width: '60px' }}>No</th>
                  <th scope="col">Nama Genre</th>
                  <th scope="col">Slug Kode</th>
                  <th scope="col" style={{ minWidth: '240px' }}>Deskripsi</th>
                  <th scope="col" className="text-center">Koleksi Buku</th>
                  <th scope="col">Tanggal Dibuat</th>
                  <th scope="col" className="text-end pe-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredGenres.length > 0 ? (
                  filteredGenres.map((genre, index) => (
                    <tr key={genre.id}>
                      <td className="ps-4 fw-semibold text-secondary small">{index + 1}</td>
                      <td>
                        <span className="fw-bold text-dark">{genre.name}</span>
                      </td>
                      <td>
                        <code className="text-primary bg-light px-2 py-1 rounded small">
                          /{genre.slug || 'genre'}
                        </code>
                      </td>
                      <td className="text-secondary small">
                        {genre.description || '-'}
                      </td>
                      <td className="text-center">
                        <span className="badge bg-light text-dark border px-2 py-1 fw-semibold">
                          <i className="fa-solid fa-book me-1 text-primary"></i>
                          {genre.bookCount || 0} Buku
                        </span>
                      </td>
                      <td className="text-secondary small">
                        <i className="fa-regular fa-calendar me-1"></i>
                        {genre.createdAt || '-'}
                      </td>
                      <td className="text-end pe-4">
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1 small">
                          <i className="fa-solid fa-circle-check me-1"></i> Aktif
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="py-4">
                        <i className="fa-solid fa-tags text-muted fs-1 mb-3 d-block"></i>
                        <h6 className="fw-bold text-dark">Tidak Ada Genre Ditemukan</h6>
                        <p className="text-secondary small mb-3">
                          {searchQuery
                            ? `Tidak ada genre yang cocok dengan kata kunci "${searchQuery}".`
                            : 'Belum ada data genre buku yang terdaftar.'}
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
                            + Tambah Genre Pertama
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

      {/* Modal Dialog Form Tambah Genre */}
      <GenreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddGenre={handleAddGenre}
      />
    </div>
  );
}

export default Genres;
