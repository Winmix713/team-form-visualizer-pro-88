
import { memo } from "react"
import { Badge } from "@/components/ui/badge"
import { getHungarianTeamName } from "@/data/teamsData"
import type { Match } from "@/types"
import MatchScore from "./MatchScore"

interface MatchCardProps {
  match: Match
}

const MatchCard = memo(({ match }: MatchCardProps) => {
  const homeWin = match.home_score > match.away_score
  const awayWin = match.home_score < match.away_score
  const draw = match.home_score === match.away_score
  
  // Convert team names to Hungarian
  const homeTeam = getHungarianTeamName(match.home_team)
  const awayTeam = getHungarianTeamName(match.away_team)

  return (
    <div className="bg-black/30 rounded-lg border border-white/5 p-4 hover:bg-black/40 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400">{match.date}</span>
        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
          Round {match.round || "?"}
        </Badge>
      </div>

      <div className="flex items-center justify-between my-3">
        <div className={`text-right flex-1 text-white ${homeWin ? "font-bold" : ""}`}>{homeTeam}</div>

        <div className="mx-4 px-4 py-2 bg-black/30 rounded-lg flex flex-col items-center">
          <div className="text-lg font-bold">
            <MatchScore homeScore={match.home_score} awayScore={match.away_score} />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            HT: <MatchScore homeScore={match.ht_home_score} awayScore={match.ht_away_score} isHalfTime />
          </div>
        </div>

        <div className={`text-left flex-1 text-white ${awayWin ? "font-bold" : ""}`}>{awayTeam}</div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="text-xs text-gray-500">{homeWin ? "Home Win" : awayWin ? "Away Win" : "Draw"}</div>
        <div className="text-xs text-gray-500">Total Goals: {match.home_score + match.away_score}</div>
      </div>
    </div>
  )
})

MatchCard.displayName = "MatchCard"

export default MatchCard
