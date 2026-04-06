import { useNavigate } from 'react-router-dom';
import { BedDouble, Bath, Maximize, LayoutGrid } from 'lucide-react';
import { useState } from 'react';

function formatPrice(price) {
  if (!price) return 'Prix sur demande';
  return new Intl.NumberFormat('fr-FR').format(price);
}

export default function PropertyCard({ property, index = 0 }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const p = property || {};
  const transLabel = p.transactionType === 'Location' ? 'To rent' : 'For sale';

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '14px',
    overflow: 'hidden',
    boxShadow: hovered ? '0 8px 28px rgba(10, 17, 40, 0.12)' : '0 2px 12px rgba(10, 17, 40, 0.06)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
  };

  const imageContainerStyle = {
    height: '220px',
    position: 'relative',
    overflow: 'hidden',
    background: '#c5cdd8',
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
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : null}

        {/* Badges - stacked vertically */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
          {/* Property type badge */}
          <div style={{
            background: '#3b5998',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            padding: '5px 12px',
            borderRadius: '4px',
            textTransform: 'lowercase',
          }}>
            {p.propertyType || 'property'}
          </div>

          {/* Transaction type badge */}
          <div style={{
            background: '#1a2332',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            padding: '5px 12px',
            borderRadius: '4px',
          }}>
            {transLabel}
          </div>

          {/* Price badge */}
          <div style={{
            background: '#e74c3c',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            padding: '5px 12px',
            borderRadius: '4px',
          }}>
            {formatPrice(p.price)}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        borderTop: '1px solid #edf0f4',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {p.propertyType !== 'Terrain' && (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                color: '#64748b',
              }}>
                <BedDouble size={16} style={{ color: '#94a3b8' }} />
                <span style={{ fontWeight: '600', color: '#1a2332' }}>{p.bedrooms || 0}</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
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
            gap: '4px',
            fontSize: '13px',
            color: '#64748b',
          }}>
            <Maximize size={16} style={{ color: '#94a3b8' }} />
            <span style={{ fontWeight: '600', color: '#1a2332' }}>{p.area || 0}</span>
            <span>m²</span>
          </div>
        </div>
        <LayoutGrid size={18} style={{ color: '#94a3b8' }} />
      </div>
    </div>
  );
}
