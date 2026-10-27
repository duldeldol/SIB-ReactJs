import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['home', 'team', 'contact'].includes(hash)) return hash;
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam && ['home', 'team', 'contact'].includes(pageParam.toLowerCase())) {
      return pageParam.toLowerCase();
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash = page;
  };

  const scrollToProducts = () => {
    const el = document.getElementById('product-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar Section */}
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      {/* Main Content Area based on active navigation */}
      <main className="flex-grow-1">
        {activePage === 'home' && (
          <>
            <Hero onExploreClick={scrollToProducts} />
            <ProductList />
          </>
        )}

        {activePage === 'team' && <Team />}

        {activePage === 'contact' && <Contact />}
      </main>

      {/* Footer Section */}
      <Footer setActivePage={handlePageChange} />
    </div>
  );
}

export default App;
