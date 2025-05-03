
import { BarChart3, Filter } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ViewType } from "@/hooks/useViewType";
import { SortIcon } from "./SortIcon";

interface FormTableHeaderProps {
  filter: string;
  onFilterChange: (value: string) => void;
  onRequestSort: (key: string) => void;
  onViewTypeChange: (value: ViewType) => void;
  viewType: ViewType;
  sortConfig: {
    key: string;
    direction: "asc" | "desc";
  } | null;
}

export const FormTableHeader = ({
  filter,
  onFilterChange,
  onRequestSort,
  onViewTypeChange,
  viewType,
  sortConfig,
}: FormTableHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-blue-500" />
        <CardTitle className="text-white">Team Form Analysis</CardTitle>
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Filter by team..."
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full md:w-auto bg-black/30 border-white/10 text-white"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#0a0f14] border-white/10 text-white">
            <DropdownMenuItem
              onClick={() => onRequestSort("position")}
              className="flex items-center gap-2 cursor-pointer"
            >
              Position <SortIcon sortKey="position" sortConfig={sortConfig} />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRequestSort("team")}
              className="flex items-center gap-2 cursor-pointer"
            >
              Team <SortIcon sortKey="team" sortConfig={sortConfig} />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRequestSort("points")}
              className="flex items-center gap-2 cursor-pointer"
            >
              Points <SortIcon sortKey="points" sortConfig={sortConfig} />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRequestSort("goalsFor")}
              className="flex items-center gap-2 cursor-pointer"
            >
              Goals For <SortIcon sortKey="goalsFor" sortConfig={sortConfig} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select value={viewType} onValueChange={(value) => onViewTypeChange(value as ViewType)}>
          <SelectTrigger className="w-[120px] bg-black/30 border-white/10 text-white">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">Table</SelectItem>
            <SelectItem value="cards">Cards</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
