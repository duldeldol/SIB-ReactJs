import { createContext } from 'react';

export const AUTH_STORAGE_KEYS = {
  USER: 'bookstore_auth_user',
  TOKEN: 'bookstore_auth_token',
  USERS_LIST: 'bookstore_users',
};

export const AuthContext = createContext(null);
export default AuthContext;
