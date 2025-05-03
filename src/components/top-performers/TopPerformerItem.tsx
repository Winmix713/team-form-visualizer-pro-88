
import { memo } from "react";
import { Link } from "react-router-dom";
import { TeamForm } from "@/types";
import { getHungarianTeamName } from "@/data/teamsData";
import MedalBadge from "./MedalBadge";

interface TopPerformerItemProps {
  team: TeamForm;
  index: number;
}

const TopPerformerItem = memo(({ team, index }: TopPerformerItemProps) => {
  const formArray = Array.isArray(team.form) ? team.form : typeof team.form === "string" ? team.form.split("") : [];
  const winCount = formArray.filter(result => result === "W").length;
  const winRate = team.played > 0 ? Math.round((winCount / team.played) * 100) : 0;
  
  // Apply the Hungarian team name conversion
  const teamName = getHungarianTeamName(team.team);
  
  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case 1:
        return "bg-gray-400/20 text-gray-300 border-gray-400/30";
      case 2:
        return "bg-amber-700/20 text-amber-600 border-amber-700/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <Link 
      to={`/teams/${team.team.toLowerCase()}`}
      className={`flex items-center justify-between p-3 rounded-lg border ${getMedalColor(index)} hover:opacity-90 transition-opacity`}
    >
      <div className="flex items-center gap-3">
        <MedalBadge position={index} />
        <div>
          <div className="font-medium text-white">{teamName}</div>
          <div className="text-xs text-gray-400">
            Win rate: {winRate}% · {team.goalsFor} goals
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{team.points}</div>
    </Link>
  );
});

TopPerformerItem.displayName = "TopPerformerItem";

export default TopPerformerItem;
