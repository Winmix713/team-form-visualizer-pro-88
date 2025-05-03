
import { useMemo } from "react";

export interface ZonesConfig {
  champions: number;
  championsLeague: number;
  europaLeague: number;
  relegation: number;
}

export function useZones(itemsCount: number) {
  return useMemo(() => {
    if (itemsCount === 0) return null;
    
    return {
      champions: itemsCount >= 1 ? 1 : 0,
      championsLeague: itemsCount >= 4 ? 4 : 0,
      europaLeague: itemsCount >= 6 ? 6 : 0,
      relegation: itemsCount >= 3 ? itemsCount - 3 : 0,
    };
  }, [itemsCount]);
}
