
import Papa from "papaparse"
import type { Match } from "@/types"
import { toast } from "sonner"
import { getHungarianTeamName } from "@/data/teamsData"

export function parseCSV(
  file: File, 
  onSuccess: (matches: Match[]) => void
): void {
  console.log("Starting CSV upload. File name:", file.name)

  // Enhanced PapaParse configuration to handle the specific CSV format
  Papa.parse(file, {
    header: false,          // We're not using header row for this specific format
    skipEmptyLines: true,   // Skip empty lines
    quoteChar: '"',         // Specify quote character
    delimiter: ',',         // Ensure we're using comma as delimiter
    dynamicTyping: false,   // Keep everything as strings initially for better control
    complete: (results) => {
      console.log("CSV Parse Results:", results);
      
      if (results.data && Array.isArray(results.data) && results.data.length > 0) {
        try {
          // Skip the header rows if they exist
          let startIndex = 0;
          if (typeof results.data[0][0] === 'string' && 
              (results.data[0][0].trim() === '' || 
               results.data[0][0].includes("date") || 
               results.data[0][0].includes("home_team"))) {
            startIndex = 1;
            // Check if the next row is also a header
            if (results.data.length > 1 && 
                typeof results.data[1][0] === 'string' && 
                (results.data[1][0].trim() === '' || 
                 results.data[1][0].includes("date") || 
                 results.data[1][0].includes("home_team"))) {
              startIndex = 2;
            }
          }
          
          // Map and validate each row
          const parsedData = results.data
            .slice(startIndex)
            .filter((row: any) => {
              // Basic validation to ensure we have the minimum required fields
              // For this format, we expect at least 7 fields
              const isValid = row && 
                Array.isArray(row) && 
                row.length >= 7 &&
                row[0] && row[1] && row[2]; // At minimum need date, home_team, and away_team
                
              if (!isValid) {
                console.log("Filtering out invalid row:", row);
              }
              return isValid;
            })
            .map((row: any) => {
              // Validate date format before parsing
              let dateStr = String(row[0] || '');
              if (dateStr) {
                // Próbáljuk meg dátummá alakítani, hogy ellenőrizzük az érvényességét
                const testDate = new Date(dateStr);
                if (isNaN(testDate.getTime())) {
                  console.warn("Érvénytelen dátum formátum:", dateStr);
                  // Alkalmazzunk alapértelmezett dátumot, ha nem érvényes
                  dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
                }
              }
              
              // Safely convert values - the array indices match the CSV columns
              const match: Match = {
                date: dateStr,
                home_team: String(row[1] || ''),
                away_team: String(row[2] || ''),
                ht_home_score: parseInt(String(row[3]), 10) || 0,
                ht_away_score: parseInt(String(row[4]), 10) || 0,
                home_score: parseInt(String(row[5]), 10) || 0,
                away_score: parseInt(String(row[6]), 10) || 0,
              };
              
              // Add round if it exists (for future compatibility)
              if (row[7]) {
                match.round = String(row[7]);
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

          // Group matches by day for round assignment if rounds are missing
          if (validMatches.some(match => !match.round)) {
            const matchesByDate = validMatches.reduce((acc: Record<string, Match[]>, match) => {
              const dateKey = match.date.split(":")[0]; // Group by hour part of time
              if (!acc[dateKey]) acc[dateKey] = [];
              acc[dateKey].push(match);
              return acc;
            }, {});
            
            // Assign round numbers based on date groups if not already assigned
            let roundCounter = 1;
            Object.keys(matchesByDate).sort().forEach(dateKey => {
              matchesByDate[dateKey].forEach(match => {
                if (!match.round) match.round = String(roundCounter);
              });
              roundCounter++;
            });
          }

          onSuccess(validMatches);
          toast.success(`Successfully parsed ${validMatches.length} matches from CSV.`);
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
      toast.error(`Error parsing CSV: ${error.message}`);
    }
  });
}
