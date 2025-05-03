
import { useMemo } from 'react';
import { Team, Match, Player } from '@/types';

export const useTeamStats = (teams: Team[], matches: Match[], players: Player[]) => {
  const teamStats = useMemo(() => {
    return teams.map((team) => {
      const teamMatches = matches.filter(
        (match) => match.homeTeamId === team.id || match.awayTeamId === team.id
      );
      
      const wins = teamMatches.filter(
        (match) =>
          (match.homeTeamId === team.id && match.homeScore > match.awayScore) ||
          (match.awayTeamId === team.id && match.awayScore > match.homeScore)
      ).length;
      
      const draws = teamMatches.filter(
        (match) => match.homeScore === match.awayScore
      ).length;
      
      const losses = teamMatches.length - wins - draws;

      return {
        name: team.name,
        wins,
        draws,
        losses,
        points: wins * 3 + draws,
      };
    }).sort((a, b) => b.points - a.points);
  }, [teams, matches]);

  const topScorers = useMemo(() => {
    return [...players]
      .sort((a, b) => b.goals - a.goals)
      .slice(0, 5);
  }, [players]);

  return {
    teamStats,
    topScorers
  };
};
