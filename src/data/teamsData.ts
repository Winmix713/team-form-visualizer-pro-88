
export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  league: string;
}

// Teams data - already using Hungarian names
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
  { id: "tottenham", name: "Tottenham", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t6.png",   league: "premier-league" },
  { id: "manutd", name: "Vörös Ördögök", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t1.png",  league: "premier-league" },
  { id: "westham", name: "West Ham", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t21.png", league: "premier-league" },
  { id: "wolves", name: "Wolverhampton", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t39.png", league: "premier-league" },
  // Add more teams from other leagues here
].sort((a, b) => a.name.localeCompare(b.name));

// Name mapping between English and Hungarian names
export const TEAM_NAME_MAP: Record<string, string> = {
  // English -> Hungarian
  "Arsenal": "London Ágyúk",
  "Aston Villa": "Aston Oroszlán",
  "Manchester City": "Manchester Kék",
  "Manchester United": "Vörös Ördögök",
  
  // Hungarian -> English (for reverse lookup)
  "London Ágyúk": "Arsenal",
  "Aston Oroszlán": "Aston Villa",
  "Manchester Kék": "Manchester City",
  "Vörös Ördögök": "Manchester United"
};

// Helper function to get Hungarian team name with error handling
export function getHungarianTeamName(englishName: string): string {
  if (!englishName) {
    console.warn("Empty team name received in getHungarianTeamName function");
    return "Ismeretlen csapat";
  }
  
  // First check if the name is already in the map
  const hungarianName = TEAM_NAME_MAP[englishName];
  if (hungarianName) {
    return hungarianName;
  }
  
  // Check if it's already a Hungarian name
  const isAlreadyHungarian = Object.values(TEAM_NAME_MAP).includes(englishName);
  if (isAlreadyHungarian) {
    return englishName;
  }
  
  // Check if it matches a team ID
  const teamByName = TEAMS.find(team => team.id === englishName.toLowerCase() || team.name === englishName);
  if (teamByName) {
    return teamByName.name;
  }
  
  // Default fallback
  return englishName;
}

// Get English name from Hungarian name
export function getEnglishTeamName(hungarianName: string): string {
  if (!hungarianName) {
    console.warn("Empty team name received in getEnglishTeamName function");
    return "Unknown team";
  }
  
  // Check if in the mapping table
  const englishName = TEAM_NAME_MAP[hungarianName];
  if (englishName) {
    return englishName;
  }
  
  // Check if already English name
  const isAlreadyEnglish = Object.keys(TEAM_NAME_MAP).includes(hungarianName);
  if (isAlreadyEnglish) {
    return hungarianName;
  }
  
  // Default fallback
  return hungarianName;
}

// Find a team by name (works with both English and Hungarian names)
export function findTeamByName(name: string): Team | undefined {
  if (!name) return undefined;
  
  // Direct search by name
  let team = TEAMS.find(team => 
    team.name === name || 
    TEAM_NAME_MAP[name] === team.name
  );
  
  // Try by ID if not found
  if (!team) {
    team = TEAMS.find(team => team.id === name.toLowerCase());
  }
  
  return team;
}
