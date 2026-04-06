import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const cities = [
  'Cocody', 'Plateau', 'Marcory', 'Treichville', 'Yopougon',
  'Abobo', 'Adjame', 'Koumassi', 'Port-Bouet', 'Bingerville',
  'Bassam', 'Bouake', 'San Pedro', 'Yamoussoukro',
];

const offerTypes = [
  { value: '', label: 'All' },
  { value: 'Location', label: 'To Rent' },
  { value: 'Vente', label: 'For Sale' },
];

const styles = {
  wrapper: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px 24px 0',
  },
  filterRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '16px',
    flexWrap: 'wrap',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px 24px',
    boxShadow: '0 2px 12px rgba(10, 17, 40, 0.06)',
    border: '1px solid #e2e8f0',
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
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    fontSize: '13px',
    fontWeight: '500',
    color: '#1a2332',
    width: '100%',
    minWidth: '0',
    fontStyle: 'italic',
  },
  separator: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '500',
    flexShrink: 0,
  },
  select: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    fontSize: '13px',
    fontWeight: '500',
    color: '#1a2332',
    cursor: 'pointer',
    width: '100%',
    appearance: 'auto',
  },
};

export default function FilterBar({ filters, onFiltersChange }) {
  const handleChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.filterRow} className="filter-row">
        {/* Price Range */}
        <div style={styles.filterGroup}>
          <span style={styles.label}>Price (CFA)</span>
          <div style={styles.rangeRow}>
            <input
              type="number"
              placeholder="0 fcfa"
              value={filters.priceMin || ''}
              onChange={(e) => handleChange('priceMin', e.target.value)}
              style={styles.input}
            />
            <span style={styles.separator}>-</span>
            <input
              type="number"
              placeholder="500000"
              value={filters.priceMax || ''}
              onChange={(e) => handleChange('priceMax', e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Offer Type */}
        <div style={styles.filterGroup}>
          <span style={styles.label}>Offer Type</span>
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

        {/* City */}
        <div style={styles.filterGroup}>
          <span style={styles.label}>City</span>
          <select
            value={filters.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            style={styles.select}
          >
            <option value="">City</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Area (m²) Range */}
        <div style={styles.filterGroup}>
          <span style={styles.label}>Area (m²)</span>
          <div style={styles.rangeRow}>
            <input
              type="number"
              placeholder="0 m²"
              value={filters.areaMin || ''}
              onChange={(e) => handleChange('areaMin', e.target.value)}
              style={styles.input}
            />
            <span style={styles.separator}>-</span>
            <input
              type="number"
              placeholder="500"
              value={filters.areaMax || ''}
              onChange={(e) => handleChange('areaMax', e.target.value)}
              style={styles.input}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .filter-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}
