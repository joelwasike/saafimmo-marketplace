import { useNavigate } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Maximize, Building2, Home, LandPlot, Building } from 'lucide-react';
import { useState } from 'react';

const typeColors = {
  Location: { bg: '#f4a261', text: '#ffffff', label: 'A Louer' },
  Vente: { bg: '#10b981', text: '#ffffff', label: 'A Vendre' },
  Terrain: { bg: '#3b82f6', text: '#ffffff', label: 'Terrain' },
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
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
];

function formatPrice(price) {
  if (!price) return 'Prix sur demande';
  return new Intl.NumberFormat('fr-FR').format(price);
}

export default function PropertyCard({ property, index = 0 }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const p = property || {};
  const transType = p.transactionType || (p.propertyType === 'Terrain' ? 'Terrain' : 'Vente');
  const badge = typeColors[transType] || typeColors.Vente;
  const PropertyIcon = propertyTypeIcons[p.propertyType] || Building2;
  const gradient = gradients[(index || 0) % gradients.length];

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: hovered ? '0 8px 32px rgba(10, 17, 40, 0.14)' : '0 4px 20px rgba(10, 17, 40, 0.08)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
  };

  const imageContainerStyle = {
    height: '240px',
    position: 'relative',
    overflow: 'hidden',
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/property/${p.id}`)}
      className="animate-fade-in"
    >
      {/* Image / Placeholder */}
      <div style={imageContainerStyle}>
        {p.images && p.images.length > 0 ? (
          <img
            src={p.images[0]}
            alt={p.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        ) : (
          <PropertyIcon
            size={64}
            style={{ color: 'rgba(255,255,255,0.3)' }}
          />
        )}

        {/* Badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          background: badge.bg,
          color: badge.text,
          fontSize: '12px',
          fontWeight: '700',
          padding: '6px 14px',
          borderRadius: '8px',
          letterSpacing: '0.3px',
          textTransform: 'uppercase',
        }}>
          {badge.label}
        </div>

        {/* Property type badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: '600',
          padding: '5px 10px',
          borderRadius: '6px',
        }}>
          {p.propertyType || 'Propriete'}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {/* Price */}
        <div style={{
          fontSize: '22px',
          fontWeight: '800',
          color: '#0a1128',
          marginBottom: '6px',
          letterSpacing: '-0.3px',
        }}>
          {formatPrice(p.price)} <span style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#64748b',
          }}>
            XOF{p.period ? `/${p.period}` : ''}
          </span>
        </div>

        {/* Title */}
        <div style={{
          fontSize: '15px',
          fontWeight: '600',
          color: '#1a2332',
          marginBottom: '8px',
          lineHeight: '1.4',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {p.title || 'Propriete immobiliere'}
        </div>

        {/* Location */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: '#64748b',
          marginBottom: '16px',
        }}>
          <MapPin size={14} style={{ color: '#f4a261', flexShrink: 0 }} />
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {p.address || `${p.neighborhood || ''}, ${p.city || ''}`}
          </span>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: '#f1f5f9',
          marginBottom: '14px',
        }} />

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
          {p.propertyType !== 'Terrain' && (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: '#64748b',
              }}>
                <BedDouble size={16} style={{ color: '#94a3b8' }} />
                <span style={{ fontWeight: '600', color: '#1a2332' }}>{p.bedrooms || 0}</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: '#64748b',
              }}>
                <Bath size={16} style={{ color: '#94a3b8' }} />
                <span style={{ fontWeight: '600', color: '#1a2332' }}>{p.bathrooms || 0}</span>
              </div>
            </>
          )}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#64748b',
          }}>
            <Maximize size={16} style={{ color: '#94a3b8' }} />
            <span style={{ fontWeight: '600', color: '#1a2332' }}>{p.area || 0}</span>
            <span>m²</span>
          </div>
        </div>

        {/* Agency */}
        {p.agencyName && (
          <div style={{
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: '1px solid #f1f5f9',
            fontSize: '12px',
            color: '#94a3b8',
            fontWeight: '500',
          }}>
            {p.agencyName}
          </div>
        )}
      </div>
    </div>
  );
}
