
import React from 'react';
import { Typography, Box, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface LeagueHeaderProps {
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  handleAddMatchOpen: () => void;
  handleEditLeagueOpen: () => void;
}

const LeagueHeader: React.FC<LeagueHeaderProps> = ({
  selectedLeague,
  setSelectedLeague,
  handleAddMatchOpen,
  handleEditLeagueOpen,
}) => {
  return (
    <>
      <Box mt={4} mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h1">
          League Management
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="outlined"
        >
          Back to Dashboard
        </Button>
      </Box>

      <Box mb={3}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Select League</InputLabel>
          <Select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value as string)}
            label="Select League"
          >
            <MenuItem value="premier">Premier League</MenuItem>
            <MenuItem value="championship">Championship</MenuItem>
            <MenuItem value="league1">League One</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddMatchOpen}
              fullWidth
            >
              Add New Match
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={handleEditLeagueOpen}
              fullWidth
            >
              Edit League Settings
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LeagueHeader;
