
"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit2, Save } from "lucide-react"
import type { LeagueData } from "@/types"

interface LeagueHeaderProps {
  league: LeagueData
  isEditing: boolean
  hasChanges: boolean
  onBack: () => void
  onEdit: () => void
  onSave: () => void
}

export function LeagueHeader({ 
  league, 
  isEditing, 
  hasChanges, 
  onBack, 
  onEdit, 
  onSave 
}: LeagueHeaderProps) {
  return (
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
            onClick={onSave}
            disabled={!hasChanges}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        ) : (
          <Button
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 gap-2"
            onClick={onEdit}
          >
            <Edit2 className="h-4 w-4" />
            Edit League
          </Button>
        )}
      </div>
    </div>
  )
}
