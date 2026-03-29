import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const tabs = [
  { key: 'all', label: 'Tous' },
  { key: 'Location', label: 'A Louer' },
  { key: 'Vente', label: 'A Vendre' },
  { key: 'Appartement', label: 'Appartements' },
  { key: 'Villa', label: 'Villas' },
  { key: 'Terrain', label: 'Terrains' },
  { key: 'Immeuble', label: 'Immeubles' },
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
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0a1128',
    letterSpacing: '-0.5px',
  },
  count: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#64748b',
    marginLeft: '8px',
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  sortLabel: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '500',
  },
  sortSelect: {
    padding: '8px 14px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    background: '#ffffff',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a2332',
    cursor: 'pointer',
  },
  tabsWrapper: {
    display: 'flex',
    gap: '10px',
    overflowX: 'auto',
    paddingBottom: '4px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  tab: (active) => ({
    padding: '10px 22px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: active ? 'none' : '1px solid #e2e8f0',
    background: active ? 'linear-gradient(135deg, #f4a261 0%, #e76f51 100%)' : '#ffffff',
    color: active ? '#ffffff' : '#1a2332',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.25s',
    boxShadow: active ? '0 4px 12px rgba(244, 162, 97, 0.3)' : 'none',
  }),
};

export default function FilterBar({ activeFilter, onFilterChange, sortBy, onSortChange, totalCount }) {
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
        <div style={styles.sortContainer}>
          <SlidersHorizontal size={16} style={{ color: '#64748b' }} />
          <span style={styles.sortLabel}>Trier par:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="recent">Plus recent</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix decroissant</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabsWrapper} className="filter-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            style={styles.tab(activeFilter === tab.key)}
            onClick={() => onFilterChange(tab.key)}
            onMouseEnter={(e) => {
              if (activeFilter !== tab.key) {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== tab.key) {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <style>{`
        .filter-tabs::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
