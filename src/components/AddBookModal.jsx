import React, { useState } from 'react';

const CURRENT_YEAR = 2026;

const initialFormState = {
  title: '',
  author: '',
  year: CURRENT_YEAR,
  category: 'Teknologi & Pemrograman',
  price: 85000,
  image: '',
  description: ''
};

/**
 * AddBookModal - Modal Form Tambah Data Buku Baru
 * Menggunakan React Hooks (useState) untuk mengelola input form secara terkontrol (controlled components).
 */
function AddBookModal({ isOpen, onClose, onAddBook, existingCategories = [] }) {
  const [formData, setFormData] = useState(initialFormState);
  const [validated, setValidated] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' || name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim() || !formData.description.trim()) {
      setValidated(true);
      return;
    }

    // Default image jika tidak diisi oleh pengguna
    const defaultImage = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';

    const newBook = {
      id: Date.now(), // Generate ID unik
      title: formData.title.trim(),
      author: formData.author.trim(),
      year: Number(formData.year) || CURRENT_YEAR,
      category: formData.category || 'Umum',
      price: Number(formData.price) || 85000,
      image: formData.image.trim() || defaultImage,
      description: formData.description.trim(),
      rating: 5.0,
      reviews: 1
    };

    onAddBook(newBook);
    setFormData(initialFormState);
    setValidated(false);
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1055 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content shadow-lg border-0 rounded-4 overflow-hidden">
          {/* Modal Header */}
          <div className="modal-header bg-primary text-white px-4 py-3">
            <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
              <i className="fa-solid fa-book-medical"></i>
              Tambah Data Buku Baru
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          {/* Modal Body / Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body p-4">
              <div className="row g-3">
                {/* Judul Buku */}
                <div className="col-12 col-md-8">
                  <label htmlFor="title" className="form-label fw-semibold text-dark">
                    Judul Buku <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${validated && !formData.title ? 'is-invalid' : ''}`}
                    id="title"
                    name="title"
                    placeholder="Contoh: Belajar TypeScript Modern"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Judul buku wajib diisi.</div>
                </div>

                {/* Tahun Terbit */}
                <div className="col-12 col-md-4">
                  <label htmlFor="year" className="form-label fw-semibold text-dark">
                    Tahun Terbit <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    name="year"
                    min="1900"
                    max="2099"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Penulis Buku */}
                <div className="col-12 col-md-6">
                  <label htmlFor="author" className="form-label fw-semibold text-dark">
                    Nama Penulis <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${validated && !formData.author ? 'is-invalid' : ''}`}
                    id="author"
                    name="author"
                    placeholder="Contoh: Budi Raharjo"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Nama penulis wajib diisi.</div>
                </div>

                {/* Kategori Buku */}
                <div className="col-12 col-md-6">
                  <label htmlFor="category" className="form-label fw-semibold text-dark">
                    Kategori Buku
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {existingCategories.length > 0 ? (
                      existingCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Teknologi & Pemrograman">Teknologi & Pemrograman</option>
                        <option value="Self Improvement & Filsafat">Self Improvement & Filsafat</option>
                        <option value="Fiksi & Sejarah">Fiksi & Sejarah</option>
                        <option value="Finansial & Bisnis">Finansial & Bisnis</option>
                        <option value="Pengembangan Diri">Pengembangan Diri</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Harga Buku */}
                <div className="col-12 col-md-4">
                  <label htmlFor="price" className="form-label fw-semibold text-dark">
                    Estimasi Harga (Rp)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    step="1000"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                {/* URL Gambar Sampul */}
                <div className="col-12 col-md-8">
                  <label htmlFor="image" className="form-label fw-semibold text-dark">
                    URL Gambar Cover (Opsional)
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="image"
                    name="image"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={handleChange}
                  />
                  <div className="form-text">
                    Biarkan kosong untuk menggunakan cover placeholder otomatis.
                  </div>
                </div>

                {/* Deskripsi Buku */}
                <div className="col-12">
                  <label htmlFor="description" className="form-label fw-semibold text-dark">
                    Deskripsi Ringkas <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${validated && !formData.description ? 'is-invalid' : ''}`}
                    id="description"
                    name="description"
                    rows="3"
                    placeholder="Tuliskan rangkuman isi buku, topik bahasan, atau keunggulan buku..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <div className="invalid-feedback">Deskripsi buku wajib diisi.</div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer bg-light px-4 py-3">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={onClose}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm"
              >
                <i className="fa-solid fa-plus me-1"></i> Simpan Buku
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBookModal;
