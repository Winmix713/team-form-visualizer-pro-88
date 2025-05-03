
import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Tabs, Tab } from '@mui/material';
import { fetchTeams, fetchMatches, fetchPlayers, addMatch, updateLeague } from '../api/dataService';
import { Team, Match, Player, League } from '../types';

// Import refactored components
import LeagueHeader from '../components/league-management/LeagueHeader';
import StandingsTab from '../components/league-management/StandingsTab';
import RecentMatchesTab from '../components/league-management/RecentMatchesTab';
import TopScorersTab from '../components/league-management/TopScorersTab';
import TeamPerformanceTab from '../components/league-management/TeamPerformanceTab';
import AddMatchDialog from '../components/league-management/AddMatchDialog';
import EditLeagueDialog from '../components/league-management/EditLeagueDialog';
import FeaturedTeams from '../components/dashboard/FeaturedTeams';

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
      <LeagueHeader
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
        handleAddMatchOpen={handleAddMatchOpen}
        handleEditLeagueOpen={handleEditLeagueOpen}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="league management tabs">
          <Tab label="Standings" />
          <Tab label="Recent Matches" />
          <Tab label="Top Scorers" />
          <Tab label="Team Performance" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <StandingsTab 
          teams={teams} 
          matches={matches} 
          selectedLeague={selectedLeague} 
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <RecentMatchesTab 
          teams={teams} 
          matches={matches} 
          selectedLeague={selectedLeague} 
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <TopScorersTab 
          players={players} 
          teams={teams} 
          selectedLeague={selectedLeague} 
        />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <TeamPerformanceTab 
          teams={teams} 
          matches={matches} 
          selectedLeague={selectedLeague} 
        />
      </TabPanel>

      {/* Add Match Dialog */}
      <AddMatchDialog
        open={openAddMatch}
        onClose={handleAddMatchClose}
        selectedLeague={selectedLeague}
        teams={teams}
        newMatch={newMatch}
        handleMatchChange={handleMatchChange}
        handleAddMatch={handleAddMatch}
      />

      {/* Edit League Dialog */}
      <EditLeagueDialog
        open={openEditLeague}
        onClose={handleEditLeagueClose}
        leagueSettings={leagueSettings}
        handleLeagueSettingChange={handleLeagueSettingChange}
        handleUpdateLeague={handleUpdateLeague}
      />

      <FeaturedTeams />
    </Container>
  );
};

export default LeagueManagement;
