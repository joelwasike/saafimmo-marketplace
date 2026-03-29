import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, BedDouble, Bath, Maximize, Building2,
  Home, LandPlot, Building, Phone, Mail, MessageCircle,
  Share2, Heart, Calendar, CheckCircle2
} from 'lucide-react';
import { MARKETPLACE_API } from '../config';
import { sampleListings } from '../data/sampleListings';
import PropertyCard from '../components/PropertyCard';

const typeColors = {
  Location: { bg: '#f4a261', label: 'A Louer' },
  Vente: { bg: '#10b981', label: 'A Vendre' },
};

const propertyTypeIcons = {
  Appartement: Building2,
  Villa: Home,
  Terrain: LandPlot,
  Immeuble: Building,
};

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
];

function formatPrice(price) {
  if (!price) return 'Prix sur demande';
  return new Intl.NumberFormat('fr-FR').format(price);
}

const s = {
  page: {
    paddingTop: '72px',
    minHeight: '100vh',
    background: '#f8fafc',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    background: '#ffffff',
    color: '#1a2332',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '24px',
  },
  imageSection: {
    height: '400px',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '32px',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 24px 64px',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '32px',
    alignItems: 'start',
  },
  mainCol: {},
  sideCol: {
    position: 'sticky',
    top: '104px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(10, 17, 40, 0.08)',
    marginBottom: '24px',
  },
  badge: (color) => ({
    display: 'inline-block',
    background: color || '#10b981',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 16px',
    borderRadius: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  }),
  price: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#0a1128',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  },
  priceUnit: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#64748b',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a2332',
    marginBottom: '8px',
    lineHeight: '1.3',
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '15px',
    color: '#64748b',
    marginBottom: '24px',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  detailItem: {
    background: '#f8fafc',
    borderRadius: '14px',
    padding: '18px 16px',
    textAlign: 'center',
    border: '1px solid #f1f5f9',
  },
  detailIcon: {
    color: '#f4a261',
    marginBottom: '8px',
  },
  detailValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0a1128',
  },
  detailLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '500',
    marginTop: '2px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a2332',
    marginBottom: '14px',
  },
  description: {
    fontSize: '15px',
    color: '#64748b',
    lineHeight: '1.8',
    marginBottom: '32px',
  },
  agencyCard: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(10, 17, 40, 0.08)',
  },
  agencyName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a2332',
    marginBottom: '16px',
  },
  agencyInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '12px',
  },
  contactBtn: {
    width: '100%',
    padding: '14px',
    borderRadius: '14px',
    border: 'none',
    background: 'linear-gradient(135deg, #f4a261 0%, #e76f51 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s',
    boxShadow: '0 4px 16px rgba(244, 162, 97, 0.3)',
    marginTop: '20px',
  },
  actionBtns: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
  },
  actionBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    background: '#ffffff',
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
  similarSection: {
    marginTop: '64px',
  },
  similarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '28px',
  },
  skeleton: {
    background: 'linear-gradient(90deg, #e2e8f0 25%, #edf2f7 50%, #e2e8f0 75%)',
    borderRadius: '12px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${MARKETPLACE_API}/listings/${id}`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      const item = data.data || data;
      setProperty(item);

      // Fetch similar
      try {
        const simRes = await fetch(`${MARKETPLACE_API}/listings?pageSize=3&propertyType=${item.propertyType || ''}`);
        if (simRes.ok) {
          const simData = await simRes.json();
          const items = simData.data || simData.listings || simData.results || simData || [];
          setSimilar(items.filter((p) => (p.id || p._id) !== id).slice(0, 3));
        }
      } catch {
        setSimilar(sampleListings.filter((p) => p.id !== id).slice(0, 3));
      }
    } catch {
      // Fallback to sample data
      const found = sampleListings.find((p) => p.id === id);
      setProperty(found || sampleListings[0]);
      setSimilar(sampleListings.filter((p) => p.id !== id).slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={s.page}>
        <div style={s.container}>
          <div style={{ ...s.skeleton, height: '400px', marginBottom: '32px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
            <div>
              <div style={{ ...s.skeleton, height: '24px', width: '120px', marginBottom: '16px' }} />
              <div style={{ ...s.skeleton, height: '36px', width: '250px', marginBottom: '12px' }} />
              <div style={{ ...s.skeleton, height: '20px', width: '350px', marginBottom: '32px' }} />
              <div style={{ ...s.skeleton, height: '200px', marginBottom: '32px' }} />
            </div>
            <div>
              <div style={{ ...s.skeleton, height: '300px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) return null;

  const p = property;
  const transType = p.transactionType || 'Vente';
  const badgeInfo = typeColors[transType] || typeColors.Vente;
  const PropertyIcon = propertyTypeIcons[p.propertyType] || Building2;
  const gradient = gradients[parseInt(p.id || '0') % gradients.length];

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Back button */}
        <button
          style={s.backBtn}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          <ArrowLeft size={18} />
          Retour aux annonces
        </button>

        {/* Hero Image */}
        <div style={{
          ...s.imageSection,
          background: p.images && p.images.length > 0 ? 'none' : gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {p.images && p.images.length > 0 ? (
            <img
              src={p.images[0]}
              alt={p.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <PropertyIcon size={100} style={{ color: 'rgba(255,255,255,0.2)' }} />
          )}
          {/* Badge overlay */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            ...s.badge(badgeInfo.bg),
            marginBottom: 0,
          }}>
            {badgeInfo.label}
          </div>
        </div>

        {/* Content Grid */}
        <div style={s.contentGrid} className="detail-content-grid">
          {/* Main Column */}
          <div style={s.mainCol}>
            <div style={s.card}>
              {/* Price */}
              <div style={s.price}>
                {formatPrice(p.price)} <span style={s.priceUnit}>
                  XOF{p.period ? `/${p.period}` : ''}
                </span>
              </div>

              {/* Title */}
              <h1 style={s.title}>{p.title}</h1>

              {/* Location */}
              <div style={s.location}>
                <MapPin size={16} style={{ color: '#f4a261' }} />
                {p.address || `${p.neighborhood || ''}, ${p.city || ''}`}
              </div>

              {/* Details Grid */}
              <div style={s.detailsGrid} className="detail-stats-grid">
                {p.propertyType !== 'Terrain' && (
                  <>
                    <div style={s.detailItem}>
                      <BedDouble size={22} style={s.detailIcon} />
                      <div style={s.detailValue}>{p.bedrooms || 0}</div>
                      <div style={s.detailLabel}>Chambres</div>
                    </div>
                    <div style={s.detailItem}>
                      <Bath size={22} style={s.detailIcon} />
                      <div style={s.detailValue}>{p.bathrooms || 0}</div>
                      <div style={s.detailLabel}>Salles de bain</div>
                    </div>
                  </>
                )}
                <div style={s.detailItem}>
                  <Maximize size={22} style={s.detailIcon} />
                  <div style={s.detailValue}>{p.area || 0}</div>
                  <div style={s.detailLabel}>Superficie (m²)</div>
                </div>
                <div style={s.detailItem}>
                  <PropertyIcon size={22} style={s.detailIcon} />
                  <div style={s.detailValue} className="detail-type-value">{p.propertyType}</div>
                  <div style={s.detailLabel}>Type</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={s.card}>
              <h3 style={s.sectionTitle}>Description</h3>
              <p style={s.description}>
                {p.description || 'Aucune description disponible pour cette propriete.'}
              </p>

              {/* Date */}
              {p.createdAt && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#94a3b8',
                }}>
                  <Calendar size={14} />
                  Publiee le {new Date(p.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              )}
            </div>

            {/* Features */}
            <div style={s.card}>
              <h3 style={s.sectionTitle}>Caracteristiques</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
              }}>
                {[
                  `Type: ${p.propertyType || 'N/A'}`,
                  `Transaction: ${p.transactionType || 'N/A'}`,
                  `Ville: ${p.city || 'N/A'}`,
                  `Quartier: ${p.neighborhood || 'N/A'}`,
                  p.bedrooms ? `Chambres: ${p.bedrooms}` : null,
                  p.bathrooms ? `Salles de bain: ${p.bathrooms}` : null,
                  `Superficie: ${p.area || 'N/A'} m²`,
                ].filter(Boolean).map((feat, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: '#64748b',
                    padding: '10px 14px',
                    background: '#f8fafc',
                    borderRadius: '10px',
                  }}>
                    <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Column */}
          <div style={s.sideCol}>
            {/* Agency Card */}
            <div style={s.agencyCard}>
              <h3 style={s.agencyName}>{p.agencyName || 'Agence Immobiliere'}</h3>

              {p.agencyPhone && (
                <div style={s.agencyInfo}>
                  <Phone size={16} style={{ color: '#f4a261' }} />
                  {p.agencyPhone}
                </div>
              )}
              {p.agencyEmail && (
                <div style={s.agencyInfo}>
                  <Mail size={16} style={{ color: '#f4a261' }} />
                  {p.agencyEmail}
                </div>
              )}

              <button
                style={s.contactBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(244, 162, 97, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(244, 162, 97, 0.3)';
                }}
              >
                <MessageCircle size={18} />
                Contacter l'agence
              </button>

              <div style={s.actionBtns}>
                <button
                  style={s.actionBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#f4a261';
                    e.currentTarget.style.color = '#f4a261';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <Heart size={16} />
                  Sauvegarder
                </button>
                <button
                  style={s.actionBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#f4a261';
                    e.currentTarget.style.color = '#f4a261';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <Share2 size={16} />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings */}
        {similar.length > 0 && (
          <div style={s.similarSection}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#0a1128',
              marginBottom: '28px',
              letterSpacing: '-0.5px',
            }}>
              Proprietes similaires
            </h2>
            <div style={s.similarGrid} className="similar-grid">
              {similar.map((item, index) => (
                <PropertyCard
                  key={item.id || item._id || index}
                  property={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-content-grid {
            grid-template-columns: 1fr !important;
          }
          .detail-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .similar-grid {
            grid-template-columns: 1fr !important;
          }
          .detail-type-value {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
