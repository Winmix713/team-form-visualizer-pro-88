
import React from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { Team, Match } from '../../types';
import { getHungarianTeamName } from '../../data/teamsData';

interface RecentMatchesTabProps {
  teams: Team[];
  matches: Match[];
  selectedLeague: string;
}

const RecentMatchesTab: React.FC<RecentMatchesTabProps> = ({ teams, matches, selectedLeague }) => {
  const filteredMatches = matches.filter((match) => match.leagueId === selectedLeague);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Recent Matches
      </Typography>
      <Grid container spacing={2}>
        {filteredMatches
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10)
          .map((match) => {
            const homeTeam = teams.find((t) => t.id === match.homeTeamId);
            const awayTeam = teams.find((t) => t.id === match.awayTeamId);
            return (
              <Grid item xs={12} md={6} key={match.id}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {new Date(match.date).toLocaleDateString()} • {match.venue || 'Unknown Venue'}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box flex={1} textAlign="right">
                        <Typography variant="body1">
                          {homeTeam ? getHungarianTeamName(homeTeam.name) : 'Unknown Team'}
                        </Typography>
                      </Box>
                      <Box mx={2}>
                        <Typography variant="h6">
                          {match.homeScore} - {match.awayScore}
                        </Typography>
                      </Box>
                      <Box flex={1}>
                        <Typography variant="body1">
                          {awayTeam ? getHungarianTeamName(awayTeam.name) : 'Unknown Team'}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default RecentMatchesTab;
