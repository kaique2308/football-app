import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getTeam, getMatchesByTeam } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function ScoreBox({ match }) {
  const home = match.homeTeam?.name || '—';
  const away = match.awayTeam?.name || '—';
  const scoreHome = match.score?.fullTime?.home ?? '-';
  const scoreAway = match.score?.fullTime?.away ?? '-';

  return (
    <div style={{
      background: '#1f1f1f',
      border: '0.5px solid rgba(255,255,255,0.08)',
      borderRadius: '10px',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
    }}>
      <span style={{ fontSize: '13px', color: '#ccc', flex: 1 }}>{home}</span>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.3rem',
        color: '#4ade80',
        minWidth: '60px',
        textAlign: 'center',
      }}>
        {scoreHome} — {scoreAway}
      </span>
      <span style={{ fontSize: '13px', color: '#ccc', flex: 1, textAlign: 'right' }}>{away}</span>
    </div>
  );
}

export default function TeamDetail() {
  const { id } = useParams();

  const { data: team, loading: loadingTeam, error: errorTeam } = useFetch(
    () => getTeam(id), [id]
  );

  const { data: matchData, loading: loadingMatches, error: errorMatches } = useFetch(
    () => getMatchesByTeam(id), [id]
  );

  if (loadingTeam) return <LoadingSpinner text="Carregando time..." />;
  if (errorTeam) return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <ErrorMessage message={errorTeam} />
      <Link to="/teams" style={{ color: '#4ade80', fontSize: '14px' }}>← Voltar para times</Link>
    </div>
  );

  const matches = matchData?.matches || [];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Link to="/teams" style={{ color: '#888', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '1.5rem' }}>
        ← Times
      </Link>

      {/* Header do time */}
      <div style={{
        background: '#0a2e1a',
        border: '0.5px solid rgba(74,222,128,0.2)',
        borderRadius: '16px',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        {team?.crest && (
          <img src={team.crest} alt={team.name} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
        )}
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', lineHeight: 1, marginBottom: '6px' }}>
            {team?.name}
          </h1>
          <p style={{ color: '#888', fontSize: '13px' }}>
            {team?.area?.name} · Fundado em {team?.founded || 'N/A'} · {team?.venue || ''}
          </p>
        </div>
      </div>

      {/* Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '10px',
        marginBottom: '2rem',
      }}>
        {[
          { label: 'Apelido', value: team?.tla },
          { label: 'País', value: team?.area?.name },
          { label: 'Estádio', value: team?.venue },
          { label: 'Cores', value: team?.clubColors },
        ].map(item => (
          <div key={item.label} style={{
            background: '#161616',
            border: '0.5px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '1rem',
          }}>
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff' }}>
              {item.value || '—'}
            </div>
          </div>
        ))}
      </div>

      {/* Últimas partidas */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>
        ÚLTIMAS PARTIDAS
      </h2>

      {loadingMatches && <LoadingSpinner text="Buscando partidas..." />}
      {errorMatches && <ErrorMessage message={errorMatches} />}

      {!loadingMatches && matches.length === 0 && (
        <p style={{ color: '#888', fontSize: '14px' }}>Nenhuma partida encontrada.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {matches.map(match => (
          <div key={match.id}>
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px', textAlign: 'center' }}>
              {formatDate(match.utcDate)} · {match.competition?.name}
            </div>
            <ScoreBox match={match} />
          </div>
        ))}
      </div>

      {team?.website && (
        <a
          href={team.website}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '2rem',
            background: 'rgba(74,222,128,0.1)',
            border: '0.5px solid rgba(74,222,128,0.3)',
            color: '#4ade80',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '13px',
          }}
        >
          Site oficial →
        </a>
      )}
    </div>
  );
}
