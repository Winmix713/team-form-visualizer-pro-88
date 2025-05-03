
"use client"

import { useState, useRef } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, Save } from "lucide-react"
import type { LeagueData } from "@/types"

interface LeagueEditFormProps {
  league: LeagueData
  editedLeague: LeagueData
  hasChanges: boolean
  selectedFileName: string
  onLeagueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSaveChanges: () => void
}

export function LeagueEditForm({
  editedLeague,
  hasChanges,
  selectedFileName,
  onLeagueChange,
  onFileUpload,
  onSaveChanges
}: LeagueEditFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="bg-black/20 border-white/5">
      <CardHeader>
        <CardTitle className="text-white">Edit League</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="leagueName" className="text-gray-300">League Name</Label>
            <Input
              id="leagueName"
              name="name"
              value={editedLeague.name}
              onChange={onLeagueChange}
              placeholder="Enter league name"
              className="bg-black/30 border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="leagueSeason" className="text-gray-300">Season</Label>
            <Input
              id="leagueSeason"
              name="season"
              value={editedLeague.season}
              onChange={onLeagueChange}
              placeholder="Enter season (e.g., 2023-24)"
              className="bg-black/30 border-white/10 text-white"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
          <div className="w-full sm:w-auto flex-grow">
            <Label htmlFor="csv-upload" className="block text-gray-300 mb-2">
              Upload Matches Data (CSV)
            </Label>
            <input
              ref={fileInputRef}
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={onFileUpload}
              className="hidden"
            />
            <div className="flex items-center gap-3">
              <Button
                onClick={triggerFileInput}
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose CSV File
              </Button>
              <span className="text-sm text-gray-400">
                {selectedFileName || "No file chosen"}
              </span>
            </div>
          </div>
          <Button
            onClick={onSaveChanges}
            disabled={!hasChanges}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
