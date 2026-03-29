const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(10, 17, 40, 0.08)',
  },
  imagePlaceholder: {
    height: '240px',
    background: 'linear-gradient(90deg, #e2e8f0 25%, #edf2f7 50%, #e2e8f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  content: {
    padding: '20px',
  },
  line: (width, height = '14px', mb = '12px') => ({
    width,
    height,
    borderRadius: '6px',
    background: 'linear-gradient(90deg, #e2e8f0 25%, #edf2f7 50%, #e2e8f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'pulse 1.5s ease-in-out infinite',
    marginBottom: mb,
  }),
  row: {
    display: 'flex',
    gap: '16px',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #f1f5f9',
  },
};

export default function Skeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={styles.card}>
          <div style={styles.imagePlaceholder} />
          <div style={styles.content}>
            <div style={styles.line('40%', '12px')} />
            <div style={styles.line('60%', '20px')} />
            <div style={styles.line('80%', '14px')} />
            <div style={styles.line('50%', '12px', '0')} />
            <div style={styles.row}>
              <div style={styles.line('25%', '12px', '0')} />
              <div style={styles.line('25%', '12px', '0')} />
              <div style={styles.line('25%', '12px', '0')} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
