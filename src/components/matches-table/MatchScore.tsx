
import { memo, useMemo } from "react"

interface MatchScoreProps {
  homeScore: number
  awayScore: number
  isHalfTime?: boolean
}

const MatchScore = memo(({ homeScore, awayScore, isHalfTime }: MatchScoreProps) => {
  const scoreClass = useMemo(() => {
    if (isHalfTime) return "text-gray-400"
    if (homeScore > awayScore) return "text-emerald-400"
    if (homeScore < awayScore) return "text-red-400"
    return "text-amber-400"
  }, [homeScore, awayScore, isHalfTime])

  return (
    <span className={`font-mono font-bold ${scoreClass}`}>
      {homeScore} - {awayScore}
    </span>
  )
})

MatchScore.displayName = "MatchScore"

export default MatchScore
