
import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight } from "lucide-react";
import { Team } from "@/data/teamsData";
import { Match, TeamForm } from "@/types";
import RecentMatchItem from "../recent-matches/RecentMatchItem";

interface HeadToHeadComparisonProps {
  team1?: Team;
  team2?: Team;
  matches: Match[];
  standings: TeamForm[];
}

const HeadToHeadComparison = memo(({ team1, team2, matches, standings }: HeadToHeadComparisonProps) => {
  const h2hMatches = useMemo(() => {
    if (!team1 || !team2) return [];
    
    return matches.filter(match => 
      (match.home_team.toLowerCase() === team1.id.toLowerCase() && 
       match.away_team.toLowerCase() === team2.id.toLowerCase()) ||
      (match.home_team.toLowerCase() === team2.id.toLowerCase() && 
       match.away_team.toLowerCase() === team1.id.toLowerCase())
    ).sort((a, b) => {
      try {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          return 0;
        }
        
        return dateB.getTime() - dateA.getTime();
      } catch (error) {
        return 0;
      }
    });
  }, [team1, team2, matches]);
  
  const team1Stats = useMemo(() => {
    if (!team1) return null;
    return standings.find(stats => stats.team.toLowerCase() === team1.id.toLowerCase());
  }, [team1, standings]);
  
  const team2Stats = useMemo(() => {
    if (!team2) return null;
    return standings.find(stats => stats.team.toLowerCase() === team2.id.toLowerCase());
  }, [team2, standings]);
  
  const h2hStats = useMemo(() => {
    if (!team1 || !team2 || h2hMatches.length === 0) return null;
    
    let team1Wins = 0;
    let team2Wins = 0;
    let draws = 0;
    let team1Goals = 0;
    let team2Goals = 0;
    
    h2hMatches.forEach(match => {
      if (match.home_team.toLowerCase() === team1.id.toLowerCase()) {
        team1Goals += match.home_score;
        team2Goals += match.away_score;
        
        if (match.home_score > match.away_score) team1Wins++;
        else if (match.home_score < match.away_score) team2Wins++;
        else draws++;
      } else {
        team1Goals += match.away_score;
        team2Goals += match.home_score;
        
        if (match.away_score > match.home_score) team1Wins++;
        else if (match.away_score < match.home_score) team2Wins++;
        else draws++;
      }
    });
    
    return {
      matchesCount: h2hMatches.length,
      team1Wins,
      team2Wins,
      draws,
      team1Goals,
      team2Goals
    };
  }, [team1, team2, h2hMatches]);
  
  // If either team is not selected, show a prompt
  if (!team1 || !team2) {
    return (
      <Card className="bg-black/20 border-white/5">
        <CardContent className="p-8 text-center">
          <div className="text-white opacity-70">
            {!team1 && !team2
              ? "Select two teams to compare head-to-head statistics"
              : "Select another team to compare head-to-head statistics"}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-white/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-white">Head to Head Comparison</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="w-1/3 text-center">
              <div className="w-16 h-16 rounded-full bg-black/30 border border-white/10 flex items-center justify-center p-2 mx-auto">
                {team1.logoUrl ? (
                  <img
                    src={team1.logoUrl}
                    alt={`${team1.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-2xl font-bold text-white opacity-30">
                    {team1.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="mt-2 text-lg font-medium text-white">{team1.name}</div>
              <div className="text-sm text-gray-400">{team1Stats?.position || '-'}. place</div>
            </div>
            
            <div className="w-1/3 flex flex-col items-center">
              {h2hStats ? (
                <div className="text-center px-4 py-2 bg-black/30 rounded-lg border border-white/10">
                  <div className="text-2xl font-bold text-white">
                    {h2hStats.team1Wins} - {h2hStats.draws} - {h2hStats.team2Wins}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Total matches: {h2hStats.matchesCount}
                  </div>
                </div>
              ) : (
                <div className="text-center px-4 py-2">
                  <div className="text-white opacity-70">No matches found</div>
                </div>
              )}
            </div>
            
            <div className="w-1/3 text-center">
              <div className="w-16 h-16 rounded-full bg-black/30 border border-white/10 flex items-center justify-center p-2 mx-auto">
                {team2.logoUrl ? (
                  <img
                    src={team2.logoUrl}
                    alt={`${team2.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-2xl font-bold text-white opacity-30">
                    {team2.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="mt-2 text-lg font-medium text-white">{team2.name}</div>
              <div className="text-sm text-gray-400">{team2Stats?.position || '-'}. place</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center py-3 bg-black/30 rounded-lg border border-white/10">
              <div className="text-sm text-gray-400 mb-1">Points</div>
              <div className="text-xl font-bold text-white">{team1Stats?.points || '0'}</div>
            </div>
            <div className="text-center py-3 bg-black/30 rounded-lg border border-white/10">
              <div className="text-sm text-gray-400 mb-1">Goals Scored</div>
              <div className="text-xl font-bold text-white">{team1Stats?.goalsFor || '0'}</div>
            </div>
            <div className="text-center py-3 bg-black/30 rounded-lg border border-white/10">
              <div className="text-sm text-gray-400 mb-1">Goals Conceded</div>
              <div className="text-xl font-bold text-white">{team1Stats?.goalsAgainst || '0'}</div>
            </div>
            
            <div className="text-center py-3 bg-black/30 rounded-lg border border-white/10">
              <div className="text-sm text-gray-400 mb-1">Points</div>
              <div className="text-xl font-bold text-white">{team2Stats?.points || '0'}</div>
            </div>
            <div className="text-center py-3 bg-black/30 rounded-lg border border-white/10">
              <div className="text-sm text-gray-400 mb-1">Goals Scored</div>
              <div className="text-xl font-bold text-white">{team2Stats?.goalsFor || '0'}</div>
            </div>
            <div className="text-center py-3 bg-black/30 rounded-lg border border-white/10">
              <div className="text-sm text-gray-400 mb-1">Goals Conceded</div>
              <div className="text-xl font-bold text-white">{team2Stats?.goalsAgainst || '0'}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/20 border-white/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Head to Head Matches</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {h2hMatches.length > 0 ? (
            h2hMatches.map((match, index) => (
              <RecentMatchItem key={index} match={match} />
            ))
          ) : (
            <div className="py-6 text-center">
              <div className="text-white opacity-70">No head-to-head matches found.</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

HeadToHeadComparison.displayName = "HeadToHeadComparison";

export default HeadToHeadComparison;
