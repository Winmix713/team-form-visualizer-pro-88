
import { Header } from "@/components/Header";
import StatisticsOverview from "@/components/statistics/StatisticsOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { mockMatches } from "@/data/mockData";
import { calculateStandings } from "@/utils/calculations";
import { useMatchesByRound } from "@/hooks/useMatchesByRound";

export default function StatisticsPage() {
  const matches = mockMatches;
  const standings = calculateStandings(matches);
  const matchesByRound = useMatchesByRound(matches);
  const rounds = Object.keys(matchesByRound).sort((a, b) => Number(a) - Number(b));

  // Calculate goals per round
  const goalsPerRound = rounds.map(round => {
    const roundMatches = matchesByRound[round] || [];
    const goals = roundMatches.reduce(
      (sum, match) => sum + match.home_score + match.away_score, 
      0
    );
    return { round, goals };
  });
  
  return (
    <div className="min-h-screen bg-[#101820] text-white">
      <Header currentSeason="2023-2024" />
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="relative overflow-hidden rounded-xl bg-[#0a0f14] border border-white/5 shadow-lg">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="relative p-6">
            <h1 className="text-3xl font-bold text-white mb-6">League Statistics</h1>
            
            <div className="grid grid-cols-1 gap-6">
              <StatisticsOverview matches={matches} standings={standings} />
              
              <Card className="bg-black/20 border-white/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-white">Goals Per Round</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-80 w-full">
                    <div className="flex h-full items-end">
                      {goalsPerRound.map(({ round, goals }) => (
                        <div key={round} className="group flex flex-col items-center mx-1 flex-1">
                          <div 
                            className="w-full bg-blue-500/70 hover:bg-blue-500 transition-colors rounded-t-sm"
                            style={{ height: `${Math.max((goals / 30) * 100, 10)}%` }}
                          />
                          <div className="mt-2 text-xs text-gray-400 group-hover:text-white transition-colors">
                            {round}
                          </div>
                          <div className="mt-1 text-sm font-medium text-white">
                            {goals}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </main>
    </div>
  );
}
