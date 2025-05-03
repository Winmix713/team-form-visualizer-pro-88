import type { Match, StandingsEntry, TeamForm } from "@/types";

/**
 * Calculates the standings table based on match results
 * 
 * @param matches Array of match data
 * @returns Sorted array of standings entries
 */
export const calculateStandings = (matches: Match[]): StandingsEntry[] => {
  // Create a map to store team statistics
  const teamStats = new Map<string, {
    team: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
    form: Array<"W" | "D" | "L">;
  }>();

  // Process each match to update team statistics
  matches.forEach(match => {
    const { home_team, away_team, home_score, away_score } = match;
    
    // Ensure both teams exist in the map
    if (!teamStats.has(home_team)) {
      teamStats.set(home_team, {
        team: home_team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
        form: [],
      });
    }
    
    if (!teamStats.has(away_team)) {
      teamStats.set(away_team, {
        team: away_team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
        form: [],
      });
    }
    
    // Get team stats
    const homeTeamStats = teamStats.get(home_team)!;
    const awayTeamStats = teamStats.get(away_team)!;
    
    // Update matches played
    homeTeamStats.played += 1;
    awayTeamStats.played += 1;
    
    // Update goals
    homeTeamStats.goalsFor += home_score;
    homeTeamStats.goalsAgainst += away_score;
    awayTeamStats.goalsFor += away_score;
    awayTeamStats.goalsAgainst += home_score;
    
    // Update goal difference
    homeTeamStats.goalDifference = homeTeamStats.goalsFor - homeTeamStats.goalsAgainst;
    awayTeamStats.goalDifference = awayTeamStats.goalsFor - awayTeamStats.goalsAgainst;
    
    // Update wins, draws, losses, points and form based on the result
    if (home_score > away_score) {
      // Home team won
      homeTeamStats.won += 1;
      homeTeamStats.points += 3;
      homeTeamStats.form.push("W");
      
      awayTeamStats.lost += 1;
      awayTeamStats.form.push("L");
    } else if (home_score < away_score) {
      // Away team won
      awayTeamStats.won += 1;
      awayTeamStats.points += 3;
      awayTeamStats.form.push("W");
      
      homeTeamStats.lost += 1;
      homeTeamStats.form.push("L");
    } else {
      // Draw
      homeTeamStats.drawn += 1;
      homeTeamStats.points += 1;
      homeTeamStats.form.push("D");
      
      awayTeamStats.drawn += 1;
      awayTeamStats.points += 1;
      awayTeamStats.form.push("D");
    }
    
    // Limit form to the last 5 matches
    if (homeTeamStats.form.length > 5) {
      homeTeamStats.form = homeTeamStats.form.slice(-5);
    }
    
    if (awayTeamStats.form.length > 5) {
      awayTeamStats.form = awayTeamStats.form.slice(-5);
    }
    
    // Update the map
    teamStats.set(home_team, homeTeamStats);
    teamStats.set(away_team, awayTeamStats);
  });

  // Convert the map to an array and sort by points, goal difference, goals for
  const standings = Array.from(teamStats.values()).sort((a, b) => {
    // Sort by points (descending)
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    
    // If points are equal, sort by goal difference (descending)
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    
    // If goal difference is equal, sort by goals for (descending)
    if (b.goalsFor !== a.goalsFor) {
      return b.goalsFor - a.goalsFor;
    }
    
    // If everything is equal, sort alphabetically (ascending)
    return a.team.localeCompare(b.team);
  });

  // Add positions to the standings
  return standings.map((team, index) => ({
    ...team,
    position: index + 1,
  }));
};

/**
 * Calculates team forms based on match results
 * 
 * @param matches Array of match data
 * @returns Array of team form data
 */
export const calculateTeamForms = (matches: Match[]): TeamForm[] => {
  // First calculate standings to get position and other data
  const standings = calculateStandings(matches);
  
  // Convert standings to team forms
  return standings.map(team => ({
    position: team.position,
    team: team.team,
    played: team.played,
    goalsFor: team.goalsFor,
    goalsAgainst: team.goalsAgainst,
    points: team.points,
    form: team.form
  }));
};
