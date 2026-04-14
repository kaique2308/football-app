import { Link } from 'react-router-dom';

const competitions = [
  { code: 'PL', name: 'Premier League', country: 'Inglaterra', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'PD', name: 'La Liga', country: 'Espanha', emoji: '🇪🇸' },
  { code: 'BL1', name: 'Bundesliga', country: 'Alemanha', emoji: '🇩🇪' },
  { code: 'SA', name: 'Serie A', country: 'Itália', emoji: '🇮🇹' },
  { code: 'FL1', name: 'Ligue 1', country: 'França', emoji: '🇫🇷' },
  { code: 'CL', name: 'Champions League', country: 'Europa', emoji: '🏆' },
];

export default function Home() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0a2e1a 0%, #0d1a0d 100%)',
        border: '0.5px solid rgba(74,222,128,0.2)',
        borderRadius: '16px',
        padding: '3rem 2rem',
        marginBottom: '2.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>⚽</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          color: '#fff',
          lineHeight: 1,
          marginBottom: '1rem',
        }}>
          O FUTEBOL<br />
          <span style={{ color: '#4ade80' }}>DO MUNDO</span>
        </h1>
        <p style={{ color: '#888', fontSize: '15px', maxWidth: '400px', margin: '0 auto 2rem' }}>
          Explore times e partidas das principais ligas do mundo em tempo real.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/teams" style={{
            background: '#4ade80',
            color: '#0a2e1a',
            padding: '10px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
          }}>
            Ver Times
          </Link>
          <Link to="/matches" style={{
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '14px',
            border: '0.5px solid rgba(255,255,255,0.15)',
          }}>
            Ver Partidas
          </Link>
        </div>
      </div>

      {/* Competições */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
        COMPETIÇÕES DISPONÍVEIS
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '12px',
      }}>
        {competitions.map((comp) => (
          <Link
            key={comp.code}
            to={`/teams?competition=${comp.code}`}
            style={{
              background: '#161616',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)';
              e.currentTarget.style.background = '#1a2a1e';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.background = '#161616';
            }}
          >
            <span style={{ fontSize: '2rem' }}>{comp.emoji}</span>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#fff' }}>{comp.name}</div>
              <div style={{ fontSize: '12px', color: '#888' }}>{comp.country}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
