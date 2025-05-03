
import React from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';

const FeaturedTeams: React.FC = () => {
  return (
    <Box mt={4} mb={4}>
      <Typography variant="h5" gutterBottom>
        Featured Teams
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">London Ágyúk</Typography>
              <Typography color="textSecondary">Premier League</Typography>
              <Typography variant="body2">
                Stadium: Emirates Stadium
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Vörös Ördögök</Typography>
              <Typography color="textSecondary">Premier League</Typography>
              <Typography variant="body2">Stadium: Old Trafford</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manchester Kék</Typography>
              <Typography color="textSecondary">Premier League</Typography>
              <Typography variant="body2">Stadium: Etihad Stadium</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Aston Oroszlán</Typography>
              <Typography color="textSecondary">Premier League</Typography>
              <Typography variant="body2">Stadium: Villa Park</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedTeams;
