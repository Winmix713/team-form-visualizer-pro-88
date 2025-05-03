
import { cn } from "@/lib/utils";
import { ZonesConfig } from "@/hooks/useZones";

interface ZoneHighlighterProps {
  position: number;
  zones: ZonesConfig | null;
  className?: string;
}

export const ZoneHighlighter = ({ position, zones, className }: ZoneHighlighterProps) => {
  if (!zones) return null;

  return (
    <div
      className={cn(
        className,
        zones.champions === position && "bg-blue-500/5",
        zones.championsLeague >= position &&
          position > (zones.champions || 0) &&
          "bg-blue-500/5",
        zones.europaLeague >= position &&
          position > (zones.championsLeague || 0) &&
          "bg-amber-500/5",
        position > (zones.relegation || 0) && "bg-red-500/5"
      )}
    />
  );
};
