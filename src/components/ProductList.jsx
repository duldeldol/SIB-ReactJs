import React, { useState } from 'react';
import { Link } from 'react-router';
import booksData from '../Utils/books';

function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Ambil kategori unik secara dinamis dari data buku
  const categories = ['Semua', ...Array.from(new Set(booksData.map((b) => b.category).filter(Boolean)))];

  const filteredBooks = selectedCategory === 'Semua' 
    ? booksData 
    : booksData.filter(b => b.category === selectedCategory);

  return (
    <div className="album py-5 bg-light" id="product-list">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-dark">Katalog Buku Pilihan</h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Temukan buku-buku pilihan kurator terbaik dengan ulasan tertinggi untuk memperkaya wawasan dan inspirasi hidupmu.
          </p>

          {/* Category Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill px-3`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Books Cards Grid */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {filteredBooks.map((book) => (
            <div className="col" key={book.id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden book-card">
                <div className="position-relative">
                  <img
                    src={book.image || book.cover}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: '240px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  {book.category && (
                    <span className="position-absolute bottom-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white">
                      <i className="fa-solid fa-tag me-1"></i> {book.category}
                    </span>
                  )}
                </div>
                
                <div className="card-body d-flex flex-direction-column flex-column justify-content-between p-4">
                  <div>
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
                    <h5 className="card-title fw-bold text-dark mb-2">{book.title}</h5>
                    <p className="card-text text-secondary small mb-3">
                      {book.description}
                    </p>
                  </div>

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
                          onClick={() => alert(`Detail Buku:\nJudul: ${book.title}\nPenulis: ${book.author}\nTahun: ${book.year || '-'}\nDeskripsi: ${book.description}`)}
                        >
                          <i className="fa-solid fa-circle-info me-1"></i> Detail
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => alert(`Buku "${book.title}" berhasil ditambahkan ke keranjang!`)}
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

        {/* CTA ke Halaman Books */}
        <div className="text-center mt-5 pt-3">
          <p className="text-muted mb-3">
            Ingin mencari koleksi lebih lengkap atau menambahkan buku baru ke katalog?
          </p>
          <Link to="/books" className="btn btn-outline-primary btn-lg rounded-pill px-4 fw-semibold shadow-sm">
            <i className="fa-solid fa-book-open me-2"></i> Kunjungi Halaman Direktori Books
            <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
