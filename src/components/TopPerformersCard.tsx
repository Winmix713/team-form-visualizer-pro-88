
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { TeamForm } from "@/types";
import TopPerformerItem from "./top-performers/TopPerformerItem";

interface TopPerformersCardProps {
  teams: TeamForm[];
}

const TopPerformersCard = ({ teams }: TopPerformersCardProps) => {
  const topTeams = useMemo(() => {
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    return sortedTeams.slice(0, 3);
  }, [teams]);

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
        {topTeams.map((team, index) => (
          <TopPerformerItem key={team.team} team={team} index={index} />
        ))}
      </CardContent>
    </Card>
  );
};

export default TopPerformersCard;
