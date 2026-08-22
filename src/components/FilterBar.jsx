import { SlidersHorizontal } from 'lucide-react';

const offerTypes = [
  { value: '', label: 'Tous' },
  { value: 'Location', label: 'A louer' },
  { value: 'Vente', label: 'A vendre' },
];

const assetTypes = [
  { value: '', label: 'Tous les biens' },
  { value: 'Appartement', label: 'Appartement' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Immeuble', label: 'Immeuble' },
  { value: 'Terrain', label: 'Terrain' },
];

const styles = {
  wrapper: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 24px 0',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#102a83',
    letterSpacing: '-0.5px',
  },
  count: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#64748b',
    marginLeft: '8px',
  },
  filterRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '16px',
    flexWrap: 'wrap',
    background: '#ffffff',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 16px 34px rgba(15, 23, 42, 0.06)',
    border: '1px solid #e5e7eb',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    minWidth: '180px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  rangeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    background: '#f7f8ff',
    fontSize: '13px',
    fontWeight: '500',
    color: '#1e1b4b',
    width: '100%',
    minWidth: '0',
  },
  separator: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '500',
    flexShrink: 0,
  },
  select: {
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    background: '#f7f8ff',
    fontSize: '13px',
    fontWeight: '500',
    color: '#1e1b4b',
    cursor: 'pointer',
    width: '100%',
    appearance: 'auto',
  },
  clearBtn: {
    padding: '10px 16px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    background: '#f7f8ff',
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};

export default function FilterBar({ filters, onFiltersChange, totalCount, cities = [] }) {
  const handleChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = !!(filters.priceMin || filters.priceMax || filters.offerType || filters.city || filters.propertyType);

  return (
    <div style={styles.wrapper}>
      {/* Title row */}
      <div style={styles.topRow}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <h2 style={styles.title}>Proprietes Disponibles</h2>
          {totalCount > 0 && (
            <span style={styles.count}>({totalCount})</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
          <SlidersHorizontal size={16} />
          <span style={{ fontSize: '13px', fontWeight: '500' }}>Filtres</span>
        </div>
      </div>

      {/* Filter inputs */}
      <div style={styles.filterRow} className="filter-row">
        {/* Price Range */}
        <div style={styles.filterGroup}>
          <span style={styles.label}>Prix (XOF)</span>
          <div style={styles.rangeRow}>
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin || ''}
              onChange={(e) => handleChange('priceMin', e.target.value)}
              style={styles.input}
            />
            <span style={styles.separator}>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax || ''}
              onChange={(e) => handleChange('priceMax', e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Offer Type */}
        <div style={styles.filterGroup}>
          <span style={styles.label}>Transaction</span>
          <select
            value={filters.offerType || ''}
            onChange={(e) => handleChange('offerType', e.target.value)}
            style={styles.select}
          >
            {offerTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Property (asset) type */}
        <div style={styles.filterGroup}>
          <span style={styles.label}>Type de bien</span>
          <select
            value={filters.propertyType || ''}
            onChange={(e) => handleChange('propertyType', e.target.value)}
            style={styles.select}
          >
            {assetTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div style={styles.filterGroup}>
          <span style={styles.label}>Ville</span>
          {cities.length > 0 ? (
            <select
              value={filters.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              style={styles.select}
            >
              <option value="">Toutes les villes</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="Ville ou quartier"
              value={filters.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              style={styles.input}
            />
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            style={styles.clearBtn}
            onClick={() => onFiltersChange({ priceMin: '', priceMax: '', offerType: '', city: '', propertyType: '' })}
          >
            Effacer
          </button>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .filter-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </div>
  );
}
