
import React from 'react';
import { Typography, Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  searchQuery: string;
  filter: string;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  searchQuery, 
  filter, 
  setSearchQuery, 
  setFilter 
}) => {
  return (
    <Box mb={4}>
      <Typography variant="h4" component="h1" gutterBottom mt={4}>
        Team Management Dashboard
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search teams"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category Filter</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value as string)}
              label="Category Filter"
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="premier">Premier League</MenuItem>
              <MenuItem value="championship">Championship</MenuItem>
              <MenuItem value="league1">League One</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/league-management"
            variant="contained"
            color="primary"
            fullWidth
          >
            League Management
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHeader;
