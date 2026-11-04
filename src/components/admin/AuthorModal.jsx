import React, { useState } from 'react';

const CURRENT_YEAR = new Date().getFullYear();

function AuthorModal({
  isOpen,
  onClose,
  onAddAuthor,
  onUpdateAuthor,
  onSubmit,
  initialData = null,
}) {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || '',
    country: initialData?.country || 'Indonesia',
    birthYear: initialData?.birthYear || '',
    activeSince: initialData?.activeSince || '',
    primaryGenre: initialData?.primaryGenre || 'Teknologi & Pemrograman',
    avatar: initialData?.avatar || '',
    bio: initialData?.bio || '',
  }));
  const [prevInitialData, setPrevInitialData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sinkronisasi state saat initialData berubah (pola resmi React: adjusting state during render)
  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);
    setFormData({
      name: initialData?.name || '',
      country: initialData?.country || 'Indonesia',
      birthYear: initialData?.birthYear || '',
      activeSince: initialData?.activeSince || '',
      primaryGenre: initialData?.primaryGenre || 'Teknologi & Pemrograman',
      avatar: initialData?.avatar || '',
      bio: initialData?.bio || '',
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
      setErrorMessage('Nama penulis wajib diisi!');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        name: formData.name.trim(),
        country: formData.country.trim() || 'Indonesia',
        birthYear: formData.birthYear ? parseInt(formData.birthYear, 10) : CURRENT_YEAR - 30,
        activeSince: formData.activeSince ? parseInt(formData.activeSince, 10) : CURRENT_YEAR,
        primaryGenre: formData.primaryGenre,
        avatar: formData.avatar.trim() || null,
        bio: formData.bio.trim() || 'Penulis buku di BookStore.',
      };

      if (isEdit) {
        if (onUpdateAuthor) {
          await onUpdateAuthor(initialData.id, payload);
        } else if (onSubmit) {
          await onSubmit(payload, initialData.id);
        }
      } else {
        if (onAddAuthor) {
          await onAddAuthor(payload);
        } else if (onSubmit) {
          await onSubmit(payload);
        }
      }

      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat memproses data author.');
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
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="modal-header bg-primary text-white p-3 p-md-4 border-0">
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-3 text-white"
                style={{ width: '36px', height: '36px' }}
              >
                <i className={isEdit ? 'fa-solid fa-user-pen' : 'fa-solid fa-feather-pointed'}></i>
              </div>
              <div>
                <h5 className="modal-title fw-bold mb-0">
                  {isEdit ? 'Edit Profil Penulis & Author' : 'Tambah Author & Penulis Baru'}
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

              <div className="row g-3">
                {/* Nama Lengkap */}
                <div className="col-12 col-md-7">
                  <label className="form-label fw-semibold small text-dark">
                    Nama Lengkap Penulis <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-secondary border-end-0">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      name="name"
                      className="form-control border-start-0"
                      placeholder="Contoh: Raditya Dika, Tere Liye, Yuval Noah Harari"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Kewarganegaraan / Asal */}
                <div className="col-12 col-md-5">
                  <label className="form-label fw-semibold small text-dark">
                    Asal Negara / Domisili
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-secondary border-end-0">
                      <i className="fa-solid fa-globe"></i>
                    </span>
                    <input
                      type="text"
                      name="country"
                      className="form-control border-start-0"
                      placeholder="Indonesia, Jepang, dll."
                      value={formData.country}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Tahun Lahir & Tahun Aktif */}
                <div className="col-12 col-sm-6 col-md-4">
                  <label className="form-label fw-semibold small text-dark">
                    Tahun Kelahiran
                  </label>
                  <input
                    type="number"
                    name="birthYear"
                    className="form-control"
                    placeholder="Contoh: 1985"
                    min="1800"
                    max={CURRENT_YEAR}
                    value={formData.birthYear}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="col-12 col-sm-6 col-md-4">
                  <label className="form-label fw-semibold small text-dark">
                    Tahun Aktif / Debut
                  </label>
                  <input
                    type="number"
                    name="activeSince"
                    className="form-control"
                    placeholder="Contoh: 2015"
                    min="1800"
                    max={CURRENT_YEAR}
                    value={formData.activeSince}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Genre Utama */}
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold small text-dark">
                    Genre Spesialisasi
                  </label>
                  <select
                    name="primaryGenre"
                    className="form-select"
                    value={formData.primaryGenre}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    <option value="Teknologi & Pemrograman">Teknologi & Pemrograman</option>
                    <option value="Self Improvement & Filsafat">Self Improvement & Filsafat</option>
                    <option value="Fiksi & Sejarah">Fiksi & Sejarah</option>
                    <option value="Finansial & Bisnis">Finansial & Bisnis</option>
                    <option value="Sastra Klasik Indonesia">Sastra Klasik Indonesia</option>
                    <option value="Sains & Antropologi">Sains & Antropologi</option>
                    <option value="Drama & Budaya">Drama & Budaya</option>
                  </select>
                </div>

                {/* URL Avatar */}
                <div className="col-12">
                  <label className="form-label fw-semibold small text-dark">
                    URL Foto Profil / Avatar (Opsional)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-secondary border-end-0">
                      <i className="fa-solid fa-image"></i>
                    </span>
                    <input
                      type="url"
                      name="avatar"
                      className="form-control border-start-0"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.avatar}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-text small">
                    Biarkan kosong untuk menggunakan avatar otomatis secara acak.
                  </div>
                </div>

                {/* Biografi Singkat */}
                <div className="col-12">
                  <label className="form-label fw-semibold small text-dark">
                    Biografi & Rekam Jejak Penulis
                  </label>
                  <textarea
                    name="bio"
                    rows="3"
                    className="form-control"
                    placeholder="Tuliskan latar belakang karir kepenulisan, karya terkenal, atau penghargaan yang pernah diraih..."
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  ></textarea>
                </div>
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
                    <i className={isEdit ? 'fa-solid fa-floppy-disk' : 'fa-solid fa-user-plus'}></i>
                    <span>{isEdit ? 'Simpan Perubahan' : 'Simpan Author'}</span>
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

export default AuthorModal;
