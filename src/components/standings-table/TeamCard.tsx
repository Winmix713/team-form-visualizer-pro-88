
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { StandingsEntry } from "@/types";
import { Medal } from "lucide-react";
import { getHungarianTeamName } from "@/data/teamsData";

interface TeamCardProps {
  entry: StandingsEntry;
  maxPoints: number;
}

export const TeamCard = ({ entry, maxPoints }: TeamCardProps) => {
  const teamName = getHungarianTeamName(entry.team);
  const pointsPercentage = Math.round((entry.points / maxPoints) * 100);
  
  return (
    <Card className={cn(
      "animate-in fade-in-50 bg-black/20 border-white/5 overflow-hidden transition-all duration-200 hover:bg-black/30",
      entry.position === 1 && "border-blue-500/20",
      entry.position <= 4 && "border-blue-500/10",
      entry.position >= 18 && "border-red-500/10",
    )}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="font-semibold text-lg text-white">{teamName}</div>
            <div className="text-sm text-gray-400 mt-0.5">
              {entry.won}W {entry.drawn}D {entry.lost}L
            </div>
          </div>
          <div className="flex items-center">
            <div className={cn(
              "text-lg font-bold flex items-center justify-center w-7 h-7 rounded-full",
              entry.position === 1 && "bg-blue-500 text-white",
              entry.position > 1 && entry.position <= 4 && "bg-blue-500/20 text-blue-400",
              entry.position > 4 && entry.position <= 7 && "bg-amber-500/20 text-amber-400",
              entry.position >= 18 && "bg-red-500/20 text-red-400"
            )}>
              {entry.position === 1 ? <Medal className="w-3.5 h-3.5" /> : entry.position}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Points</span>
              <span className="font-medium text-white">{entry.points}</span>
            </div>
            <Progress 
              value={pointsPercentage} 
              className="h-1.5 bg-white/5" 
              indicatorClassName={cn(
                entry.position === 1 && "bg-blue-500",
                entry.position > 1 && entry.position <= 4 && "bg-blue-400",
                entry.position > 4 && entry.position <= 7 && "bg-amber-400",
                entry.position > 7 && entry.position < 18 && "bg-white",
                entry.position >= 18 && "bg-red-400"
              )}
            />
          </div>

          <div className="flex justify-between">
            <div>
              <div className="text-xs text-gray-400">Played</div>
              <div className="font-medium">{entry.played}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Goals</div>
              <div className="font-medium">{entry.goalsFor} : {entry.goalsAgainst}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">GD</div>
              <div className={cn(
                "font-medium",
                entry.goalDifference > 0 && "text-emerald-500",
                entry.goalDifference < 0 && "text-red-500"
              )}>
                {entry.goalDifference > 0 ? "+" : ""}{entry.goalDifference}
              </div>
            </div>
          </div>

          {entry.form && entry.form.length > 0 && (
            <div>
              <div className="text-xs text-gray-400 mb-1.5">Form</div>
              <div className="flex gap-1">
                {entry.form.map((result, i) => (
                  <div key={i} className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-sm text-xs font-medium",
                    result === "W" && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
                    result === "D" && "bg-amber-500/20 text-amber-400 border border-amber-500/30",
                    result === "L" && "bg-red-500/20 text-red-400 border border-red-500/30"
                  )}>
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
