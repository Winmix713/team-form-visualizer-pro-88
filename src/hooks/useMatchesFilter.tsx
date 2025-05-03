
import { useMemo } from "react"
import type { Match } from "@/types"

interface UseMatchesFilterProps {
  matches: Match[]
  filters: {
    team: string
    round: string
    result: string
  }
}

export function useMatchesFilter({ matches, filters }: UseMatchesFilterProps) {
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const teamMatch = filters.team
        ? match.home_team.toLowerCase().includes(filters.team.toLowerCase()) ||
          match.away_team.toLowerCase().includes(filters.team.toLowerCase())
        : true

      const roundMatch = filters.round ? match.round === filters.round : true

      let resultMatch = true
      if (filters.result === "home") {
        resultMatch = match.home_score > match.away_score
      } else if (filters.result === "away") {
        resultMatch = match.home_score < match.away_score
      } else if (filters.result === "draw") {
        resultMatch = match.home_score === match.away_score
      }

      return teamMatch && roundMatch && resultMatch
    })
  }, [matches, filters])

  return filteredMatches
}
