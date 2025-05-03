
import React from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { Team, Match } from '../../types';
import { getHungarianTeamName } from '../../data/teamsData';

interface RecentMatchesSectionProps {
  matches: Match[];
  teams: Team[];
}

const RecentMatchesSection: React.FC<RecentMatchesSectionProps> = ({ matches, teams }) => {
  const sortedMatches = [...matches].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 4);

  return (
    <Grid item xs={12}>
      <Typography variant="h5" gutterBottom>
        Recent Matches
      </Typography>
      <Grid container spacing={2}>
        {sortedMatches.map((match) => {
          const homeTeam = teams.find((t) => t.id === match.homeTeamId);
          const awayTeam = teams.find((t) => t.id === match.awayTeamId);
          return (
            <Grid item xs={12} sm={6} md={3} key={match.id}>
              <Card>
                <CardContent>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    {new Date(match.date).toLocaleDateString()}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body1">
                      {homeTeam ? getHungarianTeamName(homeTeam.name) : 'Unknown'}
                    </Typography>
                    <Typography variant="h6">
                      {match.homeScore} - {match.awayScore}
                    </Typography>
                    <Typography variant="body1">
                      {awayTeam ? getHungarianTeamName(awayTeam.name) : 'Unknown'}
                    </Typography>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    mt={1}
                  >
                    Stadium: {match.venue || homeTeam?.stadium || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default RecentMatchesSection;
