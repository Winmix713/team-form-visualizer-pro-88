
"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { MatchesTable } from "@/components/MatchesTable"
import { StandingsTable } from "@/components/StandingsTable"
import { FormTable } from "@/components/FormTable"
import RecentMatches from "@/components/RecentMatches"
import TopPerformersCard from "@/components/TopPerformersCard"
import { EmptyTabContent } from "@/components/league-details/EmptyTabContent"
import type { Match, StandingsEntry, TeamForm } from "@/types"

interface LeagueTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
  matches: Match[]
  standings: StandingsEntry[]
  teamForms: TeamForm[]
}

export function LeagueTabs({
  activeTab,
  onTabChange,
  matches,
  standings,
  teamForms
}: LeagueTabsProps) {
  const hasMatches = matches.length > 0

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="bg-black/30 border border-white/10">
        <TabsTrigger value="matches" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
          Matches
        </TabsTrigger>
        <TabsTrigger value="standings" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
          Standings
        </TabsTrigger>
        <TabsTrigger value="form" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
          Form
        </TabsTrigger>
        <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
          Patterns
        </TabsTrigger>
      </TabsList>

      <TabsContent value="matches">
        {hasMatches ? (
          <MatchesTable matches={matches} />
        ) : (
          <EmptyTabContent message="No matches available for this league yet." />
        )}
      </TabsContent>
      
      <TabsContent value="standings">
        {hasMatches ? (
          <StandingsTable standings={standings} />
        ) : (
          <EmptyTabContent message="No standings available. Please add matches first." />
        )}
      </TabsContent>
      
      <TabsContent value="form">
        {hasMatches ? (
          <FormTable teamForms={teamForms} />
        ) : (
          <EmptyTabContent message="No form data available. Please add matches first." />
        )}
      </TabsContent>
      
      <TabsContent value="patterns">
        {hasMatches ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentMatches matches={matches} />
            <TopPerformersCard teams={teamForms} />
          </div>
        ) : (
          <EmptyTabContent message="No pattern data available. Please add matches first." />
        )}
      </TabsContent>
    </Tabs>
  )
}
