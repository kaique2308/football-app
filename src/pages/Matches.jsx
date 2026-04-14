import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getMatches } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const competitions = [
  { code: 'PL', name: 'Premier League', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'PD', name: 'La Liga', emoji: '🇪🇸' },
  { code: 'BL1', name: 'Bundesliga', emoji: '🇩🇪' },
  { code: 'SA', name: 'Serie A', emoji: '🇮🇹' },
  { code: 'FL1', name: 'Ligue 1', emoji: '🇫🇷' },
  { code: 'CL', name: 'Champions League', emoji: '🏆' },
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    weekday: 'short', day: '2-digit', month: 'short',
  });
}

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit',
  });
}

export default function Matches() {
  const [searchParams, setSearchParams] = useSearchParams();
  const competition = searchParams.get('competition') || 'PL';

  const { data, loading, error } = useFetch(
    () => getMatches(competition),
    [competition]
  );

  const matches = data?.matches || [];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '1.5rem' }}>
        PRÓXIMAS PARTIDAS
      </h1>

      {/* Filtro */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {competitions.map(c => (
          <button
            key={c.code}
            onClick={() => setSearchParams({ competition: c.code })}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500',
              border: '0.5px solid',
              borderColor: competition === c.code ? '#4ade80' : 'rgba(255,255,255,0.1)',
              background: competition === c.code ? 'rgba(74,222,128,0.15)' : 'transparent',
              color: competition === c.code ? '#4ade80' : '#888',
              cursor: 'pointer',
            }}
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {loading && <LoadingSpinner text="Buscando partidas..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && matches.length === 0 && (
        <p style={{ color: '#888', textAlign: 'center', padding: '3rem 0' }}>
          Nenhuma partida agendada encontrada.
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {matches.map(match => (
          <div
            key={match.id}
            style={{
              background: '#161616',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {match.competition?.name} · Rodada {match.matchday}
              </span>
              <span style={{ fontSize: '11px', color: '#4ade80' }}>
                {formatDate(match.utcDate)} {formatTime(match.utcDate)}
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '12px',
            }}>
              {/* Home */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {match.homeTeam?.crest && (
                  <img src={match.homeTeam.crest} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                )}
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                  {match.homeTeam?.shortName || match.homeTeam?.name}
                </span>
              </div>

              {/* VS */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: '#4ade80',
                textAlign: 'center',
              }}>
                VS
              </div>

              {/* Away */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                  {match.awayTeam?.shortName || match.awayTeam?.name}
                </span>
                {match.awayTeam?.crest && (
                  <img src={match.awayTeam.crest} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
