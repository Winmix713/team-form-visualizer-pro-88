
import { useState, useEffect } from 'react';
import { Team, Match, Player } from '@/types';

export const useTeamData = () => {
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
        // Mock data for now
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

  const filteredTeams = teams
    .filter((team) => {
      if (filter === 'all') return true;
      return team.category === filter;
    })
    .filter((team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return {
    teams,
    matches,
    players,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    filteredTeams
  };
};
