
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { StandingsEntry } from "@/types";

interface TeamCardProps {
  entry: StandingsEntry;
  maxPoints: number;
}

export const TeamCard = ({ entry, maxPoints }: TeamCardProps) => {
  const winPercentage = entry.played > 0 ? (entry.won / entry.played) * 100 : 0;
  const drawPercentage = entry.played > 0 ? (entry.drawn / entry.played) * 100 : 0;
  const lossPercentage = entry.played > 0 ? (entry.lost / entry.played) * 100 : 0;
  const pointsPercentage = maxPoints > 0 ? (entry.points / maxPoints) * 100 : 0;

  return (
    <Card className="bg-black/30 border-white/5 overflow-hidden">
      <div className="relative">
        <Progress
          value={pointsPercentage}
          className="h-1 w-full bg-black/50 rounded-none"
          indicatorClassName="bg-blue-500"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
              {entry.position}
            </div>
            <h3 className="font-bold text-white">{entry.team}</h3>
          </div>
          <div className="text-2xl font-bold text-white">{entry.points}</div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-black/20 p-2 rounded text-center">
            <div className="text-emerald-400 font-bold">{entry.won}</div>
            <div className="text-xs text-gray-400">Wins</div>
          </div>
          <div className="bg-black/20 p-2 rounded text-center">
            <div className="text-amber-400 font-bold">{entry.drawn}</div>
            <div className="text-xs text-gray-400">Draws</div>
          </div>
          <div className="bg-black/20 p-2 rounded text-center">
            <div className="text-red-400 font-bold">{entry.lost}</div>
            <div className="text-xs text-gray-400">Losses</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white opacity-80">
            <span>Goals</span>
            <span>
              {entry.goalsFor} - {entry.goalsAgainst} ({entry.goalDifference > 0 ? "+" : ""}
              {entry.goalDifference})
            </span>
          </div>

          <div className="flex justify-between text-xs text-white opacity-80">
            <span>Form</span>
            <div className="flex gap-1">
              {entry.form?.slice(0, 5).map((result, i) => (
                <span
                  key={i}
                  className={`inline-flex h-2 w-2 rounded-full ${
                    result === "W" ? "bg-emerald-500" : result === "D" ? "bg-amber-500" : "bg-red-500"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="h-2 w-full bg-black/20 rounded-full mt-2 overflow-hidden flex">
            <div className="bg-emerald-500 h-full" style={{ width: `${winPercentage}%` }}></div>
            <div className="bg-amber-500 h-full" style={{ width: `${drawPercentage}%` }}></div>
            <div className="bg-red-500 h-full" style={{ width: `${lossPercentage}%` }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
