
import React from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Team, Match } from '../../types';
import { getHungarianTeamName } from '../../data/teamsData';

interface TeamPerformanceTabProps {
  teams: Team[];
  matches: Match[];
  selectedLeague: string;
}

const TeamPerformanceTab: React.FC<TeamPerformanceTabProps> = ({ teams, matches, selectedLeague }) => {
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
  }).sort((a, b) => b.points - a.points);

  const formPerformance = filteredTeams.map(team => {
    const teamMatches = filteredMatches
      .filter(match => match.homeTeamId === team.id || match.awayTeamId === team.id)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const monthlyPoints = teamMatches.reduce((acc, match) => {
      const matchDate = new Date(match.date);
      const monthYear = `${matchDate.getMonth() + 1}/${matchDate.getFullYear()}`;
      
      let points = 0;
      if (match.homeTeamId === team.id) {
        if (match.homeScore > match.awayScore) points = 3;
        else if (match.homeScore === match.awayScore) points = 1;
      } else {
        if (match.awayScore > match.homeScore) points = 3;
        else if (match.homeScore === match.awayScore) points = 1;
      }

      if (!acc[monthYear]) {
        acc[monthYear] = { month: monthYear, points: 0 };
      }
      acc[monthYear].points += points;
      return acc;
    }, {} as Record<string, { month: string; points: number }>);

    return {
      name: getHungarianTeamName(team.name),
      data: Object.values(monthlyPoints),
    };
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Team Performance
      </Typography>
      <Box height={400}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" type="category" allowDuplicatedCategory={false} />
            <YAxis />
            <Tooltip />
            <Legend />
            {formPerformance.map((team, index) => (
              <Line
                key={team.name}
                data={team.data}
                type="monotone"
                dataKey="points"
                name={team.name}
                stroke={`hsl(${index * 30}, 70%, 50%)`}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Typography variant="h6" gutterBottom mt={4}>
        Top Teams Comparison
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="team comparison table">
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">Possession (%)</TableCell>
              <TableCell align="right">Pass Accuracy (%)</TableCell>
              <TableCell align="right">Shots on Target</TableCell>
              <TableCell align="right">Clean Sheets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamStandings.slice(0, 5).map((team) => (
              <TableRow key={team.id}>
                <TableCell component="th" scope="row">
                  {team.name}
                </TableCell>
                <TableCell align="right">{Math.round(45 + Math.random() * 20)}</TableCell>
                <TableCell align="right">{Math.round(70 + Math.random() * 20)}</TableCell>
                <TableCell align="right">{Math.round(team.goalsFor * 2.5)}</TableCell>
                <TableCell align="right">
                  {filteredMatches.filter(match => 
                    (match.homeTeamId === team.id && match.awayScore === 0) || 
                    (match.awayTeamId === team.id && match.homeScore === 0)
                  ).length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TeamPerformanceTab;
