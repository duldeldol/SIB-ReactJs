import React, { useState } from 'react';
import initialBooks from '../Utils/books';
import AddBookModal from '../components/AddBookModal';

/**
 * Book Page - Halaman Katalog Buku Lengkap
 * Menerapkan:
 * 1. Data bersumber dari src/Utils/books.js (minimal 9 data).
 * 2. Metode .map() untuk me-render daftar buku.
 * 3. React Hooks (useState) untuk mengelola data buku secara dinamis,
 *    termasuk fitur interaktif penambahan buku baru via modal.
 */
function Book() {
  // Hook State untuk menyimpan daftar buku secara reaktif
  const [booksList, setBooksList] = useState(initialBooks);

  // Hook State untuk pencarian & filter kategori
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Hook State untuk kontrol Modal Tambah Buku
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook State untuk notifikasi feedback penambahan data
  const [notification, setNotification] = useState(null);

  // Daftar kategori unik diambil secara dinamis dari daftar buku saat ini
  const categories = [
    'Semua',
    ...Array.from(new Set(booksList.map((b) => b.category).filter(Boolean)))
  ];

  // Handler penambahan buku baru (Fitur Nilai Tambah Hooks)
  const handleAddBook = (newBook) => {
    setBooksList((prevBooks) => [newBook, ...prevBooks]);
    setNotification({
      type: 'success',
      message: `Buku "${newBook.title}" berhasil ditambahkan ke daftar katalog!`
    });

    // Otomatis hilangkan notifikasi setelah 5 detik
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Handler hapus buku (opsional interaktivitas hooks)
  const handleDeleteBook = (id, title) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus buku "${title}"?`)) {
      setBooksList((prev) => prev.filter((b) => b.id !== id));
      setNotification({
        type: 'info',
        message: `Buku "${title}" telah dihapus dari daftar.`
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  };

  // Filter buku berdasarkan kategori dan kata kunci pencarian
  const filteredBooks = booksList.filter((book) => {
    const matchCategory =
      selectedCategory === 'Semua' || book.category === selectedCategory;
    const matchSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="book-page bg-light py-5 min-vh-100">
      <div className="container">
        {/* Page Header & Call To Action */}
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4 border">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-2">
                <i className="fa-solid fa-book-bookmark me-1"></i> Direktori Buku Lengkap
              </span>
              <h1 className="display-6 fw-bold text-dark mb-2">Koleksi Buku & Bacaan</h1>
              <p className="text-secondary mb-0" style={{ maxWidth: '600px' }}>
                Jelajahi beragam koleksi buku pilihan mulai dari pengembangan diri, pemrograman,
                fiksi, hingga sains. Dilengkapi manajemen data interaktif menggunakan React Hooks.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button
                type="button"
                className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="fa-solid fa-plus-circle fs-5"></i>
                <span className="fw-semibold">Tambah Buku Baru</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="row g-3 mt-3 pt-3 border-top">
            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3">
                  <i className="fa-solid fa-layer-group fs-4"></i>
                </div>
                <div>
                  <div className="fs-5 fw-bold text-dark">{booksList.length}</div>
                  <div className="text-muted small">Total Koleksi</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-success bg-opacity-10 text-success rounded-3">
                  <i className="fa-solid fa-tags fs-4"></i>
                </div>
                <div>
                  <div className="fs-5 fw-bold text-dark">{categories.length - 1}</div>
                  <div className="text-muted small">Kategori Tersedia</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-warning bg-opacity-10 text-warning rounded-3">
                  <i className="fa-solid fa-star fs-4"></i>
                </div>
                <div>
                  <div className="fs-5 fw-bold text-dark">4.9 / 5.0</div>
                  <div className="text-muted small">Rata-rata Rating</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-info bg-opacity-10 text-info rounded-3">
                  <i className="fa-solid fa-bolt fs-4"></i>
                </div>
                <div>
                  <div className="fs-5 fw-bold text-dark">React Hooks</div>
                  <div className="text-muted small">State Manajemen</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifikasi Alert Interaktif */}
        {notification && (
          <div
            className={`alert alert-${notification.type} alert-dismissible fade show rounded-4 shadow-sm mb-4 d-flex align-items-center gap-2`}
            role="alert"
          >
            <i className={`fa-solid ${notification.type === 'success' ? 'fa-circle-check' : 'fa-circle-info'} fs-5`}></i>
            <span className="fw-medium">{notification.message}</span>
            <button
              type="button"
              className="btn-close ms-auto"
              aria-label="Close"
              onClick={() => setNotification(null)}
            ></button>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-white p-3 rounded-4 shadow-sm mb-4 border">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-12 col-md-5 col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa-solid fa-magnifying-glass text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0"
                  placeholder="Cari judul, penulis, deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="btn btn-light border"
                    type="button"
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="col-12 col-md-7 col-lg-8">
              <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`btn btn-sm ${
                      selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'
                    } rounded-pill px-3`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ringkasan Hasil */}
        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
          <div>
            Menampilkan <strong className="text-dark">{filteredBooks.length}</strong> buku
            {selectedCategory !== 'Semua' && ` pada kategori "${selectedCategory}"`}
            {searchQuery && ` dengan pencarian "${searchQuery}"`}
          </div>
          <div>
            Data di-render dinamis menggunakan <code className="text-primary fw-semibold">.map()</code>
          </div>
        </div>

        {/* Books Grid - Menggunakan Metode Array .map() */}
        {filteredBooks.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {filteredBooks.map((book) => (
              <div className="col" key={book.id}>
                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden book-card transition-all">
                  {/* Gambar Sampul */}
                  <div className="position-relative">
                    <img
                      src={book.image || book.cover}
                      className="card-img-top"
                      alt={book.title}
                      style={{ height: '240px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    {book.category && (
                      <span className="position-absolute bottom-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white">
                        <i className="fa-solid fa-tag me-1"></i> {book.category}
                      </span>
                    )}
                    {/* Tombol Hapus Cepat untuk Buku Tambahan */}
                    {book.id > 1000 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle"
                        title="Hapus buku ini"
                        style={{ width: '32px', height: '32px', padding: 0 }}
                        onClick={() => handleDeleteBook(book.id, book.title)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    )}
                  </div>

                  {/* Konten Kartu */}
                  <div className="card-body d-flex flex-column justify-content-between p-4">
                    <div>
                      {/* Meta Penulis & Tahun */}
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted small text-truncate pe-2">
                          <i className="fa-solid fa-pen-nib me-1"></i> {book.author}
                        </span>
                        <div className="d-flex align-items-center gap-2 flex-shrink-0">
                          {book.year && (
                            <span className="badge bg-light text-secondary border small">
                              <i className="fa-regular fa-calendar me-1"></i> {book.year}
                            </span>
                          )}
                          {book.rating && (
                            <span className="text-warning small fw-bold">
                              <i className="fa-solid fa-star me-1"></i> {book.rating}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Judul & Deskripsi */}
                      <h5 className="card-title fw-bold text-dark mb-2">{book.title}</h5>
                      <p className="card-text text-secondary small mb-3">
                        {book.description}
                      </p>
                    </div>

                    {/* Harga & Tombol Aksi */}
                    <div className="pt-3 border-top mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-muted small d-block">Harga:</span>
                          <span className="fs-5 fw-bold text-primary">
                            {book.price ? `Rp ${book.price.toLocaleString('id-ID')}` : 'Tersedia'}
                          </span>
                        </div>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              alert(
                                `Detail Buku:\nJudul: ${book.title}\nPenulis: ${book.author}\nTahun: ${book.year || '-'}\nKategori: ${book.category || '-'}\nDeskripsi: ${book.description}`
                              )
                            }
                          >
                            <i className="fa-solid fa-circle-info me-1"></i> Detail
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              alert(`Buku "${book.title}" berhasil ditambahkan ke keranjang!`)
                            }
                          >
                            <i className="fa-solid fa-cart-plus me-1"></i> Beli
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-5 bg-white rounded-4 border p-4">
            <i className="fa-solid fa-book-open text-muted fs-1 mb-3 d-block"></i>
            <h4 className="fw-bold text-dark">Tidak ada buku yang cocok</h4>
            <p className="text-secondary mb-4">
              Coba sesuaikan kata kunci pencarian atau ubah filter kategori yang dipilih.
            </p>
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill px-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Modal Dialog Tambah Buku Baru */}
      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBook={handleAddBook}
        existingCategories={categories.filter((c) => c !== 'Semua')}
      />
    </div>
  );
}

export default Book;
