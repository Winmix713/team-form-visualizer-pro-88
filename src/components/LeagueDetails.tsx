
"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowLeft, Edit2, Save } from "lucide-react"
import type { LeagueData, Match, StandingsEntry } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StandingsTable } from "@/components/StandingsTable"
import { MatchesTable } from "@/components/MatchesTable"
import { calculateStandings } from "@/utils/calculations"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LeagueDetailsProps {
  league: LeagueData
  matches: Match[]
  onBack: () => void
  onUpdateLeague: (league: LeagueData) => void
  onUpdateMatches: (matches: Match[]) => void
}

export function LeagueDetails({ league, matches, onBack, onUpdateLeague, onUpdateMatches }: LeagueDetailsProps) {
  const [activeTab, setActiveTab] = useState<"standings" | "matches">("standings")
  const [standings, setStandings] = useState<StandingsEntry[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editedLeague, setEditedLeague] = useState(league)

  useEffect(() => {
    // Calculate standings from matches
    const calculatedStandings = calculateStandings(matches)
    setStandings(calculatedStandings)
  }, [matches])

  const handleSaveChanges = useCallback(() => {
    onUpdateLeague(editedLeague)
    setIsEditing(false)
  }, [editedLeague, onUpdateLeague])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="bg-black/30 border-white/10 text-white hover:bg-black/40"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h2 className="text-2xl font-bold text-white">
              {league.name} <span className="text-gray-400">{league.season}</span>
            </h2>
            <p className="text-sm text-gray-400">
              Status: <span className="text-blue-400">{league.status}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
              onClick={handleSaveChanges}
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 gap-2"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
              Edit League
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "standings" | "matches")}>
        <TabsList className="bg-black/30 border border-white/10">
          <TabsTrigger value="standings" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Standings
          </TabsTrigger>
          <TabsTrigger value="matches" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Matches
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {isEditing ? (
        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Edit League</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">League editing interface would go here.</p>
          </CardContent>
        </Card>
      ) : activeTab === "standings" ? (
        <StandingsTable standings={standings} />
      ) : (
        <MatchesTable matches={matches} />
      )}
    </div>
  )
}
