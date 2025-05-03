
import type { TeamForm } from "@/types";
import { TeamFormCard } from "./TeamFormCard";

interface CardsViewProps {
  teams: TeamForm[];
}

export const CardsView = ({ teams }: CardsViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team) => (
        <TeamFormCard key={team.team} team={team} />
      ))}
      {teams.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-400">
          No teams found with the current filter.
        </div>
      )}
    </div>
  );
};
