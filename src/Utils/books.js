const books = [
  {
    id: 1,
    title: "Belajar JavaScript Dasar",
    author: "Andi Prasetyo",
    year: 2021,
    description: "Panduan lengkap untuk pemula yang ingin belajar JavaScript dari nol hingga memahami konsep pemrograman modern.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=600&q=80",
    category: "Teknologi & Pemrograman",
    price: 79000,
    rating: 4.8,
    reviews: 4200
  },
  {
    id: 2,
    title: "React untuk Pemula",
    author: "Dina Sari",
    year: 2022,
    description: "Mengenal konsep dasar, komponen, hooks, serta praktik membuat aplikasi web berbasis React yang responsif dan modern.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
    category: "Teknologi & Pemrograman",
    price: 89000,
    rating: 4.9,
    reviews: 5100
  },
  {
    id: 3,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    year: 2019,
    description: "Panduan stoisisme kuno untuk mental tangguh di era modern. Mengatasi emosi negatif dan hidup lebih damai tanpa kekhawatiran berlebih.",
    image: "/books/filosofi-teras.jpg",
    category: "Self Improvement & Filsafat",
    price: 98000,
    rating: 4.9,
    reviews: 8200
  },
  {
    id: 4,
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    year: 2017,
    description: "Kisah haru perjuangan para aktivis mahasiswa 1998 dan duka mendalam keluarga korban penculikan yang tak kunjung padam.",
    image: "/books/laut-bercerita.jpg",
    category: "Fiksi & Sejarah",
    price: 115000,
    rating: 4.9,
    reviews: 11300
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    year: 2020,
    description: "19 cerita pendek tentang cara manusia memandang uang, kekayaan, keserakahan, dan keputusan emosional dalam kebahagiaan finansial.",
    image: "/books/psychology-of-money.jpg",
    category: "Finansial & Bisnis",
    price: 95000,
    rating: 4.8,
    reviews: 9400
  },
  {
    id: 6,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    year: 1980,
    description: "Masterpiece Tetralogi Buru yang mengisahkan cinta Minke dan Annelies di tengah pergolakan sosial kolonial Hindia Belanda.",
    image: "/books/bumi-manusia.jpg",
    category: "Sastra Klasik Indonesia",
    price: 120000,
    rating: 5.0,
    reviews: 15600
  },
  {
    id: 7,
    title: "Sebuah Seni untuk Bersikap Bodo Amat",
    author: "Mark Manson",
    year: 2016,
    description: "Pendekatan waras dan realistis untuk meraih kehidupan bermakna tanpa harus membebani diri dengan ekspektasi palsu.",
    image: "/books/bodo-amat.jpg",
    category: "Pengembangan Diri",
    price: 88000,
    rating: 4.7,
    reviews: 7900
  },
  {
    id: 8,
    title: "Gadis Kretek",
    author: "Ratih Kumala",
    year: 2012,
    description: "Kisah romansa, rahasia keluarga, dan aroma tembakau kretek legendaris di tanah Jawa yang sarat nilai sejarah dan budaya.",
    image: "/books/gadis-kretek.jpg",
    category: "Drama & Budaya",
    price: 85000,
    rating: 4.8,
    reviews: 6500
  },
  {
    id: 9,
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    description: "Perubahan kecil yang memberikan hasil luar biasa dalam membangun kebiasaan positif dan menghilangkan kebiasaan buruk secara bertahap.",
    image: "/books/atomic-habits.jpg",
    category: "Pengembangan Diri",
    price: 108000,
    rating: 4.9,
    reviews: 18500
  },
  {
    id: 10,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    description: "Panduan praktis prinsip-prinsip penulisan kode perangkat lunak yang bersih, mudah dipelihara, dan berstandar profesional industri.",
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80",
    category: "Teknologi & Pemrograman",
    price: 145000,
    rating: 4.9,
    reviews: 9700
  },
  {
    id: 11,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    year: 2019,
    description: "Wawasan berharga dan filosofi pengembangan software profesional dari pengkodean hingga arsitektur sistem modern.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    category: "Teknologi & Pemrograman",
    price: 155000,
    rating: 4.9,
    reviews: 8800
  },
  {
    id: 12,
    title: "Sapiens: Riwayat Singkat Umat Manusia",
    author: "Yuval Noah Harari",
    year: 2014,
    description: "Penjelajahan mendalam perjalanan evolusi biologis dan peradaban umat manusia dari zaman batu hingga abad modern.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    category: "Fiksi & Sejarah",
    price: 125000,
    rating: 4.8,
    reviews: 14200
  }
];

export default books;
