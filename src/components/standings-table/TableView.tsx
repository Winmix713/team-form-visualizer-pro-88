
import { Table, TableBody } from "@/components/ui/table";
import type { StandingsEntry } from "@/types";
import { StandingsColumns } from "./StandingsColumns";
import { TeamStandingsRow } from "./TeamStandingsRow";
import { ZonesConfig } from "@/hooks/useZones";

interface TableViewProps {
  standings: StandingsEntry[];
  zones: ZonesConfig | null;
  requestSort: (key: string) => void;
  sortConfig: {
    key: string;
    direction: "asc" | "desc";
  } | null;
}

export const TableView = ({ standings, zones, requestSort, sortConfig }: TableViewProps) => {
  return (
    <div className="rounded-md border border-white/5">
      <Table>
        <StandingsColumns onRequestSort={requestSort} sortConfig={sortConfig} />
        <TableBody>
          {standings.map((entry) => (
            <TeamStandingsRow key={entry.team} entry={entry} zones={zones} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
