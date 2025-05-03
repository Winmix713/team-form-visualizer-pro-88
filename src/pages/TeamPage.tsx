
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import TeamHeader from "@/components/team-page/TeamHeader";
import TeamStats from "@/components/team-page/TeamStats";
import TeamMatches from "@/components/team-page/TeamMatches";
import { TEAMS, findTeamByName } from "@/data/teamsData";
import { mockMatches } from "@/data/mockData";
import { calculateStandings } from "@/utils/calculations";
import { TeamForm } from "@/types";

export default function TeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  const team = TEAMS.find(t => t.id.toLowerCase() === teamId?.toLowerCase());
  const matches = mockMatches;
  const standings = calculateStandings(matches);
  
  const teamStats = standings.find(
    stats => stats.team.toLowerCase() === teamId?.toLowerCase()
  );

  // Simulate loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [teamId]);

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      <Header currentSeason="2023-2024" />
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="relative overflow-hidden rounded-xl bg-[#0a0f14] border border-white/5 shadow-lg">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="relative p-6">
            <TeamHeader team={team} isLoading={isLoading} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TeamStats stats={teamStats} isLoading={isLoading} />
              <TeamMatches matches={matches} teamId={teamId || ""} isLoading={isLoading} />
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </main>
    </div>
  );
}
