
import React from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { Team, Match } from '../../types';
import { getHungarianTeamName } from '../../data/teamsData';

interface StandingsTabProps {
  teams: Team[];
  matches: Match[];
  selectedLeague: string;
}

const StandingsTab: React.FC<StandingsTabProps> = ({ teams, matches, selectedLeague }) => {
  const filteredTeams = teams.filter((team) => team.category === selectedLeague);
  const filteredMatches = matches.filter((match) => match.leagueId === selectedLeague);

  const teamStandings = filteredTeams.map((team) => {
    const teamMatches = filteredMatches.filter(
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
    
    const goalsFor = teamMatches.reduce((total, match) => {
      if (match.homeTeamId === team.id) {
        return total + match.homeScore;
      } else {
        return total + match.awayScore;
      }
    }, 0);
    
    const goalsAgainst = teamMatches.reduce((total, match) => {
      if (match.homeTeamId === team.id) {
        return total + match.awayScore;
      } else {
        return total + match.homeScore;
      }
    }, 0);

    return {
      id: team.id,
      name: getHungarianTeamName(team.name),
      played: teamMatches.length,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points: wins * 3 + draws,
    };
  }).sort((a, b) => {
    // Sort by points (highest first)
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // Then by goal difference
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    // Then by goals scored
    return b.goalsFor - a.goalsFor;
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        League Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="league standings table">
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell>Team</TableCell>
              <TableCell align="right">P</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">D</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">GF</TableCell>
              <TableCell align="right">GA</TableCell>
              <TableCell align="right">GD</TableCell>
              <TableCell align="right">Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamStandings.map((team, index) => (
              <TableRow
                key={team.id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                  ...(index < 4 && { backgroundColor: 'rgba(0, 230, 118, 0.1)' }),
                  ...(index >= teamStandings.length - 3 && { backgroundColor: 'rgba(255, 82, 82, 0.1)' }),
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell align="right">{team.played}</TableCell>
                <TableCell align="right">{team.wins}</TableCell>
                <TableCell align="right">{team.draws}</TableCell>
                <TableCell align="right">{team.losses}</TableCell>
                <TableCell align="right">{team.goalsFor}</TableCell>
                <TableCell align="right">{team.goalsAgainst}</TableCell>
                <TableCell align="right">{team.goalDifference}</TableCell>
                <TableCell align="right"><strong>{team.points}</strong></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StandingsTab;
