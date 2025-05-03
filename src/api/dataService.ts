
import { Team, Match, Player, League } from '../types';

// Mock data for demonstration purposes
let teams: Team[] = [
  { id: 'arsenal', name: 'London Ágyúk', category: 'premier', founded: '1886', stadium: 'Emirates Stadium', coach: 'Mikel Arteta' },
  { id: 'manutd', name: 'Vörös Ördögök', category: 'premier', founded: '1878', stadium: 'Old Trafford', coach: 'Erik ten Hag' },
  { id: 'mancity', name: 'Manchester Kék', category: 'premier', founded: '1880', stadium: 'Etihad Stadium', coach: 'Pep Guardiola' },
  { id: 'astonvilla', name: 'Aston Oroszlán', category: 'premier', founded: '1874', stadium: 'Villa Park', coach: 'Unai Emery' },
  { id: 'liverpool', name: 'Liverpool', category: 'premier', founded: '1892', stadium: 'Anfield', coach: 'Jürgen Klopp' },
];

let matches: Match[] = [
  { 
    id: 'match1', 
    date: '2023-10-15', 
    homeTeamId: 'arsenal', 
    awayTeamId: 'manutd', 
    homeScore: 2, 
    awayScore: 1, 
    venue: 'Emirates Stadium', 
    leagueId: 'premier' 
  },
  {
    id: 'match2',
    date: '2023-10-22',
    homeTeamId: 'mancity',
    awayTeamId: 'liverpool',
    homeScore: 3,
    awayScore: 3,
    venue: 'Etihad Stadium',
    leagueId: 'premier'
  },
  {
    id: 'match3',
    date: '2023-11-01',
    homeTeamId: 'astonvilla',
    awayTeamId: 'arsenal',
    homeScore: 0,
    awayScore: 2,
    venue: 'Villa Park',
    leagueId: 'premier'
  },
  {
    id: 'match4',
    date: '2023-11-10',
    homeTeamId: 'manutd',
    awayTeamId: 'mancity',
    homeScore: 1,
    awayScore: 3,
    venue: 'Old Trafford',
    leagueId: 'premier'
  },
];

let players: Player[] = [
  { id: 'player1', name: 'Harry Kane', teamId: 'manutd', position: 'Forward', goals: 15, assists: 5, appearances: 20 },
  { id: 'player2', name: 'Kevin De Bruyne', teamId: 'mancity', position: 'Midfielder', goals: 8, assists: 12, appearances: 18 },
  { id: 'player3', name: 'Bukayo Saka', teamId: 'arsenal', position: 'Winger', goals: 10, assists: 7, appearances: 21 },
  { id: 'player4', name: 'Ollie Watkins', teamId: 'astonvilla', position: 'Forward', goals: 12, assists: 3, appearances: 19 },
  { id: 'player5', name: 'Mohamed Salah', teamId: 'liverpool', position: 'Forward', goals: 14, assists: 8, appearances: 20 },
];

export const fetchTeams = async (): Promise<Team[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return teams;
};

export const fetchMatches = async (): Promise<Match[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return matches;
};

export const fetchPlayers = async (): Promise<Player[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return players;
};

export const addMatch = async (match: Match): Promise<Match> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  matches.push(match);
  return match;
};

export const updateLeague = async (league: League): Promise<League> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return league;
};
