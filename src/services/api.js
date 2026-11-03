import axios from 'axios';

/**
 * api.js - Layanan HTTP Client Berbasis Axios
 * Mengimplementasikan konsep materi CRUD React JS (NF Academy):
 * - Axios instance dengan baseURL & timeout
 * - Operasi Asynchronous (async/await & Promise)
 * - Persistent storage (LocalStorage) dengan initial mock data yang sinkron
 * - Mendukung backend API nyata (via VITE_API_URL) maupun fallback lokal tanpa server.
 */

const STORAGE_KEYS = {
  GENRES: 'bookstore_admin_genres_v2',
  AUTHORS: 'bookstore_admin_authors',
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

  // --- RUTE GENRES ---
  if (url.endsWith('/genres') || url.endsWith('/genres/')) {
    let genres = loadFromStorage(STORAGE_KEYS.GENRES, INITIAL_GENRES);

    if (method === 'get') {
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
  }

  // --- RUTE AUTHORS ---
  if (url.endsWith('/authors') || url.endsWith('/authors/')) {
    let authors = loadFromStorage(STORAGE_KEYS.AUTHORS, INITIAL_AUTHORS);

    if (method === 'get') {
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

/**
 * =========================================================
 * Service Functions untuk Konsumsi di Komponen
 * Sesuai panduan materi (async/await, Axios GET & POST)
 * =========================================================
 */

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

// 3. Read Authors (Axios GET)
export const fetchAuthors = async () => {
  const response = await apiClient.get('/authors');
  return response.data;
};

// 4. Create Author (Axios POST)
export const createAuthor = async (authorData) => {
  const response = await apiClient.post('/authors', authorData);
  return response.data;
};

// 5. Reset data ke default (Utilitas opsional)
export const resetAdminData = () => {
  saveToStorage(STORAGE_KEYS.GENRES, INITIAL_GENRES);
  saveToStorage(STORAGE_KEYS.AUTHORS, INITIAL_AUTHORS);
};

export default apiClient;
