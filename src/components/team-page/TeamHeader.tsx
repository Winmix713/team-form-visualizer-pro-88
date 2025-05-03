
import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Team } from "@/data/teamsData";

interface TeamHeaderProps {
  team: Team | undefined;
  isLoading: boolean;
}

const TeamHeader = memo(({ team, isLoading }: TeamHeaderProps) => {
  if (isLoading) {
    return (
      <div className="animate-pulse flex items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-gray-700/50 rounded-lg"></div>
        <div className="space-y-2">
          <div className="h-8 w-40 bg-gray-700/50 rounded"></div>
          <div className="h-4 w-28 bg-gray-700/50 rounded"></div>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="text-white text-xl">Team not found</div>
        <Button asChild variant="outline">
          <Link to="/leagues">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leagues
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center p-2">
            {team.logoUrl ? (
              <img
                src={team.logoUrl}
                alt={`${team.name} logo`}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-4xl font-bold text-white opacity-30">
                {team.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-blue-500 text-xs text-white font-bold py-1 px-2 rounded">
            {team.league}
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{team.name}</h1>
          <div className="flex items-center gap-4">
            <Link 
              to="/leagues" 
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Leagues
            </Link>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              asChild
            >
              <Link to={`/h2h?team=${team.id}`}>Compare H2H</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

TeamHeader.displayName = "TeamHeader";

export default TeamHeader;
