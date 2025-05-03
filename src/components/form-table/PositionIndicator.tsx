
import { memo } from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface PositionIndicatorProps {
  position: number;
  prevPosition?: number;
}

export const PositionIndicator = memo(({ position, prevPosition }: PositionIndicatorProps) => {
  if (!prevPosition) return <span>{position}</span>;

  const diff = prevPosition - position;
  if (diff === 0)
    return (
      <span className="flex items-center gap-1">
        {position} <Minus className="w-3 h-3 text-gray-400" />
      </span>
    );

  return (
    <span className="flex items-center gap-1">
      {position}
      {diff > 0 ? <ArrowUp className="w-3 h-3 text-emerald-500" /> : <ArrowDown className="w-3 h-3 text-red-500" />}
    </span>
  );
});

PositionIndicator.displayName = "PositionIndicator";
