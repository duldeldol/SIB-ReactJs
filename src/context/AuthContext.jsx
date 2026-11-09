import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { AuthContext, AUTH_STORAGE_KEYS } from './authContextInstance';

export function AuthProvider({ children }) {
  // Inisialisasi state secara lazy dari localStorage atau demo query params
  const [user, setUser] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const demoAuth = params.get('auth');
        if (demoAuth === 'admin') {
          return {
            id: 1,
            fullName: 'Administrator BookStore',
            email: 'admin@bookstore.com',
            username: 'admin',
            role: 'admin',
            createdAt: '2026-10-01T08:00:00.000Z',
          };
        }
        if (demoAuth === 'user') {
          return {
            id: 2,
            fullName: 'Haydar Ali Ayyubi',
            email: 'haydar@example.com',
            username: 'haydarali',
            role: 'user',
            createdAt: '2026-10-02T08:00:00.000Z',
          };
        }
      }

      const savedUser = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error('Gagal membaca sesi pengguna awal:', err);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const demoAuth = params.get('auth');
        if (demoAuth) {
          return `mock-jwt-token-demo-${demoAuth}`;
        }
      }

      return localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN) || null;
    } catch (err) {
      console.error('Gagal membaca token otentikasi awal:', err);
      return null;
    }
  });

  const [loading] = useState(false);

  // Fungsi Login
  const login = async (identifier, password) => {
    const result = await loginUser({ identifier, password });
    if (result && result.user && result.token) {
      setUser(result.user);
      setToken(result.token);
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(result.user));
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, result.token);
      return result;
    }
    throw new Error(result?.message || 'Login gagal.');
  };

  // Fungsi Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
  };

  // Fungsi Update Profile (Sinkronkan ke Auth state & database lokal users)
  const updateProfile = (updatedData) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(updatedUser));

    try {
      const rawUsers = localStorage.getItem(AUTH_STORAGE_KEYS.USERS_LIST);
      if (rawUsers) {
        const users = JSON.parse(rawUsers);
        const index = users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          users[index] = { ...users[index], ...updatedData };
          localStorage.setItem(AUTH_STORAGE_KEYS.USERS_LIST, JSON.stringify(users));
        }
      }
    } catch (err) {
      console.error('Gagal memperbarui profil pengguna di storage list:', err);
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
