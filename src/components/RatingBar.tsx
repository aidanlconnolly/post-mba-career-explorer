import { ratingPct } from "../lib/format";

const COLORS: Record<string, string> = {
  comp: "bg-emerald-500",
  workLife: "bg-sky-500",
  prestige: "bg-amber-500",
  difficulty: "bg-rose-500",
};

export function RatingBar({
  label,
  value,
  metric,
}: {
  label: string;
  value: number; // 1–5
  metric: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="tabular-nums text-slate-300">{value}/5</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${COLORS[metric] ?? "bg-slate-400"}`}
          style={{ width: `${ratingPct(value)}%` }}
        />
      </div>
    </div>
  );
}
