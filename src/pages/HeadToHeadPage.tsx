
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import TeamSelector from "@/components/h2h/TeamSelector";
import HeadToHeadComparison from "@/components/h2h/HeadToHeadComparison";
import { Team, TEAMS, findTeamByName } from "@/data/teamsData";
import { mockMatches } from "@/data/mockData";
import { calculateStandings } from "@/utils/calculations";

export default function HeadToHeadPage() {
  const [searchParams] = useSearchParams();
  const initialTeamId = searchParams.get('team');
  
  const [team1, setTeam1] = useState<Team | undefined>(
    initialTeamId ? TEAMS.find(t => t.id.toLowerCase() === initialTeamId.toLowerCase()) : undefined
  );
  const [team2, setTeam2] = useState<Team | undefined>();
  
  const matches = mockMatches;
  const standings = calculateStandings(matches);

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      <Header currentSeason="2023-2024" />
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="relative overflow-hidden rounded-xl bg-[#0a0f14] border border-white/5 shadow-lg">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="relative p-6">
            <h1 className="text-3xl font-bold text-white mb-2">Head to Head Comparison</h1>
            <p className="text-gray-400 mb-6">Compare statistics and head-to-head results between two teams.</p>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Team 1</h2>
                  <TeamSelector 
                    selectedTeam={team1} 
                    onSelectTeam={setTeam1}
                    excludeTeamId={team2?.id}
                  />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Team 2</h2>
                  <TeamSelector 
                    selectedTeam={team2} 
                    onSelectTeam={setTeam2}
                    excludeTeamId={team1?.id}
                  />
                </div>
              </div>
              
              <HeadToHeadComparison 
                team1={team1} 
                team2={team2} 
                matches={matches}
                standings={standings}
              />
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </main>
    </div>
  );
}
