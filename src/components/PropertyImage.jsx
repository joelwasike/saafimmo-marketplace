import { useState } from 'react';
import { Building2, Home, LandPlot, Building } from 'lucide-react';

// Icon shown inside the placeholder when a listing has no usable photo yet.
const propertyTypeIcons = {
  Appartement: Building2,
  Villa: Home,
  Terrain: LandPlot,
  Immeuble: Building,
};

// A handful of on-brand gradients (indigo family, same as the dashboard sidebar/hero)
// so placeholders feel designed rather than "broken image".
const gradients = [
  'linear-gradient(135deg, #132a84 0%, #2563eb 100%)',
  'linear-gradient(135deg, #0f1f60 0%, #0ea5e9 100%)',
  'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
  'linear-gradient(135deg, #132a84 0%, #7c3aed 100%)',
];

function gradientFor(seed) {
  const n = Math.abs(Number(seed) || 0);
  return gradients[n % gradients.length];
}

/**
 * Renders a listing photo, falling back to a themed gradient + icon placeholder when
 * there is no image (most listings today, since bulk-imported/legacy properties were
 * never photographed) or the image URL fails to load (broken/expired link).
 */
export default function PropertyImage({ src, alt, propertyType, seed, style, iconSize = 56 }) {
  const [failed, setFailed] = useState(false);
  const Icon = propertyTypeIcons[propertyType] || Building2;

  if (!src || failed) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: gradientFor(seed),
          ...style,
        }}
      >
        <Icon size={iconSize} style={{ color: 'rgba(255,255,255,0.35)' }} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
    />
  );
}
