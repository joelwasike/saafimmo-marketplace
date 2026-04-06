import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: '#ffffff',
    borderBottom: '2px solid #1a2332',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '26px',
    fontWeight: '900',
    color: '#1a2332',
    letterSpacing: '-0.5px',
    textDecoration: 'none',
  },
  logoAccent: {
    color: '#1a2332',
    fontWeight: '400',
    fontStyle: 'italic',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  navLink: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1a2332',
    transition: 'color 0.2s',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  langToggle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a2332',
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  postBtn: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    background: '#e76f51',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  mobileMenu: {
    position: 'fixed',
    top: '64px',
    left: 0,
    right: 0,
    background: '#ffffff',
    boxShadow: '0 8px 32px rgba(10, 17, 40, 0.1)',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    zIndex: 999,
  },
  mobileNavLink: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1a2332',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0',
    textDecoration: 'none',
  },
  mobilePostBtn: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: '#e76f51',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 24px',
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: '8px',
  },
};

const navLinks = [
  { label: 'Home', path: '/' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          SAAF <span style={styles.logoAccent}>IMMO</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              style={styles.navLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={styles.actions} className="desktop-actions">
          <button
            style={styles.langToggle}
            onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
          >
            {lang}
          </button>
          <button
            style={styles.postBtn}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
            }}
          >
            Post an ad
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-hamburger"
          style={{
            background: 'none',
            border: 'none',
            color: '#1a2332',
            cursor: 'pointer',
            padding: '4px',
            display: 'none',
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={styles.mobileMenu} className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              style={styles.mobileNavLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button style={styles.mobilePostBtn}>
            Post an ad
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-actions { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </header>
  );
}
