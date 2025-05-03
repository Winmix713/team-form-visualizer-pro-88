
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { TeamForm } from "@/types";

interface TeamStatsProps {
  stats?: TeamForm;
  isLoading: boolean;
}

const StatItem = memo(({ title, value, color = "blue" }: { title: string; value: string | number; color?: string }) => {
  const getColor = () => {
    switch (color) {
      case "green": return "text-emerald-400";
      case "red": return "text-red-400";
      case "yellow": return "text-amber-400";
      default: return "text-blue-400";
    }
  };

  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${getColor()}`}>{value}</div>
      <div className="text-xs text-gray-400 mt-1">{title}</div>
    </div>
  );
});

StatItem.displayName = "StatItem";

const TeamStats = memo(({ stats, isLoading }: TeamStatsProps) => {
  if (isLoading) {
    return (
      <Card className="bg-black/20 border-white/5">
        <CardContent className="p-6">
          <div className="animate-pulse flex justify-between">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="space-y-2">
                <div className="h-6 w-12 bg-gray-700/50 rounded mx-auto"></div>
                <div className="h-4 w-16 bg-gray-700/50 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card className="bg-black/20 border-white/5">
        <CardContent className="p-6 text-center">
          <div className="text-white opacity-70">No stats available for this team.</div>
        </CardContent>
      </Card>
    );
  }

  // Calculate win rate
  const formArray = Array.isArray(stats.form) ? stats.form : (typeof stats.form === "string" ? stats.form.split("") : []);
  const winCount = formArray.filter(result => result === "W").length;
  const drawCount = formArray.filter(result => result === "D").length;
  const lossCount = formArray.filter(result => result === "L").length;
  
  const winRate = stats.played > 0 ? Math.round((winCount / stats.played) * 100) : 0;
  const goalDiff = stats.goalsFor - stats.goalsAgainst;

  return (
    <Card className="bg-black/20 border-white/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium text-white">Season Statistics</h3>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <StatItem title="Matches" value={stats.played} />
          <StatItem title="Wins" value={winCount} color="green" />
          <StatItem title="Draws" value={drawCount} color="yellow" />
          <StatItem title="Losses" value={lossCount} color="red" />
          <StatItem title="Win Rate" value={`${winRate}%`} />
        </div>

        <div className="h-px bg-white/5 my-6" />

        <div className="grid grid-cols-3 gap-4">
          <StatItem title="Points" value={stats.points} color="blue" />
          <StatItem title="Goals Scored" value={stats.goalsFor} color="green" />
          <StatItem title="Goal Difference" value={goalDiff > 0 ? `+${goalDiff}` : goalDiff} color={goalDiff > 0 ? "green" : "red"} />
        </div>
      </CardContent>
    </Card>
  );
});

TeamStats.displayName = "TeamStats";

export default TeamStats;
