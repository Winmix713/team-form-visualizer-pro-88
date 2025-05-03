
"use client"

import { memo, useState } from "react"
import { AlertCircle } from "lucide-react"
import type { Match } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSort } from "@/hooks/useSort"
import { useMatchesFilter } from "@/hooks/useMatchesFilter"
import { useMatchesByRound } from "@/hooks/useMatchesByRound"
import MatchesHeader from "./matches-table/MatchesHeader"
import MatchFilters from "./matches-table/MatchFilters"
import MatchesCardsView from "./matches-table/MatchesCardsView"
import MatchesRoundView from "./matches-table/MatchesRoundView"
import MatchesTableView from "./matches-table/MatchesTableView"

interface MatchesTableProps {
  matches: Match[]
}

export const MatchesTable = memo(({ matches = [] }: MatchesTableProps) => {
  const [viewType, setViewType] = useState<"rounds" | "all" | "cards">("rounds")
  const [filters, setFilters] = useState({ team: "", round: "", result: "" })
  
  const filteredMatches = useMatchesFilter({ matches, filters })
  const { sortedItems: sortedMatches, requestSort, sortConfig } = useSort<Match>(filteredMatches)
  const matchesByRound = useMatchesByRound(sortedMatches)

  if (matches.length === 0) {
    return (
      <Card className="bg-black/20 border-white/5">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <AlertCircle className="w-8 h-8 text-gray-500" />
            <p className="text-gray-400">No matches available for this league yet.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/20 border-white/5">
      <CardHeader className="pb-0">
        <MatchesHeader 
          viewType={viewType}
          setViewType={setViewType}
          requestSort={requestSort}
          sortConfig={sortConfig}
        />
      </CardHeader>

      <CardContent className="pt-6">
        <MatchFilters onFilterChange={setFilters} />

        {viewType === "cards" && <MatchesCardsView matches={sortedMatches} />}
        
        {viewType === "rounds" && <MatchesRoundView matchesByRound={matchesByRound} />}
        
        {viewType === "all" && (
          <MatchesTableView 
            matches={sortedMatches}
            requestSort={requestSort}
            sortConfig={sortConfig}
          />
        )}
      </CardContent>
    </Card>
  )
})

MatchesTable.displayName = "MatchesTable"
