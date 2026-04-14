import { Link, useLocation } from 'react-router-dom';

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(13,13,13,0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: '0.5px solid rgba(255,255,255,0.08)',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    letterSpacing: '0.04em',
    color: '#fff',
  },
  logoSpan: { color: '#4ade80' },
  links: {
    display: 'flex',
    gap: '0.25rem',
  },
};

const linkStyle = (active) => ({
  padding: '6px 14px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: '500',
  color: active ? '#4ade80' : '#888',
  background: active ? 'rgba(74,222,128,0.1)' : 'transparent',
  transition: 'all 0.2s',
});

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        FOOTBALL<span style={styles.logoSpan}>APP</span>
      </Link>
      <div style={styles.links}>
        <Link to="/" style={linkStyle(pathname === '/')}>Início</Link>
        <Link to="/teams" style={linkStyle(pathname.startsWith('/teams'))}>Times</Link>
        <Link to="/matches" style={linkStyle(pathname.startsWith('/matches'))}>Partidas</Link>
      </div>
    </nav>
  );
}
