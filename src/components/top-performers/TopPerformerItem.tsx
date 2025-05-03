
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { TeamForm } from "@/types";
import MedalBadge from "./MedalBadge";
import { getHungarianTeamName } from "@/data/teamsData";

interface TopPerformerItemProps {
  team: TeamForm;
  index: number;
}

const TopPerformerItem = ({ team, index }: TopPerformerItemProps) => {
  // Get the Hungarian team name
  const teamName = getHungarianTeamName(team.team);
  
  // Create a renderForm function that works with both string and array types
  const renderFormIndicators = () => {
    if (!team.form) return null;
    
    // Handle both string and array types
    const formItems = Array.isArray(team.form) 
      ? team.form.slice(0, 5) 
      : team.form.substring(0, 5).split("");
    
    return formItems.map((result, i) => (
      <span
        key={i}
        className={cn(
          "w-3 h-3 rounded-full",
          result === "W" && "bg-emerald-500",
          result === "D" && "bg-amber-500", 
          result === "L" && "bg-red-500"
        )}
      />
    ));
  };
  
  return (
    <Link
      to={`/teams/${team.team.toLowerCase()}`}
      className="flex items-center gap-3 bg-black/30 rounded-lg p-3 border border-white/5 hover:bg-black/40 transition-colors"
    >
      <MedalBadge position={index + 1} />
      
      <div className="flex-1">
        <div className="font-medium text-white">{teamName}</div>
        <div className="flex gap-1 mt-1.5">
          {renderFormIndicators()}
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-lg font-bold text-white">{team.points}</div>
        <div className="text-xs text-gray-400">Points</div>
      </div>
    </Link>
  );
};

export default TopPerformerItem;
