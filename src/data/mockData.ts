
import { TeamForm, Match } from "@/types";
import { getHungarianTeamName } from "./teamsData";

export const mockTeamForms: TeamForm[] = [
  {
    position: 1,
    team: "Manchester Kék",
    played: 38,
    goalsFor: 94,
    goalsAgainst: 33,
    points: 89,
    form: ["W", "W", "W", "D", "W"]
  },
  {
    position: 2,
    team: "London Ágyúk",
    played: 38,
    goalsFor: 88,
    goalsAgainst: 29,
    points: 84,
    form: ["W", "W", "W", "W", "L"]
  },
  {
    position: 3,
    team: "Liverpool",
    played: 38,
    goalsFor: 82,
    goalsAgainst: 40,
    points: 82,
    form: ["W", "D", "W", "L", "W"]
  },
  {
    position: 4,
    team: "Aston Oroszlán",
    played: 38,
    goalsFor: 76,
    goalsAgainst: 58,
    points: 68,
    form: ["L", "W", "W", "L", "W"]
  },
  {
    position: 5,
    team: "Tottenham",
    played: 38,
    goalsFor: 74,
    goalsAgainst: 62,
    points: 64,
    form: ["L", "D", "L", "W", "W"]
  },
  {
    position: 6,
    team: "Chelsea",
    played: 38,
    goalsFor: 77,
    goalsAgainst: 63,
    points: 63,
    form: ["W", "W", "D", "W", "D"]
  },
  {
    position: 7,
    team: "Newcastle",
    played: 38,
    goalsFor: 85,
    goalsAgainst: 52,
    points: 62,
    form: ["W", "W", "L", "W", "L"]
  },
  {
    position: 8,
    team: "Vörös Ördögök",
    played: 38,
    goalsFor: 57,
    goalsAgainst: 58,
    points: 60,
    form: ["L", "W", "D", "L", "W"]
  },
  {
    position: 9,
    team: "West Ham",
    played: 38,
    goalsFor: 67,
    goalsAgainst: 71,
    points: 52,
    form: ["L", "L", "D", "W", "L"]
  },
  {
    position: 10,
    team: "Brighton",
    played: 38,
    goalsFor: 65,
    goalsAgainst: 65,
    points: 52,
    form: ["D", "L", "W", "L", "D"]
  }
];

export const mockMatches: Match[] = [
  {
    date: "2023-08-12",
    home_team: "Manchester Kék",
    away_team: "Chelsea",
    ht_home_score: 1,
    ht_away_score: 0,
    home_score: 3,
    away_score: 1,
    round: "1"
  },
  {
    date: "2023-08-19",
    home_team: "London Ágyúk",
    away_team: "Liverpool",
    ht_home_score: 0,
    ht_away_score: 0,
    home_score: 2,
    away_score: 2,
    round: "2"
  },
  {
    date: "2023-08-26",
    home_team: "Tottenham",
    away_team: "Vörös Ördögök",
    ht_home_score: 1,
    ht_away_score: 0,
    home_score: 2,
    away_score: 0,
    round: "3"
  },
  {
    date: "2023-09-02",
    home_team: "Newcastle",
    away_team: "Brighton",
    ht_home_score: 2,
    ht_away_score: 1,
    home_score: 4,
    away_score: 1,
    round: "4"
  },
  {
    date: "2023-09-16",
    home_team: "Liverpool",
    away_team: "West Ham",
    ht_home_score: 1,
    ht_away_score: 1,
    home_score: 3,
    away_score: 1,
    round: "5"
  },
  {
    date: "2023-09-23",
    home_team: "Chelsea",
    away_team: "Aston Oroszlán",
    ht_home_score: 0,
    ht_away_score: 1,
    home_score: 0,
    away_score: 1,
    round: "6"
  },
  {
    date: "2023-09-30",
    home_team: "Vörös Ördögök",
    away_team: "Manchester Kék",
    ht_home_score: 0,
    ht_away_score: 2,
    home_score: 0,
    away_score: 3,
    round: "7"
  },
  {
    date: "2023-10-07",
    home_team: "Brighton",
    away_team: "London Ágyúk",
    ht_home_score: 1,
    ht_away_score: 2,
    home_score: 1,
    away_score: 2,
    round: "8"
  }
];
