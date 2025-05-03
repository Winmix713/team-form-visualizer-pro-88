import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Link } from 'react-router-dom';
import { fetchTeams, fetchMatches, fetchPlayers, addMatch, updateLeague } from '../api/dataService';
import { Team, Match, Player, League } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const LeagueManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [selectedLeague, setSelectedLeague] = useState('premier');
  const [openAddMatch, setOpenAddMatch] = useState(false);
  const [openEditLeague, setOpenEditLeague] = useState(false);
  const [newMatch, setNewMatch] = useState<Partial<Match>>({
    date: new Date().toISOString().split('T')[0],
    homeTeamId: '',
    awayTeamId: '',
    homeScore: 0,
    awayScore: 0,
    venue: '',
    leagueId: 'premier',
  });
  const [leagueSettings, setLeagueSettings] = useState<Partial<League>>({
    id: 'premier',
    name: 'Premier League',
    season: '2023-2024',
    startDate: '2023-08-12',
    endDate: '2024-05-19',
    winPoints: 3,
    drawPoints: 1,
    lossPoints: 0,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  const filteredTeams = teams.filter(
    (team) => team.category === selectedLeague
  );

  const filteredMatches = matches.filter(
    (match) => match.leagueId === selectedLeague
  );

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
      name: team.name,
      played: teamMatches.length,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points: wins * 3 + draws,
    };
  }).sort((a, b) => {
    // Sort by points (highest first)
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // Then by goal difference
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    // Then by goals scored
    return b.goalsFor - a.goalsFor;
  });

  const topScorers = players
    .filter(player => {
      const playerTeam = teams.find(team => team.id === player.teamId);
      return playerTeam && playerTeam.category === selectedLeague;
    })
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 10);

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
      name: team.name,
      data: Object.values(monthlyPoints),
    };
  });

  const handleAddMatchOpen = () => {
    setOpenAddMatch(true);
  };

  const handleAddMatchClose = () => {
    setOpenAddMatch(false);
  };

  const handleEditLeagueOpen = () => {
    setOpenEditLeague(true);
  };

  const handleEditLeagueClose = () => {
    setOpenEditLeague(false);
  };

  const handleMatchChange = (field: keyof Match, value: any) => {
    setNewMatch({
      ...newMatch,
      [field]: value,
    });
  };

  const handleLeagueSettingChange = (field: keyof League, value: any) => {
    setLeagueSettings({
      ...leagueSettings,
      [field]: value,
    });
  };

  const handleAddMatch = async () => {
    try {
      if (
        !newMatch.homeTeamId ||
        !newMatch.awayTeamId ||
        newMatch.homeTeamId === newMatch.awayTeamId
      ) {
        alert('Please select two different teams');
        return;
      }

      const matchData = {
        ...newMatch,
        id: `match_${Date.now()}`,
        leagueId: selectedLeague,
        homeScore: Number(newMatch.homeScore),
        awayScore: Number(newMatch.awayScore),
      } as Match;

      await addMatch(matchData);
      setMatches([...matches, matchData]);
      setOpenAddMatch(false);
      setNewMatch({
        date: new Date().toISOString().split('T')[0],
        homeTeamId: '',
        awayTeamId: '',
        homeScore: 0,
        awayScore: 0,
        venue: '',
        leagueId: selectedLeague,
      });
    } catch (error) {
      console.error('Error adding match:', error);
      alert('Failed to add match');
    }
  };

  const handleUpdateLeague = async () => {
    try {
      await updateLeague(leagueSettings as League);
      setOpenEditLeague(false);
      alert('League settings updated successfully');
    } catch (error) {
      console.error('Error updating league settings:', error);
      alert('Failed to update league settings');
    }
  };

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

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="league management tabs">
          <Tab label="Standings" />
          <Tab label="Recent Matches" />
          <Tab label="Top Scorers" />
          <Tab label="Team Performance" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" gutterBottom>
          League Table
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="league standings table">
            <TableHead>
              <TableRow>
                <TableCell>Pos</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">P</TableCell>
                <TableCell align="right">W</TableCell>
                <TableCell align="right">D</TableCell>
                <TableCell align="right">L</TableCell>
                <TableCell align="right">GF</TableCell>
                <TableCell align="right">GA</TableCell>
                <TableCell align="right">GD</TableCell>
                <TableCell align="right">Pts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamStandings.map((team, index) => (
                <TableRow
                  key={team.id}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                    ...(index < 4 && { backgroundColor: 'rgba(0, 230, 118, 0.1)' }),
                    ...(index >= teamStandings.length - 3 && { backgroundColor: 'rgba(255, 82, 82, 0.1)' }),
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell align="right">{team.played}</TableCell>
                  <TableCell align="right">{team.wins}</TableCell>
                  <TableCell align="right">{team.draws}</TableCell>
                  <TableCell align="right">{team.losses}</TableCell>
                  <TableCell align="right">{team.goalsFor}</TableCell>
                  <TableCell align="right">{team.goalsAgainst}</TableCell>
                  <TableCell align="right">{team.goalDifference}</TableCell>
                  <TableCell align="right"><strong>{team.points}</strong></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
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
                          <Typography variant="body1">{homeTeam?.name || 'Unknown Team'}</Typography>
                        </Box>
                        <Box mx={2}>
                          <Typography variant="h6">
                            {match.homeScore} - {match.awayScore}
                          </Typography>
                        </Box>
                        <Box flex={1}>
                          <Typography variant="body1">{awayTeam?.name || 'Unknown Team'}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
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
                    <TableCell>{playerTeam?.name || 'Unknown Team'}</TableCell>
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
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
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
      </TabPanel>

      {/* Add Match Dialog */}
      <Dialog open={openAddMatch} onClose={handleAddMatchClose}>
        <DialogTitle>Add New Match</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={newMatch.date}
              onChange={(e) => handleMatchChange('date', e.target.value)}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Home Team</InputLabel>
              <Select
                value={newMatch.homeTeamId}
                onChange={(e) => handleMatchChange('homeTeamId', e.target.value)}
                label="Home Team"
              >
                {filteredTeams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Away Team</InputLabel>
              <Select
                value={newMatch.awayTeamId}
                onChange={(e) => handleMatchChange('awayTeamId', e.target.value)}
                label="Away Team"
              >
                {filteredTeams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Home Score"
                  type="number"
                  fullWidth
                  value={newMatch.homeScore}
                  onChange={(e) => handleMatchChange('homeScore', parseInt(e.target.value))}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Away Score"
                  type="number"
                  fullWidth
                  value={newMatch.awayScore}
                  onChange={(e) => handleMatchChange('awayScore', parseInt(e.target.value))}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <TextField
              label="Venue"
              fullWidth
              value={newMatch.venue}
              onChange={(e) => handleMatchChange('venue', e.target.value)}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddMatchClose}>Cancel</Button>
          <Button onClick={handleAddMatch} color="primary">
            Add Match
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit League Dialog */}
      <Dialog open={openEditLeague} onClose={handleEditLeagueClose}>
        <DialogTitle>Edit League Settings</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <TextField
              label="League Name"
              fullWidth
              value={leagueSettings.name}
              onChange={(e) => handleLeagueSettingChange('name', e.target.value)}
              margin="normal"
            />
            <TextField
              label="Season"
              fullWidth
              value={leagueSettings.season}
              onChange={(e) => handleLeagueSettingChange('season', e.target.value)}
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  value={leagueSettings.startDate}
                  onChange={(e) => handleLeagueSettingChange('startDate', e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  value={leagueSettings.endDate}
                  onChange={(e) => handleLeagueSettingChange('endDate', e.target.value)}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Typography variant="h6" mt={2} mb={1}>
              Points System
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Win Points"
                  type="number"
                  fullWidth
                  value={leagueSettings.winPoints}
                  onChange={(e) => handleLeagueSettingChange('winPoints', parseInt(e.target.value))}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Draw Points"
                  type="number"
                  fullWidth
                  value={leagueSettings.drawPoints}
                  onChange={(e) => handleLeagueSettingChange('drawPoints', parseInt(e.target.value))}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Loss Points"
                  type="number"
                  fullWidth
                  value={leagueSettings.lossPoints}
                  onChange={(e) => handleLeagueSettingChange('lossPoints', parseInt(e.target.value))}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditLeagueClose}>Cancel</Button>
          <Button onClick={handleUpdateLeague} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

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

export default LeagueManagement;
