
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { Match } from "@/types";

interface RecentMatchesProps {
  matches: Match[];
}

const RecentMatches = ({ matches }: RecentMatchesProps) => {
  const recentMatches = useMemo(() => {
    return [...matches]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [matches]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('hu-HU', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  if (matches.length === 0) {
    return (
      <Card className="bg-black/20 border-white/5">
        <CardContent className="p-6 text-center">
          <div className="text-white opacity-70">Nincs meccs adat.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/20 border-white/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-white">Legutóbbi Meccsek</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {recentMatches.map((match, index) => (
          <div key={index} className="bg-black/30 rounded-lg p-3 border border-white/5">
            <div className="text-xs text-gray-400 mb-2">
              {formatDate(match.date)}
              {match.round && ` · Forduló ${match.round}`}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex-1 text-right">
                <div className="font-medium text-white">{match.home_team}</div>
                <div className="text-xs text-gray-400">Hazai</div>
              </div>
              
              <div className="mx-4 text-center">
                <div className="font-bold text-2xl text-white">
                  {match.home_score} - {match.away_score}
                </div>
                <div className="text-xs text-gray-400">
                  HT: {match.ht_home_score} - {match.ht_away_score}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-white">{match.away_team}</div>
                <div className="text-xs text-gray-400">Vendég</div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentMatches;
