import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, BedDouble, Bath, Maximize, Building2,
  Home, LandPlot, Building, Phone, Mail, MessageCircle,
  Share2, Heart, Calendar, CheckCircle2, DoorOpen, KeyRound
} from 'lucide-react';
import { MARKETPLACE_API } from '../config';
import { sampleListings } from '../data/sampleListings';
import PropertyCard from '../components/PropertyCard';
import PropertyImage from '../components/PropertyImage';

const typeColors = {
  Location: { bg: '#0ea5e9', label: 'A Louer' },
  Vente: { bg: '#10b981', label: 'A Vendre' },
};

const propertyTypeIcons = {
  Appartement: Building2,
  Villa: Home,
  Terrain: LandPlot,
  Immeuble: Building,
};

function formatPrice(price) {
  if (!price) return 'Prix sur demande';
  return new Intl.NumberFormat('fr-FR').format(price);
}

const s = {
  page: {
    paddingTop: '72px',
    minHeight: '100vh',
    background: '#fafbfc',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    background: '#ffffff',
    color: '#1e1b4b',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '24px',
  },
  imageSection: {
    height: '420px',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
  },
  thumbRow: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    marginBottom: '32px',
    overflowX: 'auto',
  },
  thumb: (active) => ({
    width: '84px',
    height: '64px',
    borderRadius: '10px',
    overflow: 'hidden',
    flexShrink: 0,
    cursor: 'pointer',
    border: active ? '2px solid #2563eb' : '2px solid transparent',
    opacity: active ? 1 : 0.7,
    transition: 'all 0.2s',
  }),
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
    boxShadow: '0 16px 34px rgba(15, 23, 42, 0.06)',
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
    color: '#102a83',
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
    color: '#1e1b4b',
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
    background: '#f7f8ff',
    borderRadius: '14px',
    padding: '18px 16px',
    textAlign: 'center',
    border: '1px solid #f1f3ff',
  },
  detailIcon: {
    color: '#2563eb',
    marginBottom: '8px',
  },
  detailValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#102a83',
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
    color: '#1e1b4b',
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
    boxShadow: '0 16px 34px rgba(15, 23, 42, 0.06)',
  },
  agencyName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e1b4b',
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
    background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s',
    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
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
    border: '1px solid #e5e7eb',
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
    background: 'linear-gradient(90deg, #e5e7eb 25%, #edf2f7 50%, #e5e7eb 75%)',
    borderRadius: '12px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  unitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '14px',
  },
  unitCard: {
    border: '1px solid #f1f3ff',
    borderRadius: '14px',
    overflow: 'hidden',
    background: '#f7f8ff',
  },
  unitImage: {
    height: '110px',
  },
  unitBody: {
    padding: '12px 14px',
  },
  pill: (bg, color) => ({
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: '700',
    padding: '3px 10px',
    borderRadius: '999px',
    background: bg,
    color,
  }),
};

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    fetchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${MARKETPLACE_API}/listings/${id}`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      const item = data.data || data;
      setProperty(item);

      // Fetch similar listings of the same asset type, excluding this one
      try {
        const simRes = await fetch(`${MARKETPLACE_API}/listings?pageSize=4&propertyType=${item.propertyType || ''}`);
        if (simRes.ok) {
          const simData = await simRes.json();
          const items = simData.data || simData.listings || simData.results || [];
          setSimilar(items.filter((p) => String(p.id ?? p._id) !== String(id)).slice(0, 3));
        }
      } catch {
        setSimilar(sampleListings.filter((p) => String(p.id) !== String(id)).slice(0, 3));
      }
    } catch {
      // Fallback to sample data
      const found = sampleListings.find((p) => String(p.id) === String(id));
      setProperty(found || sampleListings[0]);
      setSimilar(sampleListings.filter((p) => String(p.id) !== String(id)).slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={s.page}>
        <div style={s.container}>
          <div style={{ ...s.skeleton, height: '420px', marginBottom: '32px' }} />
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
  const images = Array.isArray(p.images) ? p.images.filter(Boolean) : [];
  const units = Array.isArray(p.units) ? p.units : [];
  const isMultiUnit = (p.totalUnits || 0) > 1 || units.length > 1;
  const availableUnits = p.availableUnits ?? units.filter((u) => String(u.status).toLowerCase() === 'vacant').length;
  const totalUnits = p.totalUnits || units.length;

  const contactHref = p.agencyPhone ? `tel:${p.agencyPhone.replace(/\s+/g, '')}` : undefined;

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Back button */}
        <button
          style={s.backBtn}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f7f8ff';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <ArrowLeft size={18} />
          Retour aux annonces
        </button>

        {/* Hero Image */}
        <div style={s.imageSection}>
          <PropertyImage
            src={images[activeImage]}
            alt={p.title}
            propertyType={p.propertyType}
            seed={p.id}
            iconSize={100}
          />
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

        {/* Thumbnail strip (only when there is more than one photo) */}
        {images.length > 1 && (
          <div style={s.thumbRow}>
            {images.map((img, i) => (
              <div
                key={i}
                style={s.thumb(i === activeImage)}
                onClick={() => setActiveImage(i)}
              >
                <PropertyImage src={img} alt={`${p.title} ${i + 1}`} propertyType={p.propertyType} seed={p.id} iconSize={20} />
              </div>
            ))}
          </div>
        )}
        {images.length <= 1 && <div style={{ marginBottom: '32px' }} />}

        {/* Content Grid */}
        <div style={s.contentGrid} className="detail-content-grid">
          {/* Main Column */}
          <div style={s.mainCol}>
            <div style={s.card}>
              {/* Price */}
              <div style={s.price}>
                {formatPrice(p.price)} <span style={s.priceUnit}>
                  {p.price ? 'XOF' : ''}{p.period ? `/${p.period}` : ''}
                </span>
              </div>

              {/* Title */}
              <h1 style={s.title}>{p.title}</h1>

              {/* Location */}
              <div style={s.location}>
                <MapPin size={16} style={{ color: '#2563eb' }} />
                {p.address || [p.neighborhood, p.city].filter(Boolean).join(', ') || 'Localisation non precisee'}
              </div>

              {/* Details Grid */}
              <div style={s.detailsGrid} className="detail-stats-grid">
                {p.propertyType !== 'Terrain' && !isMultiUnit && (
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
                {isMultiUnit && (
                  <div style={s.detailItem}>
                    <DoorOpen size={22} style={s.detailIcon} />
                    <div style={s.detailValue}>{availableUnits}/{totalUnits}</div>
                    <div style={s.detailLabel}>Appart. disponibles</div>
                  </div>
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

            {/* Available apartments / units, for buildings with more than one unit */}
            {isMultiUnit && units.length > 0 && (
              <div style={s.card}>
                <h3 style={s.sectionTitle}>
                  Appartements ({availableUnits} disponible{availableUnits > 1 ? 's' : ''} sur {totalUnits})
                </h3>
                <div style={s.unitsGrid}>
                  {units.map((u, i) => {
                    const isVacant = String(u.status || '').toLowerCase() === 'vacant';
                    return (
                      <div key={u.id ?? i} style={s.unitCard}>
                        <div style={s.unitImage}>
                          <PropertyImage
                            src={u.picture}
                            alt={u.unitNumber || `Unite ${i + 1}`}
                            propertyType={p.propertyType}
                            seed={(p.id || 0) + i + 1}
                            iconSize={28}
                          />
                        </div>
                        <div style={s.unitBody}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <strong style={{ fontSize: '13px', color: '#1e1b4b' }}>
                              {u.unitNumber || `Unite ${i + 1}`}
                            </strong>
                            <span style={s.pill(
                              isVacant ? 'rgba(16, 185, 129, 0.12)' : 'rgba(100, 116, 139, 0.14)',
                              isVacant ? '#047857' : '#475569'
                            )}>
                              {isVacant ? 'Disponible' : 'Occupe'}
                            </span>
                          </div>
                          {u.rent > 0 && (
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#102a83', marginBottom: '4px' }}>
                              {formatPrice(u.rent)} XOF
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#64748b' }}>
                            {u.bedrooms > 0 && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <BedDouble size={13} /> {u.bedrooms}
                              </span>
                            )}
                            {u.bathrooms > 0 && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <Bath size={13} /> {u.bathrooms}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
                  !isMultiUnit && p.bedrooms ? `Chambres: ${p.bedrooms}` : null,
                  !isMultiUnit && p.bathrooms ? `Salles de bain: ${p.bathrooms}` : null,
                  `Superficie: ${p.area || 'N/A'} m²`,
                  isMultiUnit ? `Appartements: ${availableUnits} disponibles / ${totalUnits}` : null,
                ].filter(Boolean).map((feat, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: '#64748b',
                    padding: '10px 14px',
                    background: '#f7f8ff',
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
                  <Phone size={16} style={{ color: '#2563eb' }} />
                  {p.agencyPhone}
                </div>
              )}
              {p.agencyEmail && (
                <div style={s.agencyInfo}>
                  <Mail size={16} style={{ color: '#2563eb' }} />
                  {p.agencyEmail}
                </div>
              )}

              <a
                href={contactHref}
                style={{ ...s.contactBtn, ...(contactHref ? {} : { pointerEvents: 'none', opacity: 0.6 }) }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(37, 99, 235, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.3)';
                }}
              >
                <MessageCircle size={18} />
                Contacter l'agence
              </a>

              <div style={s.actionBtns}>
                <button
                  style={s.actionBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.color = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <Heart size={16} />
                  Sauvegarder
                </button>
                <button
                  style={s.actionBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.color = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <Share2 size={16} />
                  Partager
                </button>
              </div>
            </div>

            {isMultiUnit && (
              <div style={{ ...s.agencyCard, marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <KeyRound size={18} style={{ color: '#2563eb' }} />
                  <strong style={{ fontSize: '14px', color: '#1e1b4b' }}>Disponibilite</strong>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                  {availableUnits > 0
                    ? `${availableUnits} appartement${availableUnits > 1 ? 's' : ''} disponible${availableUnits > 1 ? 's' : ''} sur ${totalUnits} dans cet immeuble.`
                    : `Tous les ${totalUnits} appartements de cet immeuble sont actuellement occupes.`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Similar Listings */}
        {similar.length > 0 && (
          <div style={s.similarSection}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#102a83',
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
