
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import type { TeamForm } from "@/types";

interface TeamFormCardProps {
  team: TeamForm;
}

export const TeamFormCard = ({ team }: TeamFormCardProps) => {
  const formArray = Array.isArray(team.form) ? team.form : typeof team.form === "string" ? team.form.split("") : [];

  const winCount = formArray.filter((result) => result === "W").length;
  const drawCount = formArray.filter((result) => result === "D").length;
  const lossCount = formArray.filter((result) => result === "L").length;

  const totalMatches = formArray.length;
  const winPercentage = totalMatches > 0 ? (winCount / totalMatches) * 100 : 0;
  const drawPercentage = totalMatches > 0 ? (drawCount / totalMatches) * 100 : 0;
  const lossPercentage = totalMatches > 0 ? (lossCount / totalMatches) * 100 : 0;

  return (
    <Card className="bg-black/30 border-white/5 overflow-hidden">
      <div className="relative">
        <Progress
          value={winPercentage}
          className="h-1 w-full bg-black/50 rounded-none"
          indicatorClassName="bg-emerald-500"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
              {team.position}
            </div>
            <h3 className="font-bold text-white">{team.team}</h3>
          </div>
          <div className="text-2xl font-bold text-white">{team.points}</div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-white opacity-80">
            <span>Played: {team.played}</span>
          </div>
          <div className="text-xs text-white opacity-80">
            <span>GF: {team.goalsFor}</span> | <span>GA: {team.goalsAgainst}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white">Recent Form</span>
            <div className="flex gap-1">
              {formArray.slice(0, 5).map((result, i) => (
                <span
                  key={i}
                  className={`w-5 h-5 flex items-center justify-center text-xs font-semibold text-white rounded-full ${
                    result === "W" ? "bg-emerald-500" : result === "D" ? "bg-amber-500" : "bg-red-500"
                  }`}
                >
                  {result}
                </span>
              ))}
            </div>
          </div>

          <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full" style={{ width: `${winPercentage}%` }}></div>
            <div className="bg-amber-500 h-full" style={{ width: `${drawPercentage}%` }}></div>
            <div className="bg-red-500 h-full" style={{ width: `${lossPercentage}%` }}></div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs text-white">
            <div>
              <span className="text-emerald-400">{winCount}</span> Wins
            </div>
            <div>
              <span className="text-amber-400">{drawCount}</span> Draws
            </div>
            <div>
              <span className="text-red-400">{lossCount}</span> Losses
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
