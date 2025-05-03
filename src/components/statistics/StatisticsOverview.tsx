
import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";
import { Match, TeamForm } from "@/types";
import { getHungarianTeamName } from "@/data/teamsData";

interface StatisticsOverviewProps {
  matches: Match[];
  standings: TeamForm[];
}

const StatisticsOverview = memo(({ matches, standings }: StatisticsOverviewProps) => {
  const stats = useMemo(() => {
    // Total goals calculation
    const totalGoals = matches.reduce(
      (sum, match) => sum + match.home_score + match.away_score, 
      0
    );
    
    // Goals per match
    const goalsPerMatch = matches.length > 0 
      ? (totalGoals / matches.length).toFixed(2) 
      : 0;
    
    // Most goals in a match
    let matchWithMostGoals = matches[0];
    let maxGoals = 0;
    
    matches.forEach(match => {
      const goals = match.home_score + match.away_score;
      if (goals > maxGoals) {
        maxGoals = goals;
        matchWithMostGoals = match;
      }
    });
    
    // Highest scoring team
    const highestScoringTeam = standings.length > 0 
      ? standings.reduce((prev, current) => 
          (prev.goalsFor > current.goalsFor) ? prev : current
        ) 
      : null;
    
    // Best defense
    const bestDefense = standings.length > 0 
      ? standings.reduce((prev, current) => 
          (prev.goalsAgainst < current.goalsAgainst) ? prev : current
        )
      : null;
    
    return {
      totalGoals,
      goalsPerMatch,
      matchWithMostGoals,
      maxGoals,
      highestScoringTeam,
      bestDefense
    };
  }, [matches, standings]);
  
  return (
    <Card className="bg-black/20 border-white/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-white">Key Statistics</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/30 rounded-lg p-4 border border-white/5">
              <div className="text-sm text-gray-400 mb-1">Total Goals</div>
              <div className="text-3xl font-bold text-white">{stats.totalGoals}</div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 border border-white/5">
              <div className="text-sm text-gray-400 mb-1">Goals Per Match</div>
              <div className="text-3xl font-bold text-white">{stats.goalsPerMatch}</div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 border border-white/5">
              <div className="text-sm text-gray-400 mb-1">Highest Scoring Match</div>
              {stats.matchWithMostGoals ? (
                <>
                  <div className="text-xl font-bold text-white">
                    {getHungarianTeamName(stats.matchWithMostGoals.home_team)} {stats.matchWithMostGoals.home_score} - {stats.matchWithMostGoals.away_score} {getHungarianTeamName(stats.matchWithMostGoals.away_team)}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {stats.maxGoals} goals
                  </div>
                </>
              ) : (
                <div className="text-white opacity-70">No match data</div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-black/30 rounded-lg p-4 border border-white/5">
              <div className="text-sm text-gray-400 mb-1">Highest Scoring Team</div>
              {stats.highestScoringTeam ? (
                <>
                  <div className="text-xl font-bold text-white">
                    {getHungarianTeamName(stats.highestScoringTeam.team)}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {stats.highestScoringTeam.goalsFor} goals scored
                  </div>
                </>
              ) : (
                <div className="text-white opacity-70">No team data</div>
              )}
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 border border-white/5">
              <div className="text-sm text-gray-400 mb-1">Best Defense</div>
              {stats.bestDefense ? (
                <>
                  <div className="text-xl font-bold text-white">
                    {getHungarianTeamName(stats.bestDefense.team)}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {stats.bestDefense.goalsAgainst} goals conceded
                  </div>
                </>
              ) : (
                <div className="text-white opacity-70">No team data</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

StatisticsOverview.displayName = "StatisticsOverview";

export default StatisticsOverview;
