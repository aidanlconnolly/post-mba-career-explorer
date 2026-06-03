import { CategoryBadge } from "./Badge";
import { ratingPct } from "../lib/format";
import type { Career } from "../types";
import type { InterestState } from "../lib/interest";

const MINI: { key: "comp" | "workLife"; label: string; color: string }[] = [
  { key: "comp", label: "💵 Comp", color: "bg-emerald-500" },
  { key: "workLife", label: "⚖️ Life", color: "bg-sky-500" },
];

const INTEREST_STYLES: Record<InterestState, string> = {
  "interested":     "border-emerald-600/60 bg-emerald-950/30 hover:border-emerald-500/80 hover:bg-emerald-950/50",
  "not-interested": "border-rose-700/50 bg-rose-950/20 hover:border-rose-600/70 hover:bg-rose-950/40",
};

export function CareerCard({
  career,
  onClick,
  matchPct,
  interest,
}: {
  career: Career;
  onClick: () => void;
  matchPct?: number;
  interest?: InterestState;
}) {
  const borderBg = interest
    ? INTEREST_STYLES[interest]
    : "border-slate-800 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900";

  return (
    <button
      onClick={onClick}
      className={`group flex h-full flex-col rounded-xl border p-4 text-left transition ${borderBg}`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="text-3xl" aria-hidden>
          {career.emoji}
        </span>
        {matchPct !== undefined ? (
          <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-xs font-bold text-indigo-300">
            {matchPct}% match
          </span>
        ) : (
          <CategoryBadge category={career.category} />
        )}
      </div>

      <h3 className="font-semibold text-slate-100 group-hover:text-white">{career.name}</h3>
      <p className="mt-1 flex-1 text-sm text-slate-400">{career.tagline}</p>

      <div className="mt-3 space-y-1.5">
        {MINI.map((m) => (
          <div key={m.key} className="flex items-center gap-2">
            <span className="w-16 text-xs text-slate-500">{m.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${m.color}`}
                style={{ width: `${ratingPct(career.ratings[m.key])}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-slate-800 pt-3">
        <span className="text-sm font-medium text-emerald-400">{career.comp.entryTotal}</span>
      </div>
    </button>
  );
}
