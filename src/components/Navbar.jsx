import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    // Set initial theme based on localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path) => {
    return location.pathname === path ? 'active text-cyan' : '';
  };

  return (
    <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '1rem 0' }}>
      <div className="container flex justify-between items-center" style={{ position: 'relative' }}>
        <Link to="/" className="flex items-center gap-4 text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
          <GraduationCap size={32} color="var(--accent-cyan)" />
          BeaSite
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" className={isActive('/')}>Beranda</Link>
          <Link to="/scholarships" className={isActive('/scholarships')}>Daftar Beasiswa</Link>
          <button onClick={toggleTheme} className="btn-icon" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} color="var(--text-primary)" /> : <Moon size={20} color="var(--text-primary)" />}
          </button>
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', color: 'white' }}>Login</Link>
        </div>

        {/* Mobile Nav Buttons */}
        <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={toggleTheme} className="btn-icon" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} color="var(--text-primary)" /> : <Moon size={20} color="var(--text-primary)" />}
          </button>
          <button
            className="btn btn-outline"
            style={{ padding: '0.5rem', display: 'flex', color: 'var(--text-primary)' }}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* CSS for responsive display */}
        <style>{`
          .btn-icon {
            background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0.5rem; border-radius: 50%; transition: background-color 0.3s;
          }
          .btn-icon:hover { background-color: var(--accent-cyan-light); }
          @media (min-width: 769px) {
            .mobile-only { display: none !important; }
            .desktop-only { display: flex !important; }
          }
          @media (max-width: 768px) {
            .desktop-only { display: none !important; }
            .mobile-only { display: flex !important; }
          }
          .mobile-menu {
            position: absolute; top: calc(100% + 1rem); left: 0; right: 0;
            background: var(--bg-secondary);
            padding: 1.5rem; border-bottom: 1px solid var(--border-color);
            display: flex; flex-direction: column; gap: 1.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
        `}</style>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu" style={{ zIndex: 40 }}>
          <Link to="/" onClick={toggleMenu} className={isActive('/')} style={{ fontSize: '1.1rem', fontWeight: 500 }}>Beranda</Link>
          <Link to="/scholarships" onClick={toggleMenu} className={isActive('/scholarships')} style={{ fontSize: '1.1rem', fontWeight: 500 }}>Daftar Beasiswa</Link>
          <Link to="/login" onClick={toggleMenu} className="btn btn-primary" style={{ color: 'white', textAlign: 'center', marginTop: '0.5rem' }}>Login</Link>
        </div>
      )}
    </nav>
  );
}
