
import React from 'react';
import { Typography, Box, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Team } from '../../types';

interface TeamsListProps {
  filteredTeams: Team[];
}

const TeamsList: React.FC<TeamsListProps> = ({ filteredTeams }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Teams ({filteredTeams.length})
      </Typography>
      <Grid container spacing={2}>
        {filteredTeams.map((team) => (
          <Grid item xs={12} sm={6} key={team.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{team.name}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {team.category}
                </Typography>
                <Typography variant="body2">
                  Founded: {team.founded}
                </Typography>
                <Typography variant="body2">
                  Stadium: {team.stadium}
                </Typography>
                <Typography variant="body2">
                  Coach: {team.coach || 'N/A'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/team/${team.id}`}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  component={Link}
                  to={`/edit-team/${team.id}`}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamsList;
