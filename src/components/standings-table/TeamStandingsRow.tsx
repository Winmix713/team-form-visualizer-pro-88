
import { TableRow, TableCell } from "@/components/ui/table";
import { Medal, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { StandingsEntry } from "@/types";
import { ZonesConfig } from "@/hooks/useZones";
import { getHungarianTeamName } from "@/data/teamsData";

interface TeamStandingsRowProps {
  entry: StandingsEntry;
  zones: ZonesConfig | null;
}

export const TeamStandingsRow = ({ entry, zones }: TeamStandingsRowProps) => {
  const positionChange = entry.previousPosition ? entry.previousPosition - entry.position : 0;
  
  // Always use Hungarian team names
  const teamName = getHungarianTeamName(entry.team);

  return (
    <TableRow
      className={cn(
        "border-b border-white/5 hover:bg-white/5",
        zones?.champions === entry.position && "bg-blue-500/5",
        zones?.championsLeague >= entry.position &&
          entry.position > (zones?.champions || 0) &&
          "bg-blue-500/5",
        zones?.europaLeague >= entry.position &&
          entry.position > (zones?.championsLeague || 0) &&
          "bg-amber-500/5",
        entry.position > (zones?.relegation || 0) && "bg-red-500/5"
      )}
    >
      <TableCell className="relative px-4 py-3 font-medium">
        <div className="flex items-center gap-2">
          <span>{entry.position}</span>
          {positionChange !== 0 && (
            <span
              className={cn(
                "text-xs",
                positionChange > 0 && "text-emerald-500",
                positionChange < 0 && "text-red-500"
              )}
            >
              {positionChange > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
            </span>
          )}
          {zones?.champions === entry.position && <Medal className="h-3 w-3 text-blue-500" />}
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 font-medium text-white">
        {teamName}
        {entry.form && (
          <div className="mt-1 flex gap-0.5">
            {entry.form.map((result, i) => (
              <span
                key={i}
                className={cn(
                  "inline-flex h-1.5 w-1.5 rounded-full",
                  result === "W" && "bg-emerald-500",
                  result === "D" && "bg-amber-500",
                  result === "L" && "bg-red-500"
                )}
              />
            ))}
          </div>
        )}
      </TableCell>
      <TableCell className="px-4 py-3 text-center text-white">{entry.played}</TableCell>
      <TableCell className="px-4 py-3 text-center text-emerald-500">{entry.won}</TableCell>
      <TableCell className="px-4 py-3 text-center text-amber-500">{entry.drawn}</TableCell>
      <TableCell className="px-4 py-3 text-center text-red-500">{entry.lost}</TableCell>
      <TableCell className="px-4 py-3 text-center text-white">{entry.goalsFor}</TableCell>
      <TableCell className="px-4 py-3 text-center text-white">{entry.goalsAgainst}</TableCell>
      <TableCell
        className={cn(
          "px-4 py-3 text-center",
          entry.goalDifference > 0 && "text-emerald-500",
          entry.goalDifference < 0 && "text-red-500"
        )}
      >
        {entry.goalDifference > 0 && "+"}
        {entry.goalDifference}
      </TableCell>
      <TableCell className="px-4 py-3 text-center font-bold">{entry.points}</TableCell>
    </TableRow>
  );
};
