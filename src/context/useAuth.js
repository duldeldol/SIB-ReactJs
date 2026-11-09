import { useContext } from 'react';
import { AuthContext } from './authContextInstance';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam komponen AuthProvider');
  }
  return context;
};

export default useAuth;
