
import { useTeamData } from '@/hooks/useTeamData';
import { useTeamStats } from '@/hooks/useTeamStats';
import LoadingSpinner from '@/components/dashboard-new/LoadingSpinner';
import DashboardLayout from '@/components/dashboard-new/DashboardLayout';
import DashboardHeader from '@/components/dashboard-new/DashboardHeader';
import TeamsList from '@/components/dashboard-new/TeamsList';
import TeamStatsSection from '@/components/dashboard-new/TeamStatsSection';
import FeaturedTeams from '@/components/dashboard-new/FeaturedTeams';

const Index = () => {
  const { 
    teams, 
    matches, 
    players, 
    loading, 
    filter, 
    setFilter, 
    searchQuery, 
    setSearchQuery, 
    filteredTeams 
  } = useTeamData();
  
  const { teamStats, topScorers } = useTeamStats(teams, matches, players);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <DashboardLayout
      header={
        <DashboardHeader
          searchQuery={searchQuery}
          filter={filter}
          setSearchQuery={setSearchQuery}
          setFilter={setFilter}
        />
      }
      mainContent={
        <TeamsList filteredTeams={filteredTeams} />
      }
      sidebarContent={
        <TeamStatsSection 
          teams={teams} 
          topScorers={topScorers} 
          teamStats={teamStats} 
        />
      }
      featuredSection={
        <FeaturedTeams />
      }
    />
  );
};

export default Index;
