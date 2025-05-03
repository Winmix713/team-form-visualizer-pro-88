
import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { Team, Player } from '../../types';

interface TopScorersProps {
  topScorers: Player[];
  teams: Team[];
}

const TopScorers: React.FC<TopScorersProps> = ({ topScorers, teams }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top Scorers
        </Typography>
        {topScorers.map((player, index) => (
          <Box
            key={player.id}
            display="flex"
            justifyContent="space-between"
            mb={1}
          >
            <Typography>
              {index + 1}. {player.name} (
              {
                teams.find((team) => team.id === player.teamId)?.name ||
                'Unknown Team'
              }
              )
            </Typography>
            <Typography>{player.goals} goals</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopScorers;
