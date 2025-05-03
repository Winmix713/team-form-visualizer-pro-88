
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { Match } from "@/types";
import RecentMatchItem from "./recent-matches/RecentMatchItem";

interface RecentMatchesProps {
  matches: Match[];
}

const RecentMatches = ({ matches }: RecentMatchesProps) => {
  const recentMatches = useMemo(() => {
    return [...matches]
      .sort((a, b) => {
        // Defensive mechanism against invalid dates
        try {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          
          // Check for valid dates
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0;
          }
          
          return dateB.getTime() - dateA.getTime();
        } catch (error) {
          console.error("Invalid date format:", error, a.date, b.date);
          return 0;
        }
      })
      .slice(0, 5);
  }, [matches]);

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
          <RecentMatchItem key={index} match={match} />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentMatches;
