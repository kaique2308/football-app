const BASE_URL = '/api/v4';
const API_KEY = process.env.REACT_APP_API_KEY;

const headers = {
  'X-Auth-Token': API_KEY,
};

export async function getTeamsByCompetition(competitionCode) {
  const res = await fetch(`${BASE_URL}/competitions/${competitionCode}/teams`, { headers });
  if (!res.ok) throw new Error('Erro ao buscar times');
  return res.json();
}

export async function getTeam(teamId) {
  const res = await fetch(`${BASE_URL}/teams/${teamId}`, { headers });
  if (!res.ok) throw new Error('Erro ao buscar time');
  return res.json();
}

export async function getMatches(competitionCode) {
  const res = await fetch(
    `${BASE_URL}/competitions/${competitionCode}/matches?limit=10`,
    { headers }
  );
  if (!res.ok) throw new Error('Erro ao buscar partidas');
  return res.json();
}

export async function getMatchesByTeam(teamId) {
  const res = await fetch(
    `${BASE_URL}/teams/${teamId}/matches?limit=5`,
    { headers }
  );
  if (!res.ok) throw new Error('Erro ao buscar partidas do time');
  return res.json();
}