
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ArrowLeft, Edit2, Save, Upload, Check, AlertCircle } from "lucide-react"
import type { LeagueData, Match, StandingsEntry } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StandingsTable } from "@/components/StandingsTable"
import { MatchesTable } from "@/components/MatchesTable"
import { calculateStandings, calculateTeamForms } from "@/utils/calculations"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { FormTable } from "@/components/FormTable"
import RecentMatches from "@/components/RecentMatches"
import TopPerformersCard from "@/components/TopPerformersCard"
import Papa from "papaparse"

interface LeagueDetailsProps {
  league: LeagueData
  matches: Match[]
  onBack: () => void
  onUpdateLeague: (league: LeagueData) => void
  onUpdateMatches: (matches: Match[]) => void
}

export function LeagueDetails({ league, matches, onBack, onUpdateLeague, onUpdateMatches }: LeagueDetailsProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>("matches")
  const [standings, setStandings] = useState<StandingsEntry[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editedLeague, setEditedLeague] = useState(league)
  const [parsedMatches, setParsedMatches] = useState<Match[]>(matches)
  const [selectedFileName, setSelectedFileName] = useState<string>("")
  const [hasChanges, setHasChanges] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
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
    toast({
      title: "Changes saved",
      description: "Your league data has been updated successfully.",
    })
  }, [editedLeague, onUpdateLeague, hasChanges, parsedMatches, matches, onUpdateMatches, toast])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFileName(file.name)
    console.log("Starting CSV upload. File name:", file.name)

    // Enhanced PapaParse configuration to handle the specific CSV format
    Papa.parse(file, {
      header: true,
      skipEmptyLines: 'greedy', // Skip empty lines more aggressively
      quoteChar: '"', // Specify quote character
      delimiter: ',', // Ensure we're using comma as delimiter
      dynamicTyping: false, // Keep everything as strings initially for better control
      transformHeader: (header) => {
        // Remove trailing comma if present
        return header.endsWith(',') ? header.slice(0, -1) : header;
      },
      complete: (results) => {
        console.log("CSV Parse Results:", results);
        
        if (results.data && Array.isArray(results.data) && results.data.length > 0) {
          try {
            // Log the first row to debug
            console.log("Sample row:", results.data[0]);
            
            // Map and validate each row
            const parsedData = results.data
              .filter(row => {
                // Basic validation to ensure we have the minimum required fields
                const isValid = row && 
                  typeof row === 'object' && 
                  'home_team' in row && 
                  'away_team' in row;
                  
                if (!isValid) {
                  console.log("Filtering out invalid row:", row);
                }
                return isValid;
              })
              .map((row: any) => {
                // Safely convert values
                const match: Match = {
                  date: String(row.date || ''),
                  home_team: String(row.home_team || ''),
                  away_team: String(row.away_team || ''),
                  ht_home_score: parseInt(String(row.ht_home_score), 10) || 0,
                  ht_away_score: parseInt(String(row.ht_away_score), 10) || 0,
                  home_score: parseInt(String(row.home_score), 10) || 0,
                  away_score: parseInt(String(row.away_score), 10) || 0,
                };
                
                // Add round if it exists
                if ('round' in row && row.round) {
                  match.round = String(row.round);
                }
                
                return match;
              });

            console.log("Parsed matches:", parsedData);
            
            // Filter out any incomplete entries (should already be handled above but double-check)
            const validMatches = parsedData.filter(
              (match) => match.home_team && match.away_team
            );
            
            console.log("Valid matches count:", validMatches.length);

            if (validMatches.length === 0) {
              toast({
                title: "CSV Error",
                description: "No valid match data found in the CSV file. Please check the format and try again.",
                variant: "destructive",
              });
              console.error("No valid matches found after parsing");
              return;
            }

            setParsedMatches(validMatches);
            setHasChanges(true);
            toast({
              title: "CSV Uploaded",
              description: `Successfully parsed ${validMatches.length} matches from CSV.`,
            });
          } catch (error) {
            console.error("Error processing CSV data:", error);
            toast({
              title: "Error Processing CSV",
              description: "Failed to process the CSV data. Please check the format and try again.",
              variant: "destructive",
            });
          }
        } else {
          console.error("Empty or invalid CSV structure:", results);
          toast({
            title: "Empty CSV",
            description: "The CSV file appears to be empty or in an incorrect format.",
            variant: "destructive",
          });
        }
      },
      error: (error) => {
        console.error("PapaParse error:", error);
        toast({
          title: "CSV Parse Error",
          description: `Error parsing CSV: ${error.message}`,
          variant: "destructive",
        });
      }
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

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
              disabled={!hasChanges}
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

      {isEditing ? (
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
                  onChange={handleEditedLeagueChange}
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
                  onChange={handleEditedLeagueChange}
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
                  onChange={handleFileUpload}
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
                onClick={handleSaveChanges}
                disabled={!hasChanges}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
          {parsedMatches.length > 0 ? (
            <MatchesTable matches={parsedMatches} />
          ) : (
            <Card className="bg-black/20 border-white/5">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-gray-500" />
                  <p className="text-gray-400">No matches available for this league yet.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="standings">
          {parsedMatches.length > 0 ? (
            <StandingsTable standings={standings} />
          ) : (
            <Card className="bg-black/20 border-white/5">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-gray-500" />
                  <p className="text-gray-400">No standings available. Please add matches first.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="form">
          {parsedMatches.length > 0 ? (
            <FormTable teamForms={teamForms} />
          ) : (
            <Card className="bg-black/20 border-white/5">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-gray-500" />
                  <p className="text-gray-400">No form data available. Please add matches first.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="patterns">
          {parsedMatches.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentMatches matches={parsedMatches} />
              <TopPerformersCard teams={teamForms} />
            </div>
          ) : (
            <Card className="bg-black/20 border-white/5">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-gray-500" />
                  <p className="text-gray-400">No pattern data available. Please add matches first.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
