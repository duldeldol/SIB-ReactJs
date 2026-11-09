import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/useAuth';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect target setelah login jika sebelumnya diarahkan oleh ProtectedRoute
  const fromPath = location.state?.from?.pathname;

  const searchParams = new URLSearchParams(location.search);
  const demoParam = searchParams.get('demo');

  const [formData, setFormData] = useState({
    identifier: demoParam === 'error' ? 'usr' : '',
    password: demoParam === 'error' ? '123' : '',
    rememberMe: true,
  });

  const [errors, setErrors] = useState(() => {
    if (demoParam === 'error') {
      return {
        identifier: 'Alamat email atau username wajib diisi.',
        password: 'Kata sandi minimal 6 karakter.',
      };
    }
    return {};
  });

  const [touched, setTouched] = useState(() => {
    if (demoParam === 'error') {
      return { identifier: true, password: true };
    }
    return {};
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const validateField = (name, value) => {
    if (name === 'identifier') {
      if (!value || !value.trim()) return 'Alamat email atau username wajib diisi.';
    }
    if (name === 'password') {
      if (!value) return 'Kata sandi wajib diisi.';
      if (value.length < 6) return 'Kata sandi minimal 6 karakter.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));

    if (errorMessage) setErrorMessage('');

    if (touched[name]) {
      const err = validateField(name, fieldValue);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setInfoMessage('Tautan pemulihan kata sandi telah dikirimkan ke alamat email Anda.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idErr = validateField('identifier', formData.identifier);
    const passErr = validateField('password', formData.password);

    setTouched({ identifier: true, password: true });
    setErrors({ identifier: idErr, password: passErr });

    if (idErr || passErr) return;

    setIsSubmitting(true);
    setErrorMessage('');
    setInfoMessage('');

    try {
      const response = await login(formData.identifier.trim(), formData.password);
      const userRole = response?.user?.role;

      // Navigasi cerdas: admin ke dashboard admin, member ke profil (hindari 403)
      if (userRole === 'admin') {
        navigate(fromPath || '/admin', { replace: true });
      } else {
        const safeDestination =
          fromPath && !fromPath.startsWith('/admin') && fromPath !== '/unauthorized'
            ? fromPath
            : '/profile';
        navigate(safeDestination, { replace: true });
      }
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message ||
        err?.message ||
        'Kredensial tidak cocok. Silakan periksa kembali email/username dan kata sandi Anda.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
              {/* Garis Aksen Gradien Halus */}
              <div
                style={{
                  height: '5px',
                  background: 'linear-gradient(90deg, #0f766e 0%, #14b8a6 50%, #06b6d4 100%)',
                }}
              />

              <div className="card-body p-4 p-md-5">
                {/* Header Toko Buku */}
                <div className="text-center mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm mb-3 text-white"
                    style={{
                      width: 58,
                      height: 58,
                      background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                    }}
                  >
                    <i className="fa-solid fa-right-to-bracket fs-4"></i>
                  </div>
                  <h3 className="fw-bold text-dark mb-1">Masuk ke BookStore</h3>
                  <p className="text-muted small mb-0">
                    Silakan masukkan email atau username untuk melanjutkan
                  </p>
                </div>

                {/* Notifikasi Info Lupa Sandi */}
                {infoMessage && (
                  <div className="alert alert-info py-2 px-3 small rounded-3 mb-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <i className="fa-solid fa-circle-info"></i>
                      <span>{infoMessage}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-close small"
                      aria-label="Tutup"
                      onClick={() => setInfoMessage('')}
                    />
                  </div>
                )}

                {/* Error Banner */}
                {errorMessage && (
                  <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <i className="fa-solid fa-circle-exclamation"></i>
                      <span>{errorMessage}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-close small"
                      aria-label="Tutup"
                      onClick={() => setErrorMessage('')}
                    />
                  </div>
                )}

                {/* Form Login Toko Buku */}
                <form onSubmit={handleSubmit} noValidate>
                  {/* Email / Username */}
                  <div className="mb-3">
                    <label htmlFor="identifier" className="form-label fw-semibold small mb-1">
                      Email atau Username <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        className={`form-control border-start-0 ps-0 ${
                          touched.identifier && errors.identifier
                            ? 'is-invalid'
                            : touched.identifier && !errors.identifier
                            ? 'is-valid'
                            : ''
                        }`}
                        placeholder="nama@email.com atau username"
                        value={formData.identifier}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="username"
                        autoFocus
                      />
                    </div>
                    {touched.identifier && errors.identifier && (
                      <div className="invalid-feedback d-block small mt-1">{errors.identifier}</div>
                    )}
                  </div>

                  {/* Kata Sandi */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label htmlFor="password" className="form-label fw-semibold small mb-0">
                        Kata Sandi <span className="text-danger">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="btn btn-link p-0 text-decoration-none small fw-semibold"
                        style={{ color: '#0f766e', fontSize: '0.8rem' }}
                      >
                        Lupa sandi?
                      </button>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        className={`form-control border-start-0 border-end-0 px-0 ${
                          touched.password && errors.password
                            ? 'is-invalid'
                            : touched.password && !errors.password
                            ? 'is-valid'
                            : ''
                        }`}
                        placeholder="Masukkan kata sandi Anda"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="btn btn-light border border-start-0 text-muted"
                        onClick={() => setShowPassword((prev) => !prev)}
                        title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                      >
                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {touched.password && errors.password && (
                      <div className="invalid-feedback d-block small mt-1">{errors.password}</div>
                    )}
                  </div>

                  {/* Ingat Saya Checkbox */}
                  <div className="mb-4 d-flex align-items-center justify-content-between">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                      />
                      <label className="form-check-label small text-muted" htmlFor="rememberMe">
                        Ingat saya di perangkat ini
                      </label>
                    </div>
                  </div>

                  {/* Tombol Submit */}
                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary py-2 rounded-pill fw-semibold shadow-sm text-white"
                      style={{
                        background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                        border: 'none',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          />
                          Memproses Masuk...
                        </>
                      ) : (
                        <>
                          <span>Masuk ke BookStore</span>
                          <i className="fa-solid fa-arrow-right ms-2"></i>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Link ke Pendaftaran */}
                  <div className="text-center pt-3 border-top">
                    <p className="small text-muted mb-0">
                      Belum memiliki akun BookStore?{' '}
                      <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#0f766e' }}>
                        Daftar Akun Baru
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
