import React, { useState } from 'react';

function GenreModal({ isOpen, onClose, onAddGenre, onUpdateGenre, onSubmit, initialData = null }) {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || '',
    description: initialData?.description || '',
  }));
  const [prevInitialData, setPrevInitialData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sinkronisasi state saat initialData berubah (pola resmi React: adjusting state during render)
  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);
    setFormData({
      name: initialData?.name || '',
      description: initialData?.description || '',
    });
    setErrorMessage('');
  }

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Nama genre wajib diisi!');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim() || 'Koleksi buku dengan tema ini.',
      };

      if (isEdit) {
        if (onUpdateGenre) {
          await onUpdateGenre(initialData.id, payload);
        } else if (onSubmit) {
          await onSubmit(payload, initialData.id);
        }
      } else {
        if (onAddGenre) {
          await onAddGenre(payload);
        } else if (onSubmit) {
          await onSubmit(payload);
        }
      }

      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat memproses data genre.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="modal-header bg-primary text-white p-3 p-md-4 border-0">
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-3 text-white"
                style={{ width: '36px', height: '36px' }}
              >
                <i className={isEdit ? 'fa-solid fa-pen-to-square' : 'fa-solid fa-tags'}></i>
              </div>
              <div>
                <h5 className="modal-title fw-bold mb-0">
                  {isEdit ? 'Edit Data Genre Buku' : 'Tambah Genre Buku Baru'}
                </h5>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Tutup"
              onClick={onClose}
              disabled={isSubmitting}
            ></button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {errorMessage && (
                <div className="alert alert-danger d-flex align-items-center gap-2 small rounded-3 mb-3">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Nama Genre */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-dark">
                  Nama Genre / Kategori <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-secondary border-end-0">
                    <i className="fa-solid fa-bookmark"></i>
                  </span>
                  <input
                    type="text"
                    name="name"
                    className="form-control border-start-0"
                    placeholder="Contoh: Sains Populer, Sejarah Dunia, Psikologi"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoFocus
                  />
                </div>
                <div className="form-text small">Masukkan nama genre yang mewakili kelompok buku.</div>
              </div>

              {/* Deskripsi Genre */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-dark">
                  Deskripsi Singkat Genre
                </label>
                <textarea
                  name="description"
                  rows="3"
                  className="form-control"
                  placeholder="Penjelasan ringkas mengenai buku-buku di dalam genre ini..."
                  value={formData.description}
                  onChange={handleChange}
                  disabled={isSubmitting}
                ></textarea>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer bg-light border-top p-3 px-4 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Menyimpan ke API...</span>
                  </>
                ) : (
                  <>
                    <i className={isEdit ? 'fa-solid fa-floppy-disk' : 'fa-solid fa-plus-circle'}></i>
                    <span>{isEdit ? 'Simpan Perubahan' : 'Simpan Genre'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GenreModal;
