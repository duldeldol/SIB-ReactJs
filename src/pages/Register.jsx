import React, { useState } from 'react';
import { Link } from 'react-router';
import { registerUser } from '../services/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{4,20}$/;

const getInitialState = () => {
  const defaultState = {
    formData: {
      fullName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
    errors: {},
    touched: {},
    showPassword: false,
    showConfirmPassword: false,
    isRegistered: false,
    registeredUser: null,
  };

  if (typeof window === 'undefined') return defaultState;

  const params = new URLSearchParams(window.location.search);
  const demo = params.get('demo');

  if (demo === 'error' || demo === 'validation-error') {
    return {
      formData: {
        fullName: 'Al',
        email: 'bukan-format-email',
        username: 'usr',
        password: '123',
        confirmPassword: '456',
        agreeTerms: false,
      },
      errors: {
        fullName: 'Nama lengkap minimal 3 karakter.',
        email: 'Format email tidak valid (contoh: nama@email.com).',
        username: 'Username minimal 4 karakter.',
        password: 'Password minimal 6 karakter.',
        confirmPassword: 'Konfirmasi password tidak cocok.',
        agreeTerms: 'Anda harus menyetujui syarat dan ketentuan.',
      },
      touched: {
        fullName: true,
        email: true,
        username: true,
        password: true,
        confirmPassword: true,
        agreeTerms: true,
      },
      showPassword: false,
      showConfirmPassword: false,
      isRegistered: false,
      registeredUser: null,
    };
  }

  if (demo === 'strength' || demo === 'password-strength') {
    return {
      formData: {
        fullName: 'Haydar Ali Ayyubi',
        email: 'haydar@example.com',
        username: 'haydarali',
        password: 'PasswordKuat2026!',
        confirmPassword: 'PasswordKuat2026!',
        agreeTerms: true,
      },
      errors: {},
      touched: {
        fullName: true,
        email: true,
        username: true,
        password: true,
        confirmPassword: true,
        agreeTerms: true,
      },
      showPassword: true,
      showConfirmPassword: true,
      isRegistered: false,
      registeredUser: null,
    };
  }

  if (demo === 'success') {
    return {
      formData: defaultState.formData,
      errors: {},
      touched: {},
      showPassword: false,
      showConfirmPassword: false,
      isRegistered: true,
      registeredUser: {
        id: Date.now(),
        fullName: 'Haydar Ali Ayyubi',
        username: 'haydarali',
        email: 'haydar@example.com',
      },
    };
  }

  return defaultState;
};

function Register() {
  const initial = getInitialState();

  const [formData, setFormData] = useState(initial.formData);
  const [errors, setErrors] = useState(initial.errors);
  const [touched, setTouched] = useState(initial.touched);
  const [showPassword, setShowPassword] = useState(initial.showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(initial.showConfirmPassword);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isRegistered, setIsRegistered] = useState(initial.isRegistered);
  const [registeredUser, setRegisteredUser] = useState(initial.registeredUser);

  const calculatePasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Kosong', color: 'secondary', percent: 0 };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) {
      return { score: 1, label: 'Lemah', color: 'danger', percent: 25 };
    } else if (score <= 3) {
      return { score: 2, label: 'Sedang', color: 'warning', percent: 65 };
    } else {
      return { score: 3, label: 'Kuat', color: 'success', percent: 100 };
    }
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const validateField = (name, value, currentValues = formData) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (!value || !value.trim()) {
          error = 'Nama lengkap wajib diisi.';
        } else if (value.trim().length < 3) {
          error = 'Nama lengkap minimal 3 karakter.';
        }
        break;

      case 'email':
        if (!value || !value.trim()) {
          error = 'Alamat email wajib diisi.';
        } else if (!EMAIL_REGEX.test(value.trim())) {
          error = 'Format email tidak valid (contoh: nama@email.com).';
        }
        break;

      case 'username':
        if (!value || !value.trim()) {
          error = 'Username wajib diisi.';
        } else if (value.trim().length < 4) {
          error = 'Username minimal 4 karakter.';
        } else if (/\s/.test(value)) {
          error = 'Username tidak boleh mengandung spasi.';
        } else if (!USERNAME_REGEX.test(value.trim())) {
          error = 'Username hanya boleh huruf, angka, dan garis bawah (_).';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Kata sandi wajib diisi.';
        } else if (value.length < 6) {
          error = 'Kata sandi minimal 6 karakter.';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Konfirmasi kata sandi wajib diisi.';
        } else if (value !== currentValues.password) {
          error = 'Konfirmasi kata sandi tidak cocok.';
        }
        break;

      case 'agreeTerms':
        if (!value) {
          error = 'Anda wajib menyetujui syarat dan ketentuan layanan.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field], formData);
      if (err) {
        newErrors[field] = err;
      }
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const updated = {
      ...formData,
      [name]: fieldValue,
    };
    setFormData(updated);

    if (serverError) setServerError('');

    if (touched[name]) {
      const fieldError = validateField(name, fieldValue, updated);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }

    if (name === 'password' && touched.confirmPassword) {
      const confirmErr = validateField('confirmPassword', formData.confirmPassword, updated);
      setErrors((prev) => ({ ...prev, confirmPassword: confirmErr }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, fieldValue, formData);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const markAllTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(markAllTouched);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setServerError('');

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        username: formData.username.trim().toLowerCase(),
        password: formData.password,
      };

      const res = await registerUser(payload);
      setRegisteredUser(res.user || payload);
      setIsRegistered(true);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Gagal memproses pendaftaran. Silakan coba lagi.';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    });
    setErrors({});
    setTouched({});
    setServerError('');
    setIsRegistered(false);
    setRegisteredUser(null);
  };

  return (
    <div
      className="py-5 min-vh-100 d-flex align-items-center"
      style={{
        background: 'radial-gradient(circle at 50% 15%, rgba(15, 118, 110, 0.08) 0%, rgba(248, 250, 252, 1) 100%)',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white position-relative">
              {/* Garis Aksen Gradien Halus di Atas Card */}
              <div
                style={{
                  height: '5px',
                  background: 'linear-gradient(90deg, #0f766e 0%, #14b8a6 50%, #06b6d4 100%)',
                }}
              ></div>

              <div className="card-body p-4 p-md-5">
                {!isRegistered ? (
                  <div>
                    {/* Header Card dengan Badge Gradien */}
                    <div className="text-center mb-4">
                      <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm mb-3 text-white"
                        style={{
                          width: 58,
                          height: 58,
                          background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                        }}
                      >
                        <i className="fa-solid fa-user-plus fs-4"></i>
                      </div>
                      <h3 className="fw-bold text-dark mb-1">Buat Akun Baru</h3>
                      <p className="text-muted small mb-0">
                        Silakan lengkapi formulir di bawah untuk mendaftar
                      </p>
                    </div>

                    {/* Notifikasi Server Error */}
                    {serverError && (
                      <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center justify-content-between">
                        <span>{serverError}</span>
                        <button
                          type="button"
                          className="btn-close small"
                          aria-label="Tutup"
                          onClick={() => setServerError('')}
                        ></button>
                      </div>
                    )}

                    {/* Formulir Input 1-Kolom */}
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="row g-3">
                        {/* Nama Lengkap */}
                        <div className="col-12">
                          <label htmlFor="fullName" className="form-label fw-semibold small mb-1">
                            Nama Lengkap <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light text-muted">
                              <i className="fa-solid fa-id-card"></i>
                            </span>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              className={`form-control ${
                                touched.fullName ? (errors.fullName ? 'is-invalid' : 'is-valid') : ''
                              }`}
                              placeholder="Contoh: Haydar Ali Ayyubi"
                              value={formData.fullName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isSubmitting}
                            />
                          </div>
                          {touched.fullName && errors.fullName && (
                            <div className="text-danger small mt-1">{errors.fullName}</div>
                          )}
                        </div>

                        {/* Email */}
                        <div className="col-12">
                          <label htmlFor="email" className="form-label fw-semibold small mb-1">
                            Alamat Email <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light text-muted">
                              <i className="fa-solid fa-envelope"></i>
                            </span>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className={`form-control ${
                                touched.email ? (errors.email ? 'is-invalid' : 'is-valid') : ''
                              }`}
                              placeholder="nama@email.com"
                              value={formData.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isSubmitting}
                            />
                          </div>
                          {touched.email && errors.email && (
                            <div className="text-danger small mt-1">{errors.email}</div>
                          )}
                        </div>

                        {/* Username */}
                        <div className="col-12">
                          <label htmlFor="username" className="form-label fw-semibold small mb-1">
                            Username <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light text-muted">
                              <i className="fa-solid fa-at"></i>
                            </span>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              className={`form-control ${
                                touched.username ? (errors.username ? 'is-invalid' : 'is-valid') : ''
                              }`}
                              placeholder="username_anda"
                              value={formData.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isSubmitting}
                            />
                          </div>
                          {touched.username && errors.username && (
                            <div className="text-danger small mt-1">{errors.username}</div>
                          )}
                        </div>

                        {/* Kata Sandi */}
                        <div className="col-12">
                          <label htmlFor="password" className="form-label fw-semibold small mb-1">
                            Kata Sandi <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light text-muted">
                              <i className="fa-solid fa-lock"></i>
                            </span>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              id="password"
                              name="password"
                              className={`form-control ${
                                touched.password ? (errors.password ? 'is-invalid' : 'is-valid') : ''
                              }`}
                              placeholder="Min. 6 karakter"
                              value={formData.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isSubmitting}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => setShowPassword(!showPassword)}
                              title={showPassword ? 'Sembunyikan' : 'Tampilkan'}
                            >
                              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                          </div>
                          {touched.password && errors.password && (
                            <div className="text-danger small mt-1">{errors.password}</div>
                          )}

                          {formData.password && (
                            <div className="mt-2">
                              <div
                                className="d-flex justify-content-between small text-muted mb-1"
                                style={{ fontSize: '0.75rem' }}
                              >
                                <span>Kekuatan sandi:</span>
                                <span className={`fw-semibold text-${passwordStrength.color}`}>
                                  {passwordStrength.label}
                                </span>
                              </div>
                              <div className="progress" style={{ height: '4px' }}>
                                <div
                                  className={`progress-bar bg-${passwordStrength.color}`}
                                  style={{ width: `${passwordStrength.percent}%`, transition: 'width 0.3s' }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Konfirmasi Kata Sandi */}
                        <div className="col-12">
                          <label htmlFor="confirmPassword" className="form-label fw-semibold small mb-1">
                            Konfirmasi Kata Sandi <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light text-muted">
                              <i className="fa-solid fa-shield-halved"></i>
                            </span>
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              id="confirmPassword"
                              name="confirmPassword"
                              className={`form-control ${
                                touched.confirmPassword
                                  ? errors.confirmPassword
                                    ? 'is-invalid'
                                    : 'is-valid'
                                  : ''
                              }`}
                              placeholder="Ulangi kata sandi"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isSubmitting}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              title={showConfirmPassword ? 'Sembunyikan' : 'Tampilkan'}
                            >
                              <i
                                className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                              ></i>
                            </button>
                          </div>
                          {touched.confirmPassword && errors.confirmPassword && (
                            <div className="text-danger small mt-1">{errors.confirmPassword}</div>
                          )}
                        </div>

                        {/* Persetujuan Syarat & Ketentuan */}
                        <div className="col-12 mt-3">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id="agreeTerms"
                              name="agreeTerms"
                              className={`form-check-input ${
                                touched.agreeTerms && errors.agreeTerms ? 'is-invalid' : ''
                              }`}
                              checked={formData.agreeTerms}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isSubmitting}
                            />
                            <label htmlFor="agreeTerms" className="form-check-label small text-muted">
                              Saya menyetujui{' '}
                              <span className="text-primary fw-semibold">Syarat & Ketentuan</span> serta{' '}
                              <span className="text-primary fw-semibold">Kebijakan Privasi</span> BookStore.
                            </label>
                          </div>
                          {touched.agreeTerms && errors.agreeTerms && (
                            <div className="text-danger small mt-1">{errors.agreeTerms}</div>
                          )}
                        </div>

                        {/* Tombol Submit Beraksen Gradien */}
                        <div className="col-12 mt-4">
                          <button
                            type="submit"
                            className="btn text-white w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                            style={{
                              background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
                              border: 'none',
                            }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                <span>Memproses Pendaftaran...</span>
                              </>
                            ) : (
                              <>
                                <i className="fa-solid fa-user-plus"></i>
                                <span>Daftar Akun Sekarang</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* Footer Link Masuk */}
                    <div className="text-center mt-4 pt-3 border-top">
                      <span className="small text-muted">Sudah memiliki akun terdaftar? </span>
                      <Link
                        to="/login"
                        className="small text-primary text-decoration-none fw-bold align-baseline"
                      >
                        Masuk ke Akun
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Layar Sukses Beraksen Gradien */
                  <div className="text-center py-3">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle text-white shadow-sm mb-3"
                      style={{
                        width: 68,
                        height: 68,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      }}
                    >
                      <i className="fa-solid fa-check fs-2"></i>
                    </div>
                    <h4 className="fw-bold text-dark mb-1">Pendaftaran Berhasil!</h4>
                    <p className="text-muted small mb-4">
                      Selamat datang, <strong className="text-primary">{registeredUser?.fullName}</strong>! Akun Anda telah siap digunakan.
                    </p>

                    <div className="bg-light rounded-3 p-3 text-start small mb-4 border">
                      <div className="row g-2">
                        <div className="col-4 text-muted">Nama Lengkap:</div>
                        <div className="col-8 fw-semibold text-dark">{registeredUser?.fullName}</div>
                        <div className="col-4 text-muted">Username:</div>
                        <div className="col-8 fw-semibold text-dark">@{registeredUser?.username}</div>
                        <div className="col-4 text-muted">Email:</div>
                        <div className="col-8 fw-semibold text-dark">{registeredUser?.email}</div>
                      </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                      <Link
                        to="/login"
                        className="btn text-white rounded-pill px-4 py-2 fw-semibold shadow-sm"
                        style={{
                          background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                          border: 'none',
                        }}
                      >
                        <i className="fa-solid fa-right-to-bracket me-2"></i> Masuk Sekarang
                      </Link>
                      <Link
                        to="/books"
                        className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-semibold"
                      >
                        <i className="fa-solid fa-book-open me-2"></i> Mulai Belanja
                      </Link>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-link text-muted small text-decoration-none"
                      >
                        Daftar Akun Lain
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
