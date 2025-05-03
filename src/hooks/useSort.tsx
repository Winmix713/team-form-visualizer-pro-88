
import { useState, useMemo } from "react";

export type SortConfig<T> = {
  key: keyof T;
  direction: "asc" | "desc";
} | null;

export function useSort<T extends Record<string, any>>(
  items: T[],
  defaultSortConfig: SortConfig<T> = null
) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(defaultSortConfig);

  const sortedItems = useMemo(() => {
    if (!sortConfig) return items;

    return [...items].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [items, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return { sortedItems, requestSort, sortConfig };
}
