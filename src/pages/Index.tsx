
import { useState } from "react";
import { Header } from "@/components/Header";
import { FormTable } from "@/components/FormTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Trophy } from "lucide-react";
import TopPerformersCard from "@/components/TopPerformersCard";
import { mockTeamForms, mockMatches } from "@/data/mockData";
import { Match } from "@/types";
import RecentMatches from "@/components/RecentMatches";

const Index = () => {
  const [teamForms] = useState(mockTeamForms);
  const [matches] = useState<Match[]>(mockMatches);
  
  return (
    <div className="min-h-screen bg-[#101820] text-white">
      <Header currentSeason="2023-2024" />
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="bg-black/20 border-white/5 lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-white">Magyar Bajnokság Áttekintés</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                  <div className="text-sm text-gray-400">Csapatok</div>
                  <div className="text-2xl font-bold text-white">{teamForms.length}</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                  <div className="text-sm text-gray-400">Lejátszott meccsek</div>
                  <div className="text-2xl font-bold text-white">{matches.length}</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                  <div className="text-sm text-gray-400">Szerzett gólok</div>
                  <div className="text-2xl font-bold text-white">
                    {matches.reduce((sum, match) => sum + match.home_score + match.away_score, 0)}
                  </div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                  <div className="text-sm text-gray-400">Átlag gól/meccs</div>
                  <div className="text-2xl font-bold text-white">
                    {matches.length > 0 
                      ? (matches.reduce((sum, match) => sum + match.home_score + match.away_score, 0) / matches.length).toFixed(2) 
                      : '0.00'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <TopPerformersCard teams={teamForms} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <FormTable teamForms={teamForms} />
          </div>
          
          <div>
            <RecentMatches matches={matches} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
