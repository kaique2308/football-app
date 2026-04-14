import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '8rem', color: '#1f1f1f', lineHeight: 1 }}>
        404
      </div>
      <p style={{ color: '#888', fontSize: '15px', marginBottom: '2rem' }}>
        Página não encontrada
      </p>
      <Link to="/" style={{
        background: '#4ade80',
        color: '#0a2e1a',
        padding: '10px 24px',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '14px',
      }}>
        Voltar ao início
      </Link>
    </div>
  );
}
