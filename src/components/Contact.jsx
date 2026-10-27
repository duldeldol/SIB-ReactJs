import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Pemesanan Buku',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Mohon isi semua bidang yang wajib diisi.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="py-5 bg-light" id="contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-dark">Hubungi BookStore</h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Punya pertanyaan mengenai pesanan, ketersediaan judul buku, atau kerjasama kurasi? 
            Silakan hubungi kami melalui informasi di bawah atau kirimkan pesan langsung.
          </p>
        </div>

        <div className="row g-5">
          {/* Kolom KIRI: Informasi Kontak & Toko */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h4 className="fw-bold text-dark mb-4">Informasi Kontak</h4>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-location-dot text-primary me-2"></i>
                  <span className="fw-semibold text-dark">Alamat Toko:</span>
                </div>
                <p className="text-secondary small mb-0 ps-4">
                  Kampus B STT Terpadu Nurul Fikri, Jl. Raya Lenteng Agung No. 20, Jagakarsa, Jakarta Selatan, 12610.
                </p>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa-brands fa-whatsapp text-success me-2"></i>
                  <span className="fw-semibold text-dark">WhatsApp / Hotline:</span>
                </div>
                <p className="text-secondary small mb-0 ps-4">
                  +62 812-3456-7890
                </p>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa-regular fa-envelope text-primary me-2"></i>
                  <span className="fw-semibold text-dark">Email Resmi:</span>
                </div>
                <p className="text-secondary small mb-0 ps-4">
                  kontak@bookstore.id<br />
                  halo.haydar@sttnf.ac.id
                </p>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa-regular fa-clock text-primary me-2"></i>
                  <span className="fw-semibold text-dark">Jam Operasional:</span>
                </div>
                <p className="text-secondary small mb-0 ps-4">
                  Senin – Jumat: 08.00 – 20.00 WIB<br />
                  Sabtu – Minggu: 09.00 – 17.00 WIB
                </p>
              </div>

              <div className="mt-auto pt-3 border-top">
                <p className="text-muted small mb-0">
                  <i className="fa-solid fa-circle-info text-secondary me-1"></i>
                  Tim kami akan merespons pesan dan pertanyaan Anda secepat mungkin pada jam operasional kerja.
                </p>
              </div>
            </div>
          </div>

          {/* Kolom KANAN: Form Kirim Pesan */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              <h4 className="fw-bold text-dark mb-2">Kirim Pesan</h4>
              <p className="text-secondary small mb-4">
                Tuliskan pertanyaan atau kebutuhan buku Anda, kami akan membalas via email dalam waktu 1x24 jam.
              </p>

              {submitted ? (
                <div className="alert alert-success d-flex align-items-center rounded-3 p-3" role="alert">
                  <i className="fa-solid fa-circle-check fs-4 me-3 text-success"></i>
                  <div>
                    <h6 className="alert-heading mb-1 fw-bold">Pesan Berhasil Terkirim!</h6>
                    <p className="mb-0 small">
                      Terima kasih <strong>{formData.name}</strong>, tim BookStore akan segera menghubungi Anda di email <strong>{formData.email}</strong>.
                    </p>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success mt-3"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: 'Pemesanan Buku', message: '' });
                      }}
                    >
                      Kirim Pesan Lainnya
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Nama Lengkap <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nama lengkap Anda"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Alamat Email <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="nama@email.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small">Kategori Pertanyaan</label>
                      <select
                        className="form-select"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="Pemesanan Buku">Pemesanan & Status Pengiriman Buku</option>
                        <option value="Rekomendasi Buku">Permintaan Rekomendasi / Pre-Order Buku</option>
                        <option value="Kemitraan Penulis & Penerbit">Kerjasama Penulis & Penerbit</option>
                        <option value="Kritik & Saran">Kritik, Saran & Masukan Platform</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small">Isi Pesan <span className="text-danger">*</span></label>
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Tuliskan pertanyaan atau kebutuhan buku yang Anda cari secara jelas..."
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <div className="col-12 mt-3">
                      <button type="submit" className="btn btn-primary px-4 py-2 fw-semibold">
                        Kirim Pesan
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
