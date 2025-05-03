
import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Match } from "@/types";
import RecentMatchItem from "../recent-matches/RecentMatchItem";

interface TeamMatchesProps {
  matches: Match[];
  teamId: string;
  isLoading: boolean;
}

const TeamMatches = memo(({ matches, teamId, isLoading }: TeamMatchesProps) => {
  const teamMatches = useMemo(() => {
    return matches
      .filter(match => 
        match.home_team.toLowerCase() === teamId.toLowerCase() || 
        match.away_team.toLowerCase() === teamId.toLowerCase()
      )
      .sort((a, b) => {
        try {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0;
          }
          
          return dateB.getTime() - dateA.getTime();
        } catch (error) {
          console.error("Invalid date format:", error);
          return 0;
        }
      });
  }, [matches, teamId]);

  if (isLoading) {
    return (
      <Card className="bg-black/20 border-white/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-white">Team Matches</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-black/30 rounded-lg p-3 border border-white/5">
              <div className="h-4 w-24 bg-gray-700/50 rounded mb-2"></div>
              <div className="flex justify-between">
                <div className="w-1/3">
                  <div className="h-5 w-20 bg-gray-700/50 rounded mb-1 ml-auto"></div>
                  <div className="h-3 w-12 bg-gray-700/50 rounded ml-auto"></div>
                </div>
                <div className="w-1/4 mx-4">
                  <div className="h-6 w-12 bg-gray-700/50 rounded mx-auto mb-1"></div>
                  <div className="h-3 w-16 bg-gray-700/50 rounded mx-auto"></div>
                </div>
                <div className="w-1/3">
                  <div className="h-5 w-20 bg-gray-700/50 rounded mb-1"></div>
                  <div className="h-3 w-12 bg-gray-700/50 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (teamMatches.length === 0) {
    return (
      <Card className="bg-black/20 border-white/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-white">Team Matches</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <div className="text-white opacity-70">No match data available for this team.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/20 border-white/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-white">Team Matches</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {teamMatches.slice(0, 10).map((match, index) => (
          <RecentMatchItem key={index} match={match} />
        ))}
      </CardContent>
    </Card>
  );
});

TeamMatches.displayName = "TeamMatches";

export default TeamMatches;
