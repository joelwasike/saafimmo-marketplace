import { useNavigate } from 'react-router-dom';
import { BedDouble, Bath, Maximize, LayoutGrid, DoorOpen } from 'lucide-react';
import { useState } from 'react';
import PropertyImage from './PropertyImage';

function formatPrice(price) {
  if (!price) return 'Prix sur demande';
  return new Intl.NumberFormat('fr-FR').format(price);
}

export default function PropertyCard({ property, index = 0 }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const p = property || {};
  const transLabel = p.transactionType === 'Location' ? 'A louer' : 'A vendre';
  const isMultiUnit = (p.totalUnits || 0) > 1;

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: hovered ? '0 18px 40px rgba(15, 23, 42, 0.1)' : '0 16px 34px rgba(15, 23, 42, 0.06)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
    border: '1px solid #f1f3ff',
  };

  const imageContainerStyle = {
    height: '220px',
    position: 'relative',
    overflow: 'hidden',
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
        <PropertyImage
          src={p.images && p.images[0]}
          alt={p.title}
          propertyType={p.propertyType}
          seed={p.id ?? index}
          style={{ transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />

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
            background: 'rgba(19, 42, 132, 0.85)',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            padding: '5px 12px',
            borderRadius: '6px',
            backdropFilter: 'blur(4px)',
          }}>
            {p.propertyType || 'Propriete'}
          </div>

          {/* Transaction type badge */}
          <div style={{
            background: p.transactionType === 'Location' ? '#0ea5e9' : '#10b981',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            padding: '5px 12px',
            borderRadius: '6px',
          }}>
            {transLabel}
          </div>
        </div>

        {/* Price badge */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: '#ffffff',
          color: '#102a83',
          fontSize: '14px',
          fontWeight: '800',
          padding: '6px 14px',
          borderRadius: '8px',
          boxShadow: '0 6px 16px rgba(15, 23, 42, 0.25)',
        }}>
          {formatPrice(p.price)}{p.price ? ' XOF' : ''}{p.period ? `/${p.period}` : ''}
        </div>

        {/* Available units badge, for buildings with several apartments */}
        {isMultiUnit && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: (p.availableUnits || 0) > 0 ? 'rgba(16, 185, 129, 0.92)' : 'rgba(100, 116, 139, 0.85)',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            padding: '5px 10px',
            borderRadius: '6px',
          }}>
            <DoorOpen size={12} />
            {(p.availableUnits || 0) > 0
              ? `${p.availableUnits} dispo. / ${p.totalUnits}`
              : 'Complet'}
          </div>
        )}
      </div>

      {/* Title */}
      <div style={{ padding: '14px 16px 0' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '700',
          color: '#102a83',
          margin: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {p.title}
        </h3>
        <p style={{
          fontSize: '12px',
          color: '#64748b',
          margin: '4px 0 0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {p.address || [p.neighborhood, p.city].filter(Boolean).join(', ') || 'Localisation non precisee'}
        </p>
      </div>

      {/* Stats Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px 14px',
        marginTop: '10px',
        borderTop: '1px solid #f1f3ff',
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
                <span style={{ fontWeight: '600', color: '#1e1b4b' }}>{p.bedrooms || 0}</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                color: '#64748b',
              }}>
                <Bath size={16} style={{ color: '#94a3b8' }} />
                <span style={{ fontWeight: '600', color: '#1e1b4b' }}>{p.bathrooms || 0}</span>
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
            <span style={{ fontWeight: '600', color: '#1e1b4b' }}>{p.area || 0}</span>
            <span>m²</span>
          </div>
        </div>
        <LayoutGrid size={18} style={{ color: '#94a3b8' }} />
      </div>
    </div>
  );
}
