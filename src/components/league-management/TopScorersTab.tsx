
import React from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Team, Player } from '../../types';
import { getHungarianTeamName } from '../../data/teamsData';

interface TopScorersTabProps {
  players: Player[];
  teams: Team[];
  selectedLeague: string;
}

const TopScorersTab: React.FC<TopScorersTabProps> = ({ players, teams, selectedLeague }) => {
  const topScorers = players
    .filter(player => {
      const playerTeam = teams.find(team => team.id === player.teamId);
      return playerTeam && playerTeam.category === selectedLeague;
    })
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 10);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Top Scorers
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="top scorers table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Team</TableCell>
              <TableCell align="right">Goals</TableCell>
              <TableCell align="right">Assists</TableCell>
              <TableCell align="right">Matches</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topScorers.map((player, index) => {
              const playerTeam = teams.find((team) => team.id === player.teamId);
              return (
                <TableRow key={player.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{playerTeam ? getHungarianTeamName(playerTeam.name) : 'Unknown Team'}</TableCell>
                  <TableCell align="right">{player.goals}</TableCell>
                  <TableCell align="right">{player.assists || 0}</TableCell>
                  <TableCell align="right">{player.appearances || 0}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom mt={4}>
        Goal Distribution
      </Typography>
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topScorers.slice(0, 5).map(player => ({
              name: player.name,
              goals: player.goals,
              assists: player.assists || 0
            }))}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="goals" name="Goals" fill="#8884d8" />
            <Bar dataKey="assists" name="Assists" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default TopScorersTab;
