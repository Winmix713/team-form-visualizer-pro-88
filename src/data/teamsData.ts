export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  league: string;
}

// Teams data
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

// Név leképezés az angol és magyar nevek között
export const TEAM_NAME_MAP: Record<string, string> = {
  // Angol -> Magyar
  "Arsenal": "London Ágyúk",
  "Aston Villa": "Aston Oroszlán",
  "Manchester City": "Manchester Kék",
  "Manchester United": "Vörös Ördögök",
  // Magyar -> Angol
  "London Ágyúk": "Arsenal",
  "Aston Oroszlán": "Aston Villa",
  "Manchester Kék": "Manchester City",
  "Vörös Ördögök": "Manchester United"
};

// Név leképezés segédfüggvény hibakezeléssel
export function getHungarianTeamName(englishName: string): string {
  if (!englishName) {
    console.warn("Üres csapatnév érkezett a getHungarianTeamName függvénybe");
    return "Ismeretlen csapat";
  }
  
  // Keresés a leképezési táblában
  const hungarianName = TEAM_NAME_MAP[englishName];
  if (hungarianName) {
    return hungarianName;
  }
  
  // Ha nem találjuk a leképezési táblában, ellenőrizzük, hogy esetleg már magyar név-e
  const isAlreadyHungarian = Object.values(TEAM_NAME_MAP).includes(englishName);
  if (isAlreadyHungarian) {
    return englishName;
  }
  
  // Ha nem találunk leképezést, nézzük meg, van-e ilyen nevű csapat a TEAMS-ben
  const teamByName = TEAMS.find(team => team.id === englishName.toLowerCase() || team.name === englishName);
  if (teamByName) {
    return teamByName.name;
  }
  
  // Végső esetben visszaadjuk az eredeti nevet
  return englishName;
}

// Angol név lekérése a magyar névből
export function getEnglishTeamName(hungarianName: string): string {
  if (!hungarianName) {
    console.warn("Üres csapatnév érkezett a getEnglishTeamName függvénybe");
    return "Unknown team";
  }
  
  // Keresés a leképezési táblában
  const englishName = TEAM_NAME_MAP[hungarianName];
  if (englishName) {
    return englishName;
  }
  
  // Ha nem találjuk a leképezési táblában, ellenőrizzük, hogy esetleg már angol név-e
  const isAlreadyEnglish = Object.keys(TEAM_NAME_MAP).includes(hungarianName);
  if (isAlreadyEnglish) {
    return hungarianName;
  }
  
  // Ha nem találunk leképezést, visszaadjuk az eredeti nevet
  return hungarianName;
}

// Csapat keresése név alapján (működik magyar és angol névvel is)
export function findTeamByName(name: string): Team | undefined {
  if (!name) return undefined;
  
  // Keresés közvetlenül a csapatok között név alapján
  let team = TEAMS.find(team => 
    team.name === name || 
    TEAM_NAME_MAP[name] === team.name
  );
  
  // Ha nem találtuk meg, próbáljuk meg az ID alapján
  if (!team) {
    team = TEAMS.find(team => team.id === name.toLowerCase());
  }
  
  return team;
}
