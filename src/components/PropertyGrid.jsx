import PropertyCard from './PropertyCard';
import Skeleton from './Skeleton';
import { SearchX, RefreshCw } from 'lucide-react';

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 24px 48px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '28px',
  },
  loadMoreWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '48px',
  },
  loadMoreBtn: {
    padding: '14px 40px',
    borderRadius: '14px',
    border: '2px solid #e2e8f0',
    background: '#ffffff',
    color: '#1a2332',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 24px',
    gridColumn: '1 / -1',
  },
  emptyIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a2332',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '15px',
    color: '#64748b',
    maxWidth: '400px',
    margin: '0 auto',
  },
};

export default function PropertyGrid({ listings, loading, hasMore, onLoadMore, loadingMore }) {
  return (
    <div style={styles.container}>
      <div style={styles.grid} className="property-grid">
        {loading ? (
          <Skeleton count={6} />
        ) : listings.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <SearchX size={36} style={{ color: '#94a3b8' }} />
            </div>
            <h3 style={styles.emptyTitle}>Aucune propriete trouvee</h3>
            <p style={styles.emptyText}>
              Essayez de modifier vos filtres ou votre recherche pour trouver plus de resultats.
            </p>
          </div>
        ) : (
          listings.map((property, index) => (
            <PropertyCard
              key={property.id || index}
              property={property}
              index={index}
            />
          ))
        )}
      </div>

      {!loading && listings.length > 0 && hasMore && (
        <div style={styles.loadMoreWrapper}>
          <button
            style={styles.loadMoreBtn}
            onClick={onLoadMore}
            disabled={loadingMore}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f4a261';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#f4a261';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(244, 162, 97, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#1a2332';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {loadingMore ? (
              <>
                <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Chargement...
              </>
            ) : (
              'Voir plus de proprietes'
            )}
          </button>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          .property-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .property-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
