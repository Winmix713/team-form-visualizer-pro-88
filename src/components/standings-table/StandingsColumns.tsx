
import { Button } from "@/components/ui/button";
import { TableHead, TableRow, TableHeader } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { SortIcon } from "../form-table/SortIcon";

export const COLUMNS = [
  { key: "position", label: "Pos", align: "left" as const, sortable: true },
  { key: "team", label: "Team", align: "left" as const, sortable: true },
  { key: "played", label: "P", align: "center" as const, sortable: true },
  { key: "won", label: "W", align: "center" as const, sortable: true },
  { key: "drawn", label: "D", align: "center" as const, sortable: true },
  { key: "lost", label: "L", align: "center" as const, sortable: true },
  { key: "goalsFor", label: "GF", align: "center" as const, sortable: true },
  { key: "goalsAgainst", label: "GA", align: "center" as const, sortable: true },
  { key: "goalDifference", label: "GD", align: "center" as const, sortable: true },
  { key: "points", label: "Pts", align: "center" as const, sortable: true },
] as const;

interface StandingsColumnsProps {
  onRequestSort: (key: string) => void;
  sortConfig: {
    key: string;
    direction: "asc" | "desc";
  } | null;
}

export const StandingsColumns = ({ onRequestSort, sortConfig }: StandingsColumnsProps) => {
  return (
    <TableHeader className="bg-black/40">
      <TableRow className="border-b border-white/5 hover:bg-transparent">
        {COLUMNS.map((column) => (
          <TableHead
            key={column.key}
            className={cn(
              "h-10 px-4 text-xs font-normal text-gray-400",
              column.align === "center" && "text-center"
            )}
          >
            {column.sortable ? (
              <Button
                variant="ghost"
                onClick={() => onRequestSort(column.key)}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center"
              >
                {column.label} <SortIcon sortKey={column.key} sortConfig={sortConfig} />
              </Button>
            ) : (
              column.label
            )}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
