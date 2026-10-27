import React, { useState } from 'react';

const booksData = [
  {
    id: 1,
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    category: 'Self Improvement & Filsafat',
    price: 98000,
    rating: 4.9,
    reviews: 8200,
    cover: '/books/filosofi-teras.jpg',
    description: 'Panduan stoisisme kuno untuk mental tangguh di era modern. Mengatasi emosi negatif dan hidup lebih damai.'
  },
  {
    id: 2,
    title: 'Laut Bercerita',
    author: 'Leila S. Chudori',
    category: 'Fiksi & Sejarah',
    price: 115000,
    rating: 4.9,
    reviews: 11300,
    cover: '/books/laut-bercerita.jpg',
    description: 'Kisah haru perjuangan para aktivis mahasiswa 1998 dan duka keluarga korban penculikan yang tak kunjung padam.'
  },
  {
    id: 3,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Finansial & Bisnis',
    price: 95000,
    rating: 4.8,
    reviews: 9400,
    cover: '/books/psychology-of-money.jpg',
    description: '19 cerita pendek tentang cara manusia memandang uang, kekayaan, keserakahan, dan kebahagiaan finansial.'
  },
  {
    id: 4,
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    category: 'Sastra Klasik Indonesia',
    price: 120000,
    rating: 5.0,
    reviews: 15600,
    cover: '/books/bumi-manusia.jpg',
    description: 'Masterpiece Tetralogi Buru mengisahkan cinta Minke dan Annelies di tengah pergolakan kolonial Hindia Belanda.'
  },
  {
    id: 5,
    title: 'Sebuah Seni untuk Bersikap Bodo Amat',
    author: 'Mark Manson',
    category: 'Pengembangan Diri',
    price: 88000,
    rating: 4.7,
    reviews: 7900,
    cover: '/books/bodo-amat.jpg',
    description: 'Pendekatan waras dan realistis untuk meraih kehidupan yang bermakna tanpa harus selalu berpura-pura bahagia.'
  },
  {
    id: 6,
    title: 'Gadis Kretek',
    author: 'Ratih Kumala',
    category: 'Drama & Budaya',
    price: 85000,
    rating: 4.8,
    reviews: 6500,
    cover: '/books/gadis-kretek.jpg',
    description: 'Kisah cinta, rahasia keluarga, dan aroma tembakau kretek legendaris di tanah Jawa yang diadaptasi ke serial Netflix.'
  }
];

function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Self Improvement & Filsafat', 'Fiksi & Sejarah', 'Finansial & Bisnis', 'Sastra Klasik Indonesia', 'Pengembangan Diri', 'Drama & Budaya'];

  const filteredBooks = selectedCategory === 'Semua' 
    ? booksData 
    : booksData.filter(b => b.category === selectedCategory);

  return (
    <div className="album py-5 bg-light" id="product-list">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-dark">Katalog Buku Best Seller</h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Temukan buku-buku pilihan kurator terbaik dengan ulasan tertinggi untuk memperkaya wawasan dan inspirasi hidupmu.
          </p>

          {/* Category Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            {categories.slice(0, 4).map((cat) => (
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
                    src={book.cover}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: '240px', objectFit: 'cover' }}
                  />
                  <span className="position-absolute bottom-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white">
                    <i className="fa-solid fa-tag me-1"></i> {book.category}
                  </span>
                </div>
                
                <div className="card-body d-flex flex-direction-column flex-column justify-content-between p-4">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="text-muted small">
                        <i className="fa-solid fa-pen-nib me-1"></i> {book.author}
                      </span>
                      <span className="text-warning small fw-bold">
                        <i className="fa-solid fa-star me-1"></i> {book.rating}
                      </span>
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
                          Rp {book.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => alert(`Detail Buku:\nJudul: ${book.title}\nPenulis: ${book.author}\nDeskripsi: ${book.description}`)}
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
      </div>
    </div>
  );
}

export default ProductList;
