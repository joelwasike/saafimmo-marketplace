import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: '#ffffff',
    boxShadow: '0 1px 12px rgba(10, 17, 40, 0.06)',
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
    color: '#0a1128',
    letterSpacing: '-0.5px',
  },
  logoDot: {
    color: '#f4a261',
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
    color: '#1a2332',
    transition: 'color 0.2s',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  navLinkHover: {
    color: '#f4a261',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  langToggle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
    background: '#f1f5f9',
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
    background: 'linear-gradient(135deg, #f4a261 0%, #e76f51 100%)',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 2px 10px rgba(244, 162, 97, 0.3)',
  },
  hamburger: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#1a2332',
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
    color: '#1a2332',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0',
  },
  mobilePostBtn: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #f4a261 0%, #e76f51 100%)',
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
          Saaf<span style={{ color: '#f4a261' }}>Immo</span>
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
          <button
            style={styles.postBtn}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 16px rgba(244, 162, 97, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 10px rgba(244, 162, 97, 0.3)';
            }}
          >
            Publier une annonce
          </button>
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
            Publier une annonce
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
