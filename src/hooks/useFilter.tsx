
import { useState, useMemo } from "react";

export function useFilter<T extends Record<string, any>>(
  items: T[],
  filterKey: keyof T
) {
  const [filter, setFilter] = useState("");

  const filteredItems = useMemo(() => {
    return filter === ""
      ? items
      : items.filter((item) => {
          const value = item[filterKey];
          return typeof value === "string" && value.toLowerCase().includes(filter.toLowerCase());
        });
  }, [items, filter, filterKey]);

  return { filter, setFilter, filteredItems };
}
