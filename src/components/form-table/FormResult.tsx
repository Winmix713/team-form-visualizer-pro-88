
import { memo } from "react";

const FORM_COLORS = {
  W: "bg-emerald-500 hover:bg-emerald-600",
  D: "bg-amber-500 hover:bg-amber-600",
  L: "bg-red-500 hover:bg-red-600",
} as const;

interface FormResultProps {
  result: string;
}

export const FormResult = memo(({ result }: FormResultProps) => (
  <span
    className={`w-6 h-6 flex items-center justify-center text-xs font-semibold text-white rounded transition-colors ${
      FORM_COLORS[result as keyof typeof FORM_COLORS] ?? "bg-gray-500 hover:bg-gray-600"
    }`}
    title={result === "W" ? "Win" : result === "D" ? "Draw" : result === "L" ? "Loss" : "Unknown"}
  >
    {result}
  </span>
));

FormResult.displayName = "FormResult";
