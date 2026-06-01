import type { ReactNode } from "react";
import { CategoryBadge } from "./Badge";
import { stars } from "../lib/format";
import type { Career } from "../types";

type Row = { label: string; render: (c: Career) => ReactNode };

const ROWS: Row[] = [
  { label: "Category", render: (c) => <CategoryBadge category={c.category} /> },
  { label: "Entry comp", render: (c) => <span className="text-emerald-400">{c.comp.entryTotal}</span> },
  { label: "Senior comp", render: (c) => <span className="text-emerald-400">{c.comp.seniorTotal}</span> },
  { label: "Ceiling", render: (c) => <span className="text-emerald-400">{c.comp.ceiling}</span> },
  { label: "Hours/week", render: (c) => `${c.hoursPerWeek}` },
  { label: "Comp", render: (c) => `${c.ratings.comp}/5` },
  { label: "Work-life", render: (c) => `${c.ratings.workLife}/5` },
  { label: "Prestige", render: (c) => `${c.ratings.prestige}/5` },
  { label: "Difficulty", render: (c) => `${c.ratings.difficulty}/5` },
  { label: "ex-MBB fit", render: (c) => <span className="text-indigo-400">{stars(c.exMbbFit)}</span> },
  { label: "How to break in", render: (c) => <span className="text-sm text-slate-300">{c.breakIn.timeline}</span> },
  {
    label: "Top exits",
    render: (c) => <span className="text-sm text-slate-300">{c.exits.slice(0, 3).join(", ")}</span>,
  },
];

export function CompareTab({
  careers,
  onRemove,
  onGoExplore,
}: {
  careers: Career[];
  onRemove: (id: string) => void;
  onGoExplore: () => void;
}) {
  if (careers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 p-12 text-center">
        <p className="text-slate-400">No careers added to compare yet.</p>
        <button
          onClick={onGoExplore}
          className="mt-4 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-white"
        >
          Browse careers →
        </button>
        <p className="mt-3 text-xs text-slate-500">
          Open any career and tap “Add to compare” (up to 3).
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-slate-950 p-3 text-left text-xs uppercase tracking-wide text-slate-500">
              Attribute
            </th>
            {careers.map((c) => (
              <th key={c.id} className="min-w-[200px] p-3 text-left align-top">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xl" aria-hidden>
                      {c.emoji}
                    </div>
                    <div className="font-semibold text-slate-100">{c.name}</div>
                  </div>
                  <button
                    onClick={() => onRemove(c.id)}
                    className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                    aria-label={`Remove ${c.name}`}
                  >
                    ✕
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-t border-slate-800">
              <td className="sticky left-0 z-10 bg-slate-950 p-3 text-xs uppercase tracking-wide text-slate-500">
                {row.label}
              </td>
              {careers.map((c) => (
                <td key={c.id} className="p-3 text-sm text-slate-200">
                  {row.render(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
