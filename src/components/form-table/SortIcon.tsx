
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

interface SortIconProps {
  sortKey: string;
  sortConfig: {
    key: string;
    direction: "asc" | "desc";
  } | null;
}

export const SortIcon = ({ sortKey, sortConfig }: SortIconProps) => {
  if (!sortConfig || sortConfig.key !== sortKey) {
    return <ArrowUpDown className="h-4 w-4 ml-1" />;
  }
  return sortConfig.direction === "asc" ? (
    <ChevronUp className="h-4 w-4 ml-1" />
  ) : (
    <ChevronDown className="h-4 w-4 ml-1" />
  );
};
