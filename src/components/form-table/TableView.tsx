
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TeamForm } from "@/types";
import { PositionIndicator } from "./PositionIndicator";
import { FormResult } from "./FormResult";
import { SortIcon } from "./SortIcon";
import { getHungarianTeamName } from "@/data/teamsData";

interface TableViewProps {
  teams: TeamForm[];
  requestSort: (key: string) => void;
  sortConfig: {
    key: string;
    direction: "asc" | "desc";
  } | null;
}

export const TableView = ({ teams, requestSort, sortConfig }: TableViewProps) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-black/20 border border-white/5">
      <Table>
        <TableHeader className="bg-black/40">
          <TableRow className="border-b border-white/5 hover:bg-transparent">
            <TableHead className="text-gray-400 font-normal">
              <Button
                variant="ghost"
                onClick={() => requestSort("position")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center"
              >
                Pos <SortIcon sortKey="position" sortConfig={sortConfig} />
              </Button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal">
              <Button
                variant="ghost"
                onClick={() => requestSort("team")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center"
              >
                Team <SortIcon sortKey="team" sortConfig={sortConfig} />
              </Button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal text-center">
              <Button
                variant="ghost"
                onClick={() => requestSort("played")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center justify-center"
              >
                P <SortIcon sortKey="played" sortConfig={sortConfig} />
              </Button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal text-center">
              <Button
                variant="ghost"
                onClick={() => requestSort("goalsFor")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center justify-center"
              >
                GF <SortIcon sortKey="goalsFor" sortConfig={sortConfig} />
              </Button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal text-center">
              <Button
                variant="ghost"
                onClick={() => requestSort("goalsAgainst")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center justify-center"
              >
                GA <SortIcon sortKey="goalsAgainst" sortConfig={sortConfig} />
              </Button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal text-center">GD</TableHead>
            <TableHead className="text-gray-400 font-normal text-center">
              <Button
                variant="ghost"
                onClick={() => requestSort("points")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center justify-center"
              >
                Pts <SortIcon sortKey="points" sortConfig={sortConfig} />
              </Button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal text-center">Form</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team, index) => {
            // Ensure we use the Hungarian team name
            const hungarianTeamName = getHungarianTeamName(team.team);
            
            return (
              <TableRow key={`${team.team}-${index}`} className="border-b border-white/5 hover:bg-white/5">
                <TableCell>
                  <PositionIndicator
                    position={team.position}
                    prevPosition={index > 0 ? teams[index - 1].position : undefined}
                  />
                </TableCell>
                <TableCell className="font-medium text-white">{hungarianTeamName}</TableCell>
                <TableCell className="text-center text-white">{team.played}</TableCell>
                <TableCell className="text-center text-white">{team.goalsFor}</TableCell>
                <TableCell className="text-center text-white">{team.goalsAgainst}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={
                      team.goalsFor - team.goalsAgainst > 0
                        ? "text-emerald-400"
                        : team.goalsFor - team.goalsAgainst < 0
                        ? "text-red-400"
                        : ""
                    }
                  >
                    {team.goalsFor - team.goalsAgainst > 0 && "+"}
                    {team.goalsFor - team.goalsAgainst}
                  </span>
                </TableCell>
                <TableCell className="text-center font-bold">{team.points}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1.5">
                    {Array.isArray(team.form)
                      ? team.form.map((result, i) => <FormResult key={i} result={result} />)
                      : typeof team.form === "string"
                      ? team.form.split("").map((result, i) => <FormResult key={i} result={result} />)
                      : null}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {teams.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center text-white opacity-70">
                No teams found with the current filter.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
