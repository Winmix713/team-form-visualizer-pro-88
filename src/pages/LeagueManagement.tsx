
import { useLeagueManagement } from '@/hooks/useLeagueManagement';
import LoadingSpinner from '@/components/dashboard-new/LoadingSpinner';
import LeagueManagementHeader from '@/components/league-management-new/LeagueManagementHeader';
import LeagueTabPanel from '@/components/league-management-new/LeagueTabPanel';
import AddMatchDialog from '@/components/league-management-new/AddMatchDialog';
import EditLeagueDialog from '@/components/league-management-new/EditLeagueDialog';

// Import existing tab components (these were listed as read-only)
import StandingsTab from '../components/league-management/StandingsTab';
import RecentMatchesTab from '../components/league-management/RecentMatchesTab';
import TopScorersTab from '../components/league-management/TopScorersTab';
import TeamPerformanceTab from '../components/league-management/TeamPerformanceTab';
import FeaturedTeams from '@/components/dashboard-new/FeaturedTeams';

// Import Shadcn UI components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LeagueManagement = () => {
  const {
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
  } = useLeagueManagement();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <LeagueManagementHeader
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
        handleAddMatchOpen={handleAddMatchOpen}
        handleEditLeagueOpen={handleEditLeagueOpen}
      />

      <div className="mt-8">
        <Tabs 
          defaultValue="standings" 
          onValueChange={(value) => {
            if (value === "standings") setTabValue(0);
            else if (value === "matches") setTabValue(1);
            else if (value === "scorers") setTabValue(2);
            else if (value === "performance") setTabValue(3);
          }}
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="standings">Standings</TabsTrigger>
            <TabsTrigger value="matches">Recent Matches</TabsTrigger>
            <TabsTrigger value="scorers">Top Scorers</TabsTrigger>
            <TabsTrigger value="performance">Team Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="standings">
            <StandingsTab 
              teams={teams} 
              matches={matches} 
              selectedLeague={selectedLeague} 
            />
          </TabsContent>

          <TabsContent value="matches">
            <RecentMatchesTab 
              teams={teams} 
              matches={matches} 
              selectedLeague={selectedLeague} 
            />
          </TabsContent>

          <TabsContent value="scorers">
            <TopScorersTab 
              players={players} 
              teams={teams} 
              selectedLeague={selectedLeague} 
            />
          </TabsContent>

          <TabsContent value="performance">
            <TeamPerformanceTab 
              teams={teams} 
              matches={matches} 
              selectedLeague={selectedLeague} 
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <AddMatchDialog
        open={openAddMatch}
        onClose={handleAddMatchClose}
        selectedLeague={selectedLeague}
        teams={teams}
        newMatch={newMatch}
        handleMatchChange={handleMatchChange}
        handleAddMatch={handleAddMatch}
      />

      <EditLeagueDialog
        open={openEditLeague}
        onClose={handleEditLeagueClose}
        leagueSettings={leagueSettings}
        handleLeagueSettingChange={handleLeagueSettingChange}
        handleUpdateLeague={handleUpdateLeague}
      />

      <div className="mt-8">
        <FeaturedTeams />
      </div>
    </div>
  );
};

export default LeagueManagement;
