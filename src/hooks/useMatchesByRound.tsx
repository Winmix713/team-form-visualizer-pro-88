
import { useMemo } from "react"
import type { Match } from "@/types"

export function useMatchesByRound(matches: Match[]) {
  const matchesByRound = useMemo(() => {
    return matches.reduce(
      (acc, match) => {
        const round = match.round || "Unknown"
        if (!acc[round]) {
          acc[round] = []
        }
        acc[round].push(match)
        return acc
      },
      {} as Record<string, Match[]>,
    )
  }, [matches])

  return matchesByRound
}
