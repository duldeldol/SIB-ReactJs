import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/useAuth';

/**
 * Komponen ProtectedRoute untuk melindungi rute berbasis otentikasi dan otorisasi peran (RBAC).
 *
 * @param {Array<string>} [allowedRoles] 
 * @param {React.ReactNode} [children] 
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Tunggu pengecekan sesi selesai sebelum memutuskan aksi navigasi
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5 my-5" style={{ minHeight: '50vh' }}>
        <div className="text-center">
          <div className="spinner-border text-teal mb-3" role="status" style={{ width: '3rem', height: '3rem', color: '#0f766e' }}>
            <span className="visually-hidden">Memuat...</span>
          </div>
          <p className="text-muted fw-semibold">Memeriksa hak akses pengguna...</p>
        </div>
      </div>
    );
  }

  // Jika belum login, redirect ke halaman Login dan sertakan lokasi tujuan saat ini
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika sudah login namun rolenya tidak termasuk dalam allowedRoles, redirect ke halaman Unauthorized (403)
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Akses diizinkan
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
