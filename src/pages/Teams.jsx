import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getTeamsByCompetition } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const competitions = [
  { code: 'PL', name: 'Premier League' },
  { code: 'PD', name: 'La Liga' },
  { code: 'BL1', name: 'Bundesliga' },
  { code: 'SA', name: 'Serie A' },
  { code: 'FL1', name: 'Ligue 1' },
  { code: 'CL', name: 'Champions League' },
];

export default function Teams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const competition = searchParams.get('competition') || 'PL';

  const { data, loading, error } = useFetch(
    () => getTeamsByCompetition(competition),
    [competition]
  );

  const teams = data?.teams || [];
  const filtered = teams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '1.5rem' }}>
        TIMES
      </h1>

      {/* Filtro de competição */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
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
            {c.name}
          </button>
        ))}
      </div>

      {/* Busca */}
      <input
        type="text"
        placeholder="Buscar time..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '0.5px solid rgba(255,255,255,0.12)',
          background: '#161616',
          color: '#fff',
          fontSize: '14px',
          marginBottom: '1.5rem',
          outline: 'none',
        }}
      />

      {loading && <LoadingSpinner text="Buscando times..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
        }}>
          {filtered.map(team => (
            <Link
              key={team.id}
              to={`/teams/${team.id}`}
              style={{
                background: '#161616',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'center',
                transition: 'border-color 0.2s, background 0.2s',
                display: 'block',
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
              {team.crest && (
                <img
                  src={team.crest}
                  alt={team.name}
                  style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '10px' }}
                />
              )}
              <div style={{ fontWeight: '600', fontSize: '13px', color: '#fff', lineHeight: 1.3 }}>
                {team.name}
              </div>
              <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                {team.area?.name}
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p style={{ color: '#888', textAlign: 'center', padding: '3rem 0' }}>
          Nenhum time encontrado.
        </p>
      )}
    </div>
  );
}
