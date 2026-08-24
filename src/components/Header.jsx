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
    boxShadow: '0 12px 32px rgba(18, 36, 104, 0.08)',
    transition: 'all 0.3s ease',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '72px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    fontSize: '24px',
    fontWeight: '800',
    color: '#102a83',
    letterSpacing: '-0.5px',
  },
  logoDot: {
    color: '#2563eb',
    fontSize: '28px',
    lineHeight: 1,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  navLink: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1e1b4b',
    transition: 'color 0.2s',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  navLinkHover: {
    color: '#2563eb',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  langToggle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#102a83',
    background: '#f1f3ff',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  postBtn: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 2px 10px rgba(37, 99, 235, 0.3)',
  },
  hamburger: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#1e1b4b',
    cursor: 'pointer',
    padding: '4px',
  },
  mobileMenu: {
    position: 'fixed',
    top: '72px',
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
    color: '#1e1b4b',
    padding: '12px 0',
    borderBottom: '1px solid #e5e7eb',
  },
  mobilePostBtn: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
    border: 'none',
    borderRadius: '10px',
    padding: '14px 24px',
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: '8px',
  },
};

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Acheter', path: '/?type=Vente' },
  { label: 'Louer', path: '/?type=Location' },
  { label: 'Terrains', path: '/?type=Terrain' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState('FR');
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Saaf<span style={{ color: '#2563eb' }}>Immo</span>
          <span style={styles.logoDot}>.</span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          ...styles.nav,
          '@media (max-width: 768px)': { display: 'none' },
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
               className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                style={{
                  ...styles.navLink,
                  ...(hoveredLink === link.label ? styles.navLinkHover : {}),
                }}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div style={styles.actions} className="desktop-actions">
          <button
            style={styles.langToggle}
            onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
          >
            {lang}
          </button>
          <a
            href="https://app.hubimmo.ci/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.postBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(37, 99, 235, 0.3)';
            }}
          >
            Login / Register
          </a>
          <button
            style={{
              ...styles.hamburger,
              display: 'none',
            }}
            className="hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile hamburger - shown via CSS */}
        <button
          className="mobile-hamburger"
          style={{
            background: 'none',
            border: 'none',
            color: '#1e1b4b',
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
          <a
            href="https://app.hubimmo.ci/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mobilePostBtn}
            onClick={() => setMobileOpen(false)}
          >
            Login / Register
          </a>
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
