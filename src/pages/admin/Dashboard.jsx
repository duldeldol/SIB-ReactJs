import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { fetchGenres, fetchAuthors } from '../../services/api';
import booksData from '../../Utils/books';

function Dashboard() {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [genresRes, authorsRes] = await Promise.all([
          fetchGenres(),
          fetchAuthors(),
        ]);
        setGenres(genresRes);
        setAuthors(authorsRes);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="admin-dashboard-page">
      {/* Welcome Banner */}
      <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4 position-relative overflow-hidden">
        <div className="row align-items-center g-4 position-relative" style={{ zIndex: 1 }}>
          <div className="col-lg-8">
            <h2 className="display-6 fw-bold text-dark mb-2">
              Selamat Datang di <span className="text-primary">Admin Portal</span>
            </h2>
            <p className="text-secondary mb-0" style={{ maxWidth: '620px', lineHeight: '1.6' }}>
              Pusat pengelolaan master data BookStore.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <div className="d-flex flex-column flex-sm-row flex-lg-column gap-2 justify-content-lg-end">
              <Link
                to="/admin/genres"
                className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
              >
                <i className="fa-solid fa-tags"></i>
                <span>Kelola Genre</span>
              </Link>
              <Link
                to="/admin/authors"
                className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center justify-content-center gap-2"
              >
                <i className="fa-solid fa-feather-pointed"></i>
                <span>Kelola Author</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="row g-3 mb-4">
        {/* Total Genre */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className="text-secondary small fw-semibold text-uppercase">Total Genre</span>
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary"
                style={{ width: '42px', height: '42px' }}
              >
                <i className="fa-solid fa-tags fs-5"></i>
              </div>
            </div>
            <div className="fs-3 fw-bold text-dark mb-1">
              {loading ? <span className="spinner-border spinner-border-sm"></span> : genres.length}
            </div>
            <div className="text-muted small">
              <Link to="/admin/genres" className="text-primary text-decoration-none fw-semibold">
                Buka Data Genre <i className="fa-solid fa-arrow-right ms-1 small"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Total Author */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className="text-secondary small fw-semibold text-uppercase">Total Author</span>
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-info bg-opacity-10 text-info"
                style={{ width: '42px', height: '42px' }}
              >
                <i className="fa-solid fa-feather-pointed fs-5"></i>
              </div>
            </div>
            <div className="fs-3 fw-bold text-dark mb-1">
              {loading ? <span className="spinner-border spinner-border-sm"></span> : authors.length}
            </div>
            <div className="text-muted small">
              <Link to="/admin/authors" className="text-primary text-decoration-none fw-semibold">
                Buka Data Author <i className="fa-solid fa-arrow-right ms-1 small"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Total Buku di Toko */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className="text-secondary small fw-semibold text-uppercase">Katalog Buku</span>
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-success bg-opacity-10 text-success"
                style={{ width: '42px', height: '42px' }}
              >
                <i className="fa-solid fa-book-bookmark fs-5"></i>
              </div>
            </div>
            <div className="fs-3 fw-bold text-dark mb-1">{booksData.length}</div>
            <div className="text-muted small">
              <Link to="/books" className="text-primary text-decoration-none fw-semibold">
                Katalog Toko <i className="fa-solid fa-arrow-right ms-1 small"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Rangkuman Data Terkini */}
      <div className="row g-4">
        {/* Cuplikan Genre Terkini */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden h-100">
            <div className="p-3 px-4 border-bottom d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-tags text-primary"></i>
                <h6 className="mb-0 fw-bold text-dark">Genre Buku Terdaftar</h6>
              </div>
              <Link to="/admin/genres" className="small text-primary text-decoration-none fw-semibold">
                Lihat Semua
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 small">
                <thead className="table-light text-secondary text-uppercase">
                  <tr>
                    <th scope="col" className="ps-4">Nama Genre</th>
                    <th scope="col">Kode Slug</th>
                    <th scope="col" className="text-end pe-4">Koleksi</th>
                  </tr>
                </thead>
                <tbody>
                  {genres.slice(0, 4).map((g) => (
                    <tr key={g.id}>
                      <td className="ps-4">
                        <span className="fw-semibold text-dark">{g.name}</span>
                      </td>
                      <td>
                        <code className="text-primary bg-light px-2 py-1 rounded">/{g.slug}</code>
                      </td>
                      <td className="text-end pe-4 fw-semibold text-secondary">
                        {g.bookCount || 0} buku
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Cuplikan Author Terkini */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden h-100">
            <div className="p-3 px-4 border-bottom d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-feather-pointed text-primary"></i>
                <h6 className="mb-0 fw-bold text-dark">Penulis & Author Terdaftar</h6>
              </div>
              <Link to="/admin/authors" className="small text-primary text-decoration-none fw-semibold">
                Lihat Semua
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 small">
                <thead className="table-light text-secondary text-uppercase">
                  <tr>
                    <th scope="col" className="ps-4">Nama Penulis</th>
                    <th scope="col">Asal Negara</th>
                    <th scope="col" className="text-end pe-4">Genre Utama</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.slice(0, 4).map((a) => (
                    <tr key={a.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={a.avatar}
                            alt={a.name}
                            className="rounded-circle object-fit-cover"
                            style={{ width: '32px', height: '32px' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          <span className="fw-semibold text-dark">{a.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-secondary">{a.country}</span>
                      </td>
                      <td className="text-end pe-4">
                        <span className="badge bg-light text-dark border px-2 py-1">
                          {a.primaryGenre}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
