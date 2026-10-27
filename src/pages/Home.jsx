import React from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';

/**
 * Home - Kategori Elemen Halaman (Page Element)
 * Menampilkan Hero Section (buku unggulan Atomic Habits) dan Katalog Produk Lengkap.
 */
function Home() {
  const scrollToProducts = () => {
    const el = document.getElementById('product-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Hero onExploreClick={scrollToProducts} />
      <ProductList />
    </>
  );
}

export default Home;
