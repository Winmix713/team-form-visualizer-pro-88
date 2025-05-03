
import { memo } from "react"
import type { Match } from "@/types"
import MatchCard from "./MatchCard"

interface MatchesCardsViewProps {
  matches: Match[]
}

const MatchesCardsView = memo(({ matches }: MatchesCardsViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {matches.map((match, index) => (
        <MatchCard key={`${match.home_team}-${match.away_team}-${index}`} match={match} />
      ))}
      {matches.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-400">
          No matches found with the current filters.
        </div>
      )}
    </div>
  )
})

MatchesCardsView.displayName = "MatchesCardsView"

export default MatchesCardsView
