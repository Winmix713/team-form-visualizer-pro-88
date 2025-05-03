
import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, CircularProgress } from '@mui/material';
import { fetchTeams, fetchMatches, fetchPlayers } from '../api/dataService';
import { Team, Match, Player } from '../types';

// Import refactored components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import TeamsList from '../components/dashboard/TeamsList';
import CategoryDistributionChart from '../components/dashboard/CategoryDistributionChart';
import LeagueTableChart from '../components/dashboard/LeagueTableChart';
import TopScorers from '../components/dashboard/TopScorers';
import RecentMatchesSection from '../components/dashboard/RecentMatchesSection';
import FeaturedTeams from '../components/dashboard/FeaturedTeams';

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
      <DashboardHeader 
        searchQuery={searchQuery}
        filter={filter}
        setSearchQuery={setSearchQuery}
        setFilter={setFilter}
      />

      <Grid container spacing={4}>
        {/* Team List */}
        <Grid item xs={12} md={8}>
          <TeamsList filteredTeams={filteredTeams} />
        </Grid>

        {/* Stats & Charts */}
        <Grid item xs={12} md={4}>
          <CategoryDistributionChart teams={teams} />
          <LeagueTableChart teamStats={teamStats} />
          <TopScorers topScorers={topScorers} teams={teams} />
        </Grid>

        {/* Recent Matches */}
        <RecentMatchesSection matches={matches} teams={teams} />
      </Grid>

      {/* Featured Teams */}
      <FeaturedTeams />
    </Container>
  );
};

export default Index;
