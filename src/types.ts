
// If there's an existing types.ts file, this will add the missing types.
// If the file exists, you may need to just add new types.

export interface Team {
  id: string;
  name: string;
  category: string;
  founded: string;
  stadium: string;
  coach?: string;
}

export interface Match {
  id: string;
  date: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  venue?: string;
  leagueId: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  position: string;
  goals: number;
  assists?: number;
  appearances?: number;
}

export interface League {
  id: string;
  name: string;
  season: string;
  startDate: string;
  endDate: string;
  winPoints: number;
  drawPoints: number;
  lossPoints: number;
}

export interface LeagueData {
  id: string;
  season: string;
  winner?: string;
  secondPlace?: string;
  thirdPlace?: string;
  status: string;
}
