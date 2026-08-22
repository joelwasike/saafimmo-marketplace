import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { MARKETPLACE_API } from '../config';

const styles = {
  hero: {
    minHeight: '70vh',
    background: 'linear-gradient(135deg, #132a84 0%, #0f1f60 55%, #1e1b4b 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '72px',
    padding: '120px 24px 60px',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 30% 50%, rgba(37, 99, 235, 0.18) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  particles: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(2px 2px at 10% 20%, rgba(255,255,255,0.15), transparent),
      radial-gradient(2px 2px at 80% 30%, rgba(255,255,255,0.1), transparent),
      radial-gradient(2px 2px at 40% 70%, rgba(255,255,255,0.12), transparent),
      radial-gradient(2px 2px at 90% 80%, rgba(255,255,255,0.08), transparent),
      radial-gradient(3px 3px at 60% 10%, rgba(56, 189, 248, 0.25), transparent),
      radial-gradient(2px 2px at 20% 90%, rgba(56, 189, 248, 0.18), transparent)
    `,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  tagline: {
    display: 'inline-block',
    background: 'rgba(56, 189, 248, 0.15)',
    color: '#7dd3fc',
    fontSize: '13px',
    fontWeight: '700',
    padding: '8px 20px',
    borderRadius: '100px',
    marginBottom: '24px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    border: '1px solid rgba(56, 189, 248, 0.25)',
  },
  heading: {
    fontSize: '52px',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.15',
    marginBottom: '16px',
    letterSpacing: '-1.5px',
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.65)',
    marginBottom: '40px',
    fontWeight: '400',
    lineHeight: '1.6',
  },
  searchContainer: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
  },
  inputGroup: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    borderRight: '1px solid #e5e7eb',
  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: '#1e1b4b',
    background: 'transparent',
    width: '100%',
    fontWeight: '500',
  },
  select: {
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: '#1e1b4b',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: '500',
    padding: '10px 12px',
    flex: 1,
    minWidth: '0',
  },
  searchBtn: {
    background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
    border: 'none',
    borderRadius: '14px',
    padding: '14px 28px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s',
    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.4)',
  },
  statsBar: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
    gap: '48px',
    flexWrap: 'wrap',
  },
  stat: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '-0.5px',
  },
  statLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '500',
    marginTop: '2px',
  },
};

export default function HeroSection({ onSearch }) {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${MARKETPLACE_API}/stats`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setStats(data))
      .catch(() => {});
  }, []);

  const handleSearch = () => {
    onSearch({ location, propertyType, transactionType });
  };

  const rentCount = stats?.byPropertyType?.['For Rent'] || 0;
  const saleCount = stats?.byPropertyType?.['For Sale'] || 0;
  const cityCount = stats?.byCity ? Object.keys(stats.byCity).length : 0;

  const statItems = stats ? [
    { number: `${stats.totalListings || 0}+`, label: 'Proprietes' },
    { number: `${rentCount}`, label: 'A louer' },
    { number: `${saleCount}`, label: 'A vendre' },
    ...(cityCount > 0 ? [{ number: `${cityCount}`, label: 'Villes' }] : []),
  ] : [];

  return (
    <section style={styles.hero}>
      <div style={styles.overlay} />
      <div style={styles.particles} />

      <div style={styles.content}>
        <div style={styles.tagline}>
          Marketplace Immobilier N&deg;1
        </div>

        <h1 style={styles.heading} className="hero-heading">
          Trouvez votre bien<br />immobilier ideal
        </h1>

        <p style={styles.subtitle}>
          Parcourez des proprietes verifiees a travers la Cote d'Ivoire
        </p>

        {/* Search Bar */}
        <div style={styles.searchContainer} className="search-container">
          <div style={styles.inputGroup} className="search-input-group">
            <MapPin size={18} style={{ color: '#2563eb', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Ville, quartier..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={styles.input}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div className="search-select-group" style={{ flex: 1, borderRight: '1px solid #e5e7eb' }}>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              style={styles.select}
            >
              <option value="">Type de bien</option>
              <option value="Appartement">Appartement</option>
              <option value="Villa">Villa</option>
              <option value="Terrain">Terrain</option>
              <option value="Immeuble">Immeuble</option>
            </select>
          </div>

          <div className="search-select-group" style={{ flex: 1 }}>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              style={styles.select}
            >
              <option value="">Transaction</option>
              <option value="Location">Location</option>
              <option value="Vente">Vente</option>
            </select>
          </div>

          <button
            style={styles.searchBtn}
            onClick={handleSearch}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(37, 99, 235, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.4)';
            }}
          >
            <Search size={18} />
            <span className="search-btn-text">Rechercher</span>
          </button>
        </div>

        {/* Stats (live counts from the marketplace API) */}
        {statItems.length > 0 && (
          <div style={styles.statsBar} className="stats-bar">
            {statItems.map((stat) => (
              <div key={stat.label} style={styles.stat}>
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-heading {
            font-size: 32px !important;
            letter-spacing: -0.8px !important;
          }
          .search-container {
            flex-direction: column !important;
            border-radius: 16px !important;
            padding: 12px !important;
          }
          .search-input-group {
            border-right: none !important;
            border-bottom: 1px solid #e5e7eb;
            width: 100%;
          }
          .search-select-group {
            border-right: none !important;
            border-bottom: 1px solid #e5e7eb;
            width: 100%;
          }
          .search-container button {
            width: 100%;
            justify-content: center;
            margin-top: 4px;
          }
          .stats-bar {
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
