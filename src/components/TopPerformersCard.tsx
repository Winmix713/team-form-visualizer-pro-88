
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { TeamForm } from "@/types";
import { getHungarianTeamName } from "@/data/teamsData";

interface TopPerformersCardProps {
  teams: TeamForm[];
}

const TopPerformersCard = ({ teams }: TopPerformersCardProps) => {
  const topTeams = useMemo(() => {
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    return sortedTeams.slice(0, 3);
  }, [teams]);

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case 1:
        return "bg-gray-400/20 text-gray-300 border-gray-400/30";
      case 2:
        return "bg-amber-700/20 text-amber-600 border-amber-700/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  if (teams.length === 0) {
    return (
      <Card className="bg-black/20 border-white/5">
        <CardContent className="p-6 text-center">
          <div className="text-white opacity-70">No team data available.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/20 border-white/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-white">Top Performers</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {topTeams.map((team, index) => {
          const formArray = Array.isArray(team.form) ? team.form : typeof team.form === "string" ? team.form.split("") : [];
          const winCount = formArray.filter(result => result === "W").length;
          const winRate = team.played > 0 ? Math.round((winCount / team.played) * 100) : 0;
          
          // Alkalmazzuk a magyar csapatnév konverziót
          const teamName = getHungarianTeamName(team.team);
          
          return (
            <div 
              key={team.team} 
              className={`flex items-center justify-between p-3 rounded-lg border ${getMedalColor(index)}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getMedalColor(index)}`}>
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-white">{teamName}</div>
                  <div className="text-xs text-gray-400">
                    Win rate: {winRate}% · {team.goalsFor} goals
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{team.points}</div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TopPerformersCard;
