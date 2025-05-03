
import Papa from "papaparse"
import type { Match } from "@/types"
import { toast } from "sonner"

export function parseCSV(
  file: File, 
  onSuccess: (matches: Match[]) => void
): void {
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
            .filter((row: any) => {
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
              // Handle Hungarian team names mapping
              const normalizeTeamName = (teamName: string) => {
                // Map of Hungarian team names to English names
                const teamNameMap: Record<string, string> = {
                  "Vörös Ördögök": "Manchester United",
                  "Manchester Kék": "Manchester City",
                  "London Ágyúk": "Arsenal",
                  "Aston Oroszlán": "Aston Villa"
                };
                
                return teamNameMap[teamName] || teamName;
              };
              
              // Safely convert values
              const match: Match = {
                date: String(row.date || ''),
                home_team: normalizeTeamName(String(row.home_team || '')),
                away_team: normalizeTeamName(String(row.away_team || '')),
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
          
          // Filter out any incomplete entries
          const validMatches = parsedData.filter(
            (match) => match.home_team && match.away_team
          );
          
          console.log("Valid matches count:", validMatches.length);

          if (validMatches.length === 0) {
            toast.error("No valid match data found in the CSV file. Please check the format and try again.");
            console.error("No valid matches found after parsing");
            return;
          }

          onSuccess(validMatches);
          toast.success("Successfully parsed " + validMatches.length + " matches from CSV.");
        } catch (error) {
          console.error("Error processing CSV data:", error);
          toast.error("Failed to process the CSV data. Please check the format and try again.");
        }
      } else {
        console.error("Empty or invalid CSV structure:", results);
        toast.error("The CSV file appears to be empty or in an incorrect format.");
      }
    },
    error: (error) => {
      console.error("PapaParse error:", error);
      toast.error("Error parsing CSV: " + error.message);
    }
  });
}
