import { CategoryBadge, ExMbbBadge } from "./Badge";
import { ratingPct } from "../lib/format";
import type { Career } from "../types";

const MINI: { key: "comp" | "workLife"; label: string; color: string }[] = [
  { key: "comp", label: "💵 Comp", color: "bg-emerald-500" },
  { key: "workLife", label: "⚖️ Life", color: "bg-sky-500" },
];

export function CareerCard({
  career,
  onClick,
  matchPct,
}: {
  career: Career;
  onClick: () => void;
  matchPct?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left transition hover:border-slate-600 hover:bg-slate-900"
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

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3">
        <span className="text-sm font-medium text-emerald-400">{career.comp.entryTotal}</span>
        <ExMbbBadge fit={career.exMbbFit} />
      </div>
    </button>
  );
}
