
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StandingsEntry } from "@/types";
import { useSort } from "@/hooks/useSort";
import { useViewType } from "@/hooks/useViewType";
import { useZones } from "@/hooks/useZones";
import { StandingsTableHeader } from "@/components/standings-table/StandingsTableHeader";
import { TableView } from "@/components/standings-table/TableView";
import { CardsView } from "@/components/standings-table/CardsView";

interface StandingsTableProps {
  standings: StandingsEntry[];
  className?: string;
}

export function StandingsTable({ standings = [], className }: StandingsTableProps) {
  const { sortedItems, requestSort, sortConfig } = useSort<StandingsEntry>(standings);
  const { viewType, setViewType } = useViewType("table");
  const zones = useZones(standings.length);

  const maxPoints = useMemo(() => {
    if (standings.length === 0) return 0;
    return Math.max(...standings.map((entry) => entry.points));
  }, [standings]);

  if (standings.length === 0) {
    return (
      <Card className={cn("animate-in fade-in-50 bg-black/20 border-white/5", className)}>
        <CardHeader>
          <CardTitle className="text-white">Standings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white opacity-70">No standings available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("animate-in fade-in-50 bg-black/20 border-white/5", className)}>
      <CardHeader className="pb-2">
        <StandingsTableHeader viewType={viewType} onViewTypeChange={setViewType} />
        <CardDescription className="text-gray-400">Updated {new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {viewType === "table" ? (
          <TableView standings={sortedItems} zones={zones} requestSort={requestSort} sortConfig={sortConfig} />
        ) : (
          <CardsView standings={sortedItems} maxPoints={maxPoints} />
        )}
      </CardContent>
    </Card>
  );
}
