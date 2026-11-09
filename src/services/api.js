import axios from 'axios';

const STORAGE_KEYS = {
  GENRES: 'bookstore_admin_genres_v2',
  AUTHORS: 'bookstore_admin_authors',
  USERS: 'bookstore_users',
};

// Pembersihan otomatis cache genre percobaan lama dari browser
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    localStorage.removeItem('bookstore_admin_genres');
  } catch {
    // Abaikan jika storage dinonaktifkan
  }
}

// Data Awal Genre (Default)
const INITIAL_GENRES = [
  {
    id: 1,
    name: 'Teknologi & Pemrograman',
    slug: 'teknologi-pemrograman',
    description: 'Buku seputar coding, arsitektur software, web development, dan teknologi modern.',
    bookCount: 4,
    createdAt: '2026-10-01'
  },
  {
    id: 2,
    name: 'Self Improvement & Filsafat',
    slug: 'self-improvement-filsafat',
    description: 'Panduan pengembangan karakter, stoikisme, manajemen stres, dan kebiasaan positif.',
    bookCount: 3,
    createdAt: '2026-10-02'
  },
  {
    id: 3,
    name: 'Fiksi & Sejarah',
    slug: 'fiksi-sejarah',
    description: 'Karya sastra novel berlatar peristiwa bersejarah penting dan narasi mendalam.',
    bookCount: 2,
    createdAt: '2026-10-03'
  },
  {
    id: 4,
    name: 'Finansial & Bisnis',
    slug: 'finansial-bisnis',
    description: 'Strategi pengelolaan keuangan pribadi, psikologi investasi, dan dunia bisnis.',
    bookCount: 1,
    createdAt: '2026-10-04'
  },
  {
    id: 5,
    name: 'Sastra Klasik Indonesia',
    slug: 'sastra-klasik-indonesia',
    description: 'Karya sastra legendaris sastrawan bangsa yang merekam peradaban nusantara.',
    bookCount: 1,
    createdAt: '2026-10-05'
  },
  {
    id: 6,
    name: 'Sains & Antropologi',
    slug: 'sains-antropologi',
    description: 'Eksplorasi asal-usul manusia, perkembangan ilmu pengetahuan, dan semesta.',
    bookCount: 1,
    createdAt: '2026-10-06'
  }
];

// Data Awal Author / Penulis (Default)
const INITIAL_AUTHORS = [
  {
    id: 1,
    name: 'Andi Prasetyo',
    country: 'Indonesia',
    birthYear: 1988,
    activeSince: 2018,
    primaryGenre: 'Teknologi & Pemrograman',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Software architect dan edukator teknologi yang fokus membagikan materi JavaScript dan ekosistem modern bagi developer pemula.',
    booksCount: 1,
    createdAt: '2026-10-01'
  },
  {
    id: 2,
    name: 'Dina Sari',
    country: 'Indonesia',
    birthYear: 1992,
    activeSince: 2019,
    primaryGenre: 'Teknologi & Pemrograman',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Frontend engineer dan praktisi React JS aktif yang rutin menyelenggarakan lokakarya pemrograman web interaktif.',
    booksCount: 1,
    createdAt: '2026-10-02'
  },
  {
    id: 3,
    name: 'Henry Manampiring',
    country: 'Indonesia',
    birthYear: 1974,
    activeSince: 2012,
    primaryGenre: 'Self Improvement & Filsafat',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Praktisi komunikasi periklanan dan penulis buku best-seller Filosofi Teras yang memperkenalkan filsafat Stoa ke generasi muda.',
    booksCount: 1,
    createdAt: '2026-10-03'
  },
  {
    id: 4,
    name: 'Leila S. Chudori',
    country: 'Indonesia',
    birthYear: 1962,
    activeSince: 1989,
    primaryGenre: 'Fiksi & Sejarah',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Jurnalis senior dan novelis terkemuka Indonesia. Pengarang Laut Bercerita dan penerima berbagai penghargaan sastra bergengsi.',
    booksCount: 1,
    createdAt: '2026-10-04'
  },
  {
    id: 5,
    name: 'Morgan Housel',
    country: 'Amerika Serikat',
    birthYear: 1984,
    activeSince: 2014,
    primaryGenre: 'Finansial & Bisnis',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Mantan kolumnis Wall Street Journal dan partner di Collaborative Fund. Penulis buku dunia The Psychology of Money.',
    booksCount: 1,
    createdAt: '2026-10-05'
  },
  {
    id: 6,
    name: 'Pramoedya Ananta Toer',
    country: 'Indonesia',
    birthYear: 1925,
    activeSince: 1950,
    primaryGenre: 'Sastra Klasik Indonesia',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: 'Tokoh sastrawan besar Indonesia nominator Penghargaan Nobel Sastra, pencipta mahakarya Tetralogi Buru yang mendunia.',
    booksCount: 1,
    createdAt: '2026-10-06'
  }
];

// Data Awal Pengguna Terdaftar (Default Mock - Role Based Access Control)
const INITIAL_USERS = [
  {
    id: 1,
    fullName: 'Administrator BookStore',
    email: 'admin@bookstore.com',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    createdAt: '2026-10-01T08:00:00.000Z'
  },
  {
    id: 2,
    fullName: 'Haydar Ali Ayyubi',
    email: 'haydar@example.com',
    username: 'haydarali',
    password: 'user123',
    role: 'user',
    createdAt: '2026-10-02T08:00:00.000Z'
  }
];

// Helper Storage
const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Gagal menyimpan ke LocalStorage:', err);
  }
};

// Helper Storage Khusus Pengguna: Menjamin akun default (admin & haydarali) selalu terdaftar dan tidak tertimpa cache lama
export const loadUsersFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    let users = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(users)) users = [];

    const adminAccount = {
      id: 'admin_1',
      fullName: 'Administrator BookStore',
      email: 'admin@bookstore.com',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      createdAt: '2026-10-01T08:00:00.000Z',
    };

    const haydarAccount = {
      id: 'user_2',
      fullName: 'Haydar Ali Ayyubi',
      email: 'haydar@example.com',
      username: 'haydarali',
      password: 'user123',
      role: 'user',
      createdAt: '2026-10-02T08:00:00.000Z',
    };

    // Pastikan admin selalu ada dengan kredensial valid
    const adminIdx = users.findIndex(
      (u) =>
        (u.username || '').replace(/^@+/, '').toLowerCase() === 'admin' ||
        (u.email || '').toLowerCase() === 'admin@bookstore.com'
    );
    if (adminIdx === -1) {
      users.unshift(adminAccount);
    } else {
      users[adminIdx] = { ...users[adminIdx], ...adminAccount };
    }

    // Pastikan haydarali selalu ada dengan kredensial valid
    const haydarIdx = users.findIndex(
      (u) =>
        (u.username || '').replace(/^@+/, '').toLowerCase() === 'haydarali' ||
        (u.email || '').toLowerCase() === 'haydar@example.com'
    );
    if (haydarIdx === -1) {
      users.push(haydarAccount);
    } else {
      users[haydarIdx] = { ...users[haydarIdx], ...haydarAccount };
    }

    // Bersihkan seluruh data pengguna agar selalu memiliki password dan role
    users = users.map((u) => {
      const cleanUsername = (u.username || '').replace(/^@+/, '').toLowerCase();
      if (cleanUsername === 'admin') return adminAccount;
      if (cleanUsername === 'haydarali') return haydarAccount;
      return {
        ...u,
        username: (u.username || '').replace(/^@+/, ''),
        role: u.role || 'user',
        password: u.password || 'user123',
      };
    });

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return users;
  } catch (err) {
    console.error('Gagal membaca data pengguna dari storage:', err);
    return INITIAL_USERS;
  }
};

// Inisialisasi awal saat bundle dimuat di browser
if (typeof window !== 'undefined' && window.localStorage) {
  loadUsersFromStorage();
}

/**
 * Inisialisasi Axios Client Instance
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

/**
 * Custom Adapter Handler:
 * Menyediakan simulasi response HTTP nyata via Axios bila belum ada backend eksternal,
 * sekaligus mengembalikan response object standar Axios ({ data, status, headers, config }).
 */
apiClient.defaults.adapter = async (config) => {
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();

  // Simulasi network latency 200ms agar efek loading state terasa natural
  await new Promise((resolve) => setTimeout(resolve, 200));

  // --- RUTE GENRES (/genres atau /genres/:id) ---
  const genreMatch = url.match(/\/genres(?:\/([^/?#]+))?/);
  if (genreMatch) {
    const genreId = genreMatch[1] ? Number(genreMatch[1]) || genreMatch[1] : null;
    let genres = loadFromStorage(STORAGE_KEYS.GENRES, INITIAL_GENRES);

    if (method === 'get') {
      if (genreId) {
        const item = genres.find((g) => g.id == genreId);
        if (!item) {
          return { data: { message: 'Genre tidak ditemukan' }, status: 404, statusText: 'Not Found', headers: {}, config };
        }
        return { data: item, status: 200, statusText: 'OK', headers: {}, config };
      }
      return {
        data: genres,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (method === 'post') {
      const payload = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      const newGenre = {
        id: Date.now(),
        name: payload.name?.trim() || 'Genre Baru',
        slug: (payload.name || 'genre-baru')
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-'),
        description: payload.description?.trim() || '-',
        bookCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };

      genres = [newGenre, ...genres];
      saveToStorage(STORAGE_KEYS.GENRES, genres);

      return {
        data: newGenre,
        status: 201,
        statusText: 'Created',
        headers: {},
        config,
      };
    }

    if (method === 'put') {
      const payload = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      const targetId = genreId || payload.id;
      const index = genres.findIndex((g) => g.id == targetId);
      if (index === -1) {
        return { data: { message: 'Genre tidak ditemukan' }, status: 404, statusText: 'Not Found', headers: {}, config };
      }

      const current = genres[index];
      const updatedGenre = {
        ...current,
        name: payload.name ? payload.name.trim() : current.name,
        slug: payload.name
          ? payload.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
          : current.slug,
        description: payload.description !== undefined ? payload.description.trim() : current.description,
        updatedAt: new Date().toISOString().split('T')[0],
      };

      genres[index] = updatedGenre;
      saveToStorage(STORAGE_KEYS.GENRES, genres);

      return {
        data: updatedGenre,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (method === 'delete') {
      const targetId = genreId;
      const exists = genres.some((g) => g.id == targetId);
      if (!exists) {
        return { data: { message: 'Genre tidak ditemukan' }, status: 404, statusText: 'Not Found', headers: {}, config };
      }

      genres = genres.filter((g) => g.id != targetId);
      saveToStorage(STORAGE_KEYS.GENRES, genres);

      return {
        data: { message: 'Genre berhasil dihapus', id: targetId },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }
  }

  // --- RUTE AUTHORS (/authors atau /authors/:id) ---
  const authorMatch = url.match(/\/authors(?:\/([^/?#]+))?/);
  if (authorMatch) {
    const authorId = authorMatch[1] ? Number(authorMatch[1]) || authorMatch[1] : null;
    let authors = loadFromStorage(STORAGE_KEYS.AUTHORS, INITIAL_AUTHORS);

    if (method === 'get') {
      if (authorId) {
        const item = authors.find((a) => a.id == authorId);
        if (!item) {
          return { data: { message: 'Author tidak ditemukan' }, status: 404, statusText: 'Not Found', headers: {}, config };
        }
        return { data: item, status: 200, statusText: 'OK', headers: {}, config };
      }
      return {
        data: authors,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (method === 'post') {
      const payload = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      const defaultAvatars = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      ];
      const randomAvatar = defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

      const newAuthor = {
        id: Date.now(),
        name: payload.name?.trim() || 'Penulis Baru',
        country: payload.country?.trim() || 'Indonesia',
        birthYear: payload.birthYear ? parseInt(payload.birthYear, 10) : new Date().getFullYear() - 30,
        activeSince: payload.activeSince ? parseInt(payload.activeSince, 10) : new Date().getFullYear(),
        primaryGenre: payload.primaryGenre || 'Umum',
        avatar: payload.avatar?.trim() || randomAvatar,
        bio: payload.bio?.trim() || 'Penulis aktif di industri literatur.',
        booksCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };

      authors = [newAuthor, ...authors];
      saveToStorage(STORAGE_KEYS.AUTHORS, authors);

      return {
        data: newAuthor,
        status: 201,
        statusText: 'Created',
        headers: {},
        config,
      };
    }

    if (method === 'put') {
      const payload = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      const targetId = authorId || payload.id;
      const index = authors.findIndex((a) => a.id == targetId);
      if (index === -1) {
        return { data: { message: 'Author tidak ditemukan' }, status: 404, statusText: 'Not Found', headers: {}, config };
      }

      const current = authors[index];
      const updatedAuthor = {
        ...current,
        name: payload.name ? payload.name.trim() : current.name,
        country: payload.country ? payload.country.trim() : current.country,
        birthYear: payload.birthYear !== undefined ? parseInt(payload.birthYear, 10) : current.birthYear,
        activeSince: payload.activeSince !== undefined ? parseInt(payload.activeSince, 10) : current.activeSince,
        primaryGenre: payload.primaryGenre || current.primaryGenre,
        avatar: payload.avatar ? payload.avatar.trim() : current.avatar,
        bio: payload.bio !== undefined ? payload.bio.trim() : current.bio,
        updatedAt: new Date().toISOString().split('T')[0],
      };

      authors[index] = updatedAuthor;
      saveToStorage(STORAGE_KEYS.AUTHORS, authors);

      return {
        data: updatedAuthor,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (method === 'delete') {
      const targetId = authorId;
      const exists = authors.some((a) => a.id == targetId);
      if (!exists) {
        return { data: { message: 'Author tidak ditemukan' }, status: 404, statusText: 'Not Found', headers: {}, config };
      }

      authors = authors.filter((a) => a.id != targetId);
      saveToStorage(STORAGE_KEYS.AUTHORS, authors);

      return {
        data: { message: 'Author berhasil dihapus', id: targetId },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }
  }

  // --- RUTE AUTENTIKASI: LOGIN (POST /auth/login) ---
  if (url.includes('/auth/login') && method === 'post') {
    const payload = typeof config.data === 'string' ? JSON.parse(config.data) : (config.data || {});
    // Bersihkan karakter @ di awal jika ada, dan trim
    const rawIdentifier = (payload.identifier || payload.email || payload.username || '').trim();
    const cleanIdentifier = rawIdentifier.replace(/^@+/, '').toLowerCase();
    const password = (payload.password || '').trim();

    const users = loadUsersFromStorage();
    const matchedUser = users.find((u) => {
      const uUsername = (u.username || '').replace(/^@+/, '').trim().toLowerCase();
      const uEmail = (u.email || '').trim().toLowerCase();
      const isIdentifierMatch = uUsername === cleanIdentifier || uEmail === cleanIdentifier;
      const isPasswordMatch =
        u.password === password || (!u.password && (password === 'user123' || password === 'admin123'));
      return isIdentifierMatch && isPasswordMatch;
    });

    if (!matchedUser) {
      const err = new Error('Email/username atau kata sandi tidak valid. Silakan periksa kembali.');
      err.response = {
        data: { message: 'Email/username atau kata sandi tidak valid. Silakan periksa kembali.' },
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config,
      };
      throw err;
    }

    const safeUser = {
      id: matchedUser.id,
      fullName: matchedUser.fullName,
      email: matchedUser.email,
      username: (matchedUser.username || '').replace(/^@+/, ''),
      role: matchedUser.role || 'user',
      createdAt: matchedUser.createdAt,
    };

    return {
      data: {
        success: true,
        message: 'Login berhasil!',
        user: safeUser,
        token: `mock-jwt-token-${matchedUser.id}-${Date.now()}`,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  }

  // --- RUTE USERS & REGISTRASI (/auth/register atau /users) ---
  if (url.includes('/auth/register') || (url.includes('/users') && method === 'post')) {
    const payload = typeof config.data === 'string' ? JSON.parse(config.data) : (config.data || {});
    let users = loadUsersFromStorage();

    const emailTrimmed = (payload.email || '').trim().toLowerCase();
    const usernameTrimmed = (payload.username || '').replace(/^@+/, '').trim().toLowerCase();

    // Validasi keunikan email
    const duplicateEmail = users.some((u) => (u.email || '').trim().toLowerCase() === emailTrimmed);
    if (duplicateEmail) {
      const err = new Error('Alamat email sudah terdaftar. Silakan gunakan email lain atau masuk ke akun Anda.');
      err.response = {
        data: { message: 'Alamat email sudah terdaftar. Silakan gunakan email lain atau masuk ke akun Anda.' },
        status: 409,
        statusText: 'Conflict',
        headers: {},
        config,
      };
      throw err;
    }

    // Validasi keunikan username
    const duplicateUsername = users.some(
      (u) => (u.username || '').replace(/^@+/, '').trim().toLowerCase() === usernameTrimmed
    );
    if (duplicateUsername) {
      const err = new Error('Username sudah digunakan. Silakan pilih username lain.');
      err.response = {
        data: { message: 'Username sudah digunakan. Silakan pilih username lain.' },
        status: 409,
        statusText: 'Conflict',
        headers: {},
        config,
      };
      throw err;
    }

    const newUser = {
      id: Date.now(),
      fullName: payload.fullName?.trim() || 'Pelanggan Baru',
      email: emailTrimmed,
      username: usernameTrimmed,
      password: (payload.password || 'user123').trim(),
      role: payload.role || 'user',
      createdAt: new Date().toISOString(),
    };

    users = [newUser, ...users];
    saveToStorage(STORAGE_KEYS.USERS, users);

    const safeUser = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    return {
      data: {
        success: true,
        message: 'Pendaftaran akun berhasil!',
        user: safeUser,
        token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
      },
      status: 201,
      statusText: 'Created',
      headers: {},
      config,
    };
  }

  if (url.includes('/users') && method === 'get') {
    const users = loadUsersFromStorage();
    return {
      data: users,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  }

  // Fallback 404
  return {
    data: { message: 'Not Found' },
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config,
  };
};

// 1. Read Genres (Axios GET)
export const fetchGenres = async () => {
  const response = await apiClient.get('/genres');
  return response.data;
};

// 2. Create Genre (Axios POST)
export const createGenre = async (genreData) => {
  const response = await apiClient.post('/genres', genreData);
  return response.data;
};

// 3. Update Genre (Axios PUT)
export const updateGenre = async (id, genreData) => {
  const response = await apiClient.put(`/genres/${id}`, genreData);
  return response.data;
};

// 4. Delete Genre (Axios DELETE)
export const deleteGenre = async (id) => {
  const response = await apiClient.delete(`/genres/${id}`);
  return response.data;
};

// 5. Read Authors (Axios GET)
export const fetchAuthors = async () => {
  const response = await apiClient.get('/authors');
  return response.data;
};

// 6. Create Author (Axios POST)
export const createAuthor = async (authorData) => {
  const response = await apiClient.post('/authors', authorData);
  return response.data;
};

// 7. Update Author (Axios PUT)
export const updateAuthor = async (id, authorData) => {
  const response = await apiClient.put(`/authors/${id}`, authorData);
  return response.data;
};

// 8. Delete Author (Axios DELETE)
export const deleteAuthor = async (id) => {
  const response = await apiClient.delete(`/authors/${id}`);
  return response.data;
};

// 9. Autentikasi / Login Pengguna (Axios POST)
export const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

// 10. Registrasi Pengguna Baru (Axios POST)
export const registerUser = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

// 11. Ambil Daftar Pengguna Terdaftar (Axios GET)
export const fetchUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

// 12. Reset data ke default (Utilitas opsional)
export const resetAdminData = () => {
  saveToStorage(STORAGE_KEYS.GENRES, INITIAL_GENRES);
  saveToStorage(STORAGE_KEYS.AUTHORS, INITIAL_AUTHORS);
  saveToStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
};

export default apiClient;
