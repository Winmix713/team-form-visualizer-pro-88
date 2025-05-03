
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Team, TEAMS } from "@/data/teamsData";
import { SearchIcon } from "lucide-react";

interface TeamSelectorProps {
  selectedTeam?: Team;
  onSelectTeam: (team: Team) => void;
  excludeTeamId?: string;
}

const TeamSelector = memo(({ selectedTeam, onSelectTeam, excludeTeamId }: TeamSelectorProps) => {
  const availableTeams = TEAMS.filter(team => team.id !== excludeTeamId);
  
  return (
    <Card className="bg-black/20 border-white/5">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams..."
            className="w-full bg-black/30 text-white border border-white/10 rounded-lg pl-10 pr-4 py-2.5
                      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
                      transition-all duration-200 placeholder:text-gray-500"
            aria-label="Search teams"
          />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {availableTeams.map(team => (
            <div
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className={`
                cursor-pointer p-3 rounded-lg border flex flex-col items-center justify-center gap-2
                hover:bg-white/5 transition-colors
                ${selectedTeam?.id === team.id 
                  ? "border-blue-500 bg-blue-500/10" 
                  : "border-white/5 bg-black/30"}
              `}
            >
              <div className="w-12 h-12 rounded-full bg-black/30 border border-white/10 flex items-center justify-center p-1">
                {team.logoUrl ? (
                  <img
                    src={team.logoUrl}
                    alt={`${team.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-xl font-bold text-white opacity-30">
                    {team.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="text-sm font-medium text-white text-center">
                {team.name}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

TeamSelector.displayName = "TeamSelector";

export default TeamSelector;
