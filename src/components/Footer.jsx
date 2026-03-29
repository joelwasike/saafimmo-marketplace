import { Link } from 'react-router-dom';
import { Globe, Link2, MessageCircle, Share2, MapPin, Phone, Mail, Send } from 'lucide-react';
import { useState } from 'react';

const styles = {
  footer: {
    background: '#0a1128',
    color: '#cbd5e1',
    paddingTop: '64px',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '40px',
    paddingBottom: '48px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '16px',
    display: 'inline-block',
  },
  description: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#94a3b8',
    marginBottom: '24px',
  },
  socialRow: {
    display: 'flex',
    gap: '12px',
  },
  socialIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94a3b8',
    transition: 'all 0.3s',
    cursor: 'pointer',
    border: 'none',
  },
  colTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '20px',
  },
  linkItem: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '12px',
    display: 'block',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '14px',
    fontSize: '14px',
    color: '#94a3b8',
  },
  contactIcon: {
    color: '#f4a261',
    flexShrink: 0,
    marginTop: '2px',
  },
  newsletterInput: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontSize: '14px',
    marginBottom: '12px',
  },
  newsletterBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #f4a261 0%, #e76f51 100%)',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s',
  },
  bottomBar: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '20px 0',
  },
  bottomInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  copyright: {
    fontSize: '13px',
    color: '#64748b',
  },
  legalLinks: {
    display: 'flex',
    gap: '24px',
  },
  legalLink: {
    fontSize: '13px',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
};

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid} className="footer-grid">
          {/* Col 1: Logo & Description */}
          <div>
            <div style={styles.logo}>
              Saaf<span style={{ color: '#f4a261' }}>Immo</span>
              <span style={{ color: '#f4a261' }}>.</span>
            </div>
            <p style={styles.description}>
              La plateforme immobiliere de reference en Afrique de l'Ouest.
              Trouvez votre bien ideal parmi des milliers d'annonces verifiees.
            </p>
            <div style={styles.socialRow}>
              {[Globe, Link2, MessageCircle, Share2].map((Icon, i) => (
                <button
                  key={i}
                  style={styles.socialIcon}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f4a261';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={styles.colTitle}>Liens Rapides</h4>
            {[
              { label: 'Acheter', path: '/?type=Vente' },
              { label: 'Louer', path: '/?type=Location' },
              { label: 'Terrains', path: '/?type=Terrain' },
              { label: 'Agents', path: '/' },
              { label: 'Contact', path: '/' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.path}
                style={styles.linkItem}
                onMouseEnter={(e) => e.target.style.color = '#f4a261'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 style={styles.colTitle}>Contact</h4>
            <div style={styles.contactItem}>
              <MapPin size={16} style={styles.contactIcon} />
              <span>Cocody Riviera Faya, Abidjan, Cote d'Ivoire</span>
            </div>
            <div style={styles.contactItem}>
              <Phone size={16} style={styles.contactIcon} />
              <span>+225 07 08 09 10 11</span>
            </div>
            <div style={styles.contactItem}>
              <Mail size={16} style={styles.contactIcon} />
              <span>contact@saafimmo.com</span>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 style={styles.colTitle}>Newsletter</h4>
            <p style={{ ...styles.description, marginBottom: '16px' }}>
              Recevez les dernieres annonces et offres exclusives.
            </p>
            <input
              type="email"
              placeholder="Votre email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.newsletterInput}
            />
            <button
              style={styles.newsletterBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Send size={16} />
              S'abonner
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomInner}>
          <span style={styles.copyright}>
            &copy; 2026 SaafImmo. Tous droits reserves.
          </span>
          <div style={styles.legalLinks}>
            {['Politique de confidentialite', 'Conditions d\'utilisation', 'Mentions legales'].map((text) => (
              <span
                key={text}
                style={styles.legalLink}
                onMouseEnter={(e) => e.target.style.color = '#f4a261'}
                onMouseLeave={(e) => e.target.style.color = '#64748b'}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
