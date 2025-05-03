
import type { StandingsEntry } from "@/types";
import { TeamCard } from "./TeamCard";

interface CardsViewProps {
  standings: StandingsEntry[];
  maxPoints: number;
}

export const CardsView = ({ standings, maxPoints }: CardsViewProps) => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {standings.map((entry) => (
        <TeamCard key={entry.team} entry={entry} maxPoints={maxPoints} />
      ))}
    </div>
  );
};
