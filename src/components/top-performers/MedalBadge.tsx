
import { memo } from "react";

interface MedalBadgeProps {
  position: number;
}

const MedalBadge = memo(({ position }: MedalBadgeProps) => {
  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case 1:
        return "bg-gray-400/20 text-gray-300 border-gray-400/30";
      case 2:
        return "bg-amber-700/20 text-amber-600 border-amber-700/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getMedalColor(position)}`}>
      {position + 1}
    </div>
  );
});

MedalBadge.displayName = "MedalBadge";

export default MedalBadge;
