
import { memo } from "react"
import type { Match } from "@/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table"
import { getHungarianTeamName } from "@/data/teamsData"
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"
import MatchScore from "./MatchScore"

interface MatchesTableViewProps {
  matches: Match[]
  requestSort: (key: string) => void
  sortConfig: { key: string; direction: "asc" | "desc" } | null
}

const MatchesTableView = memo(({ matches, requestSort, sortConfig }: MatchesTableViewProps) => {
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    )
  }

  return (
    <div className="bg-black/30 rounded-xl overflow-hidden border border-white/5">
      <Table>
        <TableHeader className="bg-black/40">
          <TableRow className="border-b border-white/5 hover:bg-transparent">
            <TableHead className="text-gray-400 font-normal">
              <Button
                variant="ghost"
                onClick={() => requestSort("round")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center"
              >
                Round {getSortIcon("round")}
              </Button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal">
              <Button
                variant="ghost"
                onClick={() => requestSort("date")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center"
              >
                Date {getSortIcon("date")}
              </Button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal">Home Team</TableHead>
            <TableHead className="text-gray-400 font-normal">Away Team</TableHead>
            <TableHead className="text-gray-400 font-normal text-center">HT</TableHead>
            <TableHead className="text-gray-400 font-normal text-center">FT</TableHead>
            <TableHead className="text-gray-400 font-normal text-center">
              <Button
                variant="ghost"
                onClick={() => requestSort("goals")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center justify-center"
              >
                Goals {getSortIcon("goals")}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match, index) => (
            <TableRow
              key={`${match.home_team}-${match.away_team}-${index}`}
              className="border-b border-white/5 hover:bg-white/5"
            >
              <TableCell>{match.round}</TableCell>
              <TableCell>{match.date}</TableCell>
              <TableCell
                className={`font-medium text-white ${match.home_score > match.away_score ? "font-bold" : ""}`}
              >
                {getHungarianTeamName(match.home_team)}
              </TableCell>
              <TableCell
                className={`font-medium text-white ${match.home_score < match.away_score ? "font-bold" : ""}`}
              >
                {getHungarianTeamName(match.away_team)}
              </TableCell>
              <TableCell className="text-center">
                <MatchScore homeScore={match.ht_home_score} awayScore={match.ht_away_score} isHalfTime />
              </TableCell>
              <TableCell className="text-center">
                <MatchScore homeScore={match.home_score} awayScore={match.away_score} />
              </TableCell>
              <TableCell className="text-center text-gray-400">{match.home_score + match.away_score}</TableCell>
            </TableRow>
          ))}
          {matches.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-gray-400">
                No matches found with the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
})

MatchesTableView.displayName = "MatchesTableView"

export default MatchesTableView
