import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Utilitas router untuk mereset posisi scroll ke bagian atas layar
 * setiap kali pengguna berpindah rute URL, atau scroll ke ID jika terdapat hash.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
