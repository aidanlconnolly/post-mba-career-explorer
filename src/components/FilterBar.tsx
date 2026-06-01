import { CATEGORIES } from "../data/categories";
import { SORT_KEYS, SORT_LABELS } from "../lib/format";
import type { Category, SortKey } from "../types";

export function FilterBar({
  activeCategory,
  onCategory,
  exMbbOnly,
  onExMbbToggle,
  sortKey,
  onSort,
  resultCount,
}: {
  activeCategory: Category | "all";
  onCategory: (c: Category | "all") => void;
  exMbbOnly: boolean;
  onExMbbToggle: () => void;
  sortKey: SortKey;
  onSort: (k: SortKey) => void;
  resultCount: number;
}) {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onCategory("all")}
          className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
            activeCategory === "all"
              ? "border-slate-100 bg-slate-100 text-slate-900"
              : "border-slate-700 text-slate-300 hover:border-slate-500"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => {
          const active = activeCategory === c.label;
          return (
            <button
              key={c.label}
              onClick={() => onCategory(c.label)}
              className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                active
                  ? "border-slate-100 bg-slate-100 text-slate-900"
                  : "border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
            >
              <span className="mr-1" aria-hidden>
                {c.emoji}
              </span>
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={exMbbOnly}
              onChange={onExMbbToggle}
              className="h-4 w-4 rounded border-slate-600 bg-slate-800 accent-indigo-500"
            />
            Great for ex-MBB only
          </label>
          <span className="text-xs text-slate-500">{resultCount} careers</span>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-400">
          Sort by
          <select
            value={sortKey}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-slate-200 focus:border-slate-500 focus:outline-none"
          >
            {SORT_KEYS.map((k) => (
              <option key={k} value={k}>
                {SORT_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
