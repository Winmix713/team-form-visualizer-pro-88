
import { useState, useEffect } from 'react';
import { Match, League } from '@/types';

export const useLeagueManagement = () => {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState([]);
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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Mock data for now - would be replaced with actual API calls
        setTeams([]);
        setMatches([]);
        setPlayers([]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddMatchOpen = () => setOpenAddMatch(true);
  const handleAddMatchClose = () => setOpenAddMatch(false);
  const handleEditLeagueOpen = () => setOpenEditLeague(true);
  const handleEditLeagueClose = () => setOpenEditLeague(false);

  const handleMatchChange = (field: keyof Match, value: any) => {
    setNewMatch({ ...newMatch, [field]: value });
  };

  const handleLeagueSettingChange = (field: keyof League, value: any) => {
    setLeagueSettings({ ...leagueSettings, [field]: value });
  };

  const handleAddMatch = async () => {
    try {
      if (!newMatch.homeTeamId || !newMatch.awayTeamId || newMatch.homeTeamId === newMatch.awayTeamId) {
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
      setOpenEditLeague(false);
      alert('League settings updated successfully');
    } catch (error) {
      console.error('Error updating league settings:', error);
      alert('Failed to update league settings');
    }
  };

  return {
    teams,
    matches,
    players,
    loading,
    tabValue,
    setTabValue,
    selectedLeague,
    setSelectedLeague,
    openAddMatch,
    openEditLeague,
    newMatch,
    leagueSettings,
    handleAddMatchOpen,
    handleAddMatchClose,
    handleEditLeagueOpen,
    handleEditLeagueClose,
    handleMatchChange,
    handleLeagueSettingChange,
    handleAddMatch,
    handleUpdateLeague,
  };
};
