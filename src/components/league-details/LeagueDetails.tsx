
"use client"

import { useState, useEffect, useCallback } from "react"
import type { LeagueData, Match, StandingsEntry } from "@/types"
import { calculateStandings, calculateTeamForms } from "@/utils/calculations"
import { LeagueHeader } from "./LeagueHeader"
import { LeagueEditForm } from "./LeagueEditForm"
import { LeagueTabs } from "./LeagueTabs"
import { parseCSV } from "./csvParser"
import { toast } from "sonner"

interface LeagueDetailsProps {
  league: LeagueData
  matches: Match[]
  onBack: () => void
  onUpdateLeague: (league: LeagueData) => void
  onUpdateMatches: (matches: Match[]) => void
}

export function LeagueDetails({ league, matches, onBack, onUpdateLeague, onUpdateMatches }: LeagueDetailsProps) {
  const [activeTab, setActiveTab] = useState<string>("matches")
  const [standings, setStandings] = useState<StandingsEntry[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editedLeague, setEditedLeague] = useState(league)
  const [parsedMatches, setParsedMatches] = useState<Match[]>(matches)
  const [selectedFileName, setSelectedFileName] = useState<string>("")
  const [hasChanges, setHasChanges] = useState(false)
  const teamForms = calculateTeamForms(parsedMatches)

  useEffect(() => {
    // Calculate standings from matches
    const calculatedStandings = calculateStandings(parsedMatches)
    setStandings(calculatedStandings)
  }, [parsedMatches])

  const handleEditedLeagueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedLeague((prev) => ({ ...prev, [name]: value }))
    setHasChanges(true)
  }

  const handleSaveChanges = useCallback(() => {
    onUpdateLeague(editedLeague)
    if (hasChanges && parsedMatches !== matches) {
      onUpdateMatches(parsedMatches)
    }
    setIsEditing(false)
    setHasChanges(false)
    toast.success("Your league data has been updated successfully.");
  }, [editedLeague, onUpdateLeague, hasChanges, parsedMatches, matches, onUpdateMatches])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFileName(file.name)
    
    const handleParseSuccess = (validMatches: Match[]) => {
      setParsedMatches(validMatches)
      setHasChanges(true)
    }
    
    parseCSV(file, handleParseSuccess)
  }

  return (
    <div className="space-y-6">
      <LeagueHeader 
        league={league}
        isEditing={isEditing}
        hasChanges={hasChanges}
        onBack={onBack}
        onEdit={() => setIsEditing(true)}
        onSave={handleSaveChanges}
      />

      {isEditing && (
        <LeagueEditForm
          league={league}
          editedLeague={editedLeague}
          hasChanges={hasChanges}
          selectedFileName={selectedFileName}
          onLeagueChange={handleEditedLeagueChange}
          onFileUpload={handleFileUpload}
          onSaveChanges={handleSaveChanges}
        />
      )}

      <LeagueTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        matches={parsedMatches}
        standings={standings}
        teamForms={teamForms}
      />
    </div>
  )
}
