
import { useState } from "react";

export type ViewType = "table" | "cards";

export function useViewType(defaultView: ViewType = "table") {
  const [viewType, setViewType] = useState<ViewType>(defaultView);
  return { viewType, setViewType };
}
