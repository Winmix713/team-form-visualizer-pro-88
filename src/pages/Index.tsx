import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router-dom';
import { fetchTeams, fetchMatches, fetchPlayers } from '../api/dataService';
import { Team, Match, Player } from '../types';

const Index: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [teamsData, matchesData, playersData] = await Promise.all([
          fetchTeams(),
          fetchMatches(),
          fetchPlayers(),
        ]);
        setTeams(teamsData);
        setMatches(matchesData);
        setPlayers(playersData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredTeams = teams
    .filter((team) => {
      if (filter === 'all') return true;
      return team.category === filter;
    })
    .filter((team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const teamStats = teams.map((team) => {
    const teamMatches = matches.filter(
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

    return {
      name: team.name,
      wins,
      draws,
      losses,
      points: wins * 3 + draws,
    };
  });

  // Sort teams by points (highest first)
  teamStats.sort((a, b) => b.points - a.points);

  const topScorers = [...players]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 5);

  const teamDistribution = teams.reduce((acc, team) => {
    const category = team.category || 'Unknown';
    const existingCategory = acc.find((item) => item.name === category);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom mt={4}>
        Team Management Dashboard
      </Typography>

      <Box mb={4}>
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

      <Grid container spacing={4}>
        {/* Team List */}
        <Grid item xs={12} md={8}>
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
        </Grid>

        {/* Stats & Charts */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Categories
              </Typography>
              <Box height={200}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={teamDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {teamDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                League Table (Top 5)
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={teamStats.slice(0, 5)}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="points" name="Points" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

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
        </Grid>

        {/* Recent Matches */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Recent Matches
          </Typography>
          <Grid container spacing={2}>
            {matches
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .slice(0, 4)
              .map((match) => {
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
                            {homeTeam?.name || 'Unknown'}
                          </Typography>
                          <Typography variant="h6">
                            {match.homeScore} - {match.awayScore}
                          </Typography>
                          <Typography variant="body1">
                            {awayTeam?.name || 'Unknown'}
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
      </Grid>

      {/* Sample team data for demonstration */}
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
    </Container>
  );
};

export default Index;
