
import { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { TeamForm } from "@/types";
import { useFilter } from "@/hooks/useFilter";
import { useSort } from "@/hooks/useSort";
import { useViewType } from "@/hooks/useViewType";
import { FormTableHeader } from "@/components/form-table/FormTableHeader";
import { TableView } from "@/components/form-table/TableView";
import { CardsView } from "@/components/form-table/CardsView";

interface FormTableProps {
  teamForms: TeamForm[];
  className?: string;
}

export const FormTable = memo(({ teamForms = [], className = "" }: FormTableProps) => {
  const { sortedItems, requestSort, sortConfig } = useSort(teamForms);
  const { filter, setFilter, filteredItems } = useFilter(sortedItems, "team");
  const { viewType, setViewType } = useViewType("table");
  
  if (teamForms.length === 0) {
    return (
      <Card className="bg-black/20 border-white/5">
        <CardContent className="p-8 text-center">
          <div className="text-white opacity-70">No form data available.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-black/20 border-white/5 ${className}`}>
      <CardHeader className="pb-2">
        <FormTableHeader
          filter={filter}
          onFilterChange={setFilter}
          onRequestSort={requestSort}
          onViewTypeChange={setViewType}
          viewType={viewType}
          sortConfig={sortConfig}
        />
      </CardHeader>

      <CardContent className="p-4">
        {viewType === "table" ? (
          <TableView teams={filteredItems} requestSort={requestSort} sortConfig={sortConfig} />
        ) : (
          <CardsView teams={filteredItems} />
        )}
      </CardContent>
    </Card>
  );
});

FormTable.displayName = "FormTable";
