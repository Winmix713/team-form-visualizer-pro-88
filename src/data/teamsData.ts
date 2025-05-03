
export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  league: string;
}

// Teams data with Hungarian names
export const TEAMS: Team[] = [
  { id: "arsenal", name: "London Ágyúk", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t3.png",  league: "premier-league" },
  { id: "astonvilla", name: "Aston Oroszlán", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t7.png", league: "premier-league" },
  { id: "brentford", name: "Brentford", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t94.png", league: "premier-league" },
  { id: "brighton", name: "Brighton", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t36.png", league: "premier-league" },
  { id: "chelsea", name: "Chelsea", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t8.png",  league: "premier-league" },
  { id: "palace", name: "Crystal Palace", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t31.png", league: "premier-league" },
  { id: "everton", name: "Everton", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t11.png", league: "premier-league" },
  { id: "fulham", name: "Fulham", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t54.png", league: "premier-league" },
  { id: "liverpool", name: "Liverpool", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t14.png",  league: "premier-league" },
  { id: "mancity", name: "Manchester Kék", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t43.png",  league: "premier-league" },
  { id: "newcastle", name: "Newcastle", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t4.png", league: "premier-league" },
  { id: "nottingham", name: "Nottingham", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t17.png", league: "premier-league" },
  { id: "tottenham", name: "Tottenham", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t6.png", league: "premier-league" },
  { id: "manutd", name: "Vörös Ördögök", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t1.png",  league: "premier-league" },
  { id: "westham", name: "West Ham", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t21.png", league: "premier-league" },
  { id: "wolves", name: "Wolverhampton", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t39.png", league: "premier-league" },
].sort((a, b) => a.name.localeCompare(b.name));

// Team name mapping between English and Hungarian
export const TEAM_NAME_MAP: Record<string, string> = {
  "Arsenal": "London Ágyúk",
  "Aston Villa": "Aston Oroszlán",
  "Manchester City": "Manchester Kék",
  "Manchester United": "Vörös Ördögök",
  // Reverse mapping
  "London Ágyúk": "Arsenal",
  "Aston Oroszlán": "Aston Villa",
  "Manchester Kék": "Manchester City",
  "Vörös Ördögök": "Manchester United"
};

// Function to get Hungarian name from English name
export function getHungarianTeamName(englishName: string): string {
  return TEAM_NAME_MAP[englishName] || englishName;
}

// Function to get English name from Hungarian name
export function getEnglishTeamName(hungarianName: string): string {
  return TEAM_NAME_MAP[hungarianName] || hungarianName;
}

// Function to find a team by name (works with both Hungarian and English names)
export function findTeamByName(name: string): Team | undefined {
  return TEAMS.find(team => 
    team.name === name || 
    TEAM_NAME_MAP[name] === team.name
  );
}
