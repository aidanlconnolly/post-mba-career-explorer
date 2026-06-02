import { useState } from "react";
import { CAREERS } from "../data/careers";
import { CATEGORIES, CATEGORY_MAP } from "../data/categories";
import type { Category } from "../types";

function Tick({ yes }: { yes: boolean }) {
  return yes ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400">
      ✓ Yes
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-500">
      ✗ No
    </span>
  );
}

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative ml-1 inline-block">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 text-xs text-slate-400 hover:bg-slate-600"
        aria-label="More info"
      >
        i
      </button>
      {show && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-900 p-3 text-xs text-slate-300 shadow-xl">
          {text}
        </span>
      )}
    </span>
  );
}

export function RecruitingTable({ onSelect }: { onSelect: (id: string) => void }) {
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [internshipFilter, setInternshipFilter] = useState<"all" | "yes" | "no">("all");
  const [channelFilter, setChannelFilter] = useState<"all" | "yes" | "no">("all");

  const filtered = CAREERS.filter((c) => {
    if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
    if (internshipFilter === "yes" && !c.recruiting.mbaInternship) return false;
    if (internshipFilter === "no" && c.recruiting.mbaInternship) return false;
    if (channelFilter === "yes" && !c.recruiting.dedicatedChannel) return false;
    if (channelFilter === "no" && c.recruiting.dedicatedChannel) return false;
    return true;
  });

  const internshipYes = filtered.filter((c) => c.recruiting.mbaInternship).length;
  const channelYes = filtered.filter((c) => c.recruiting.dedicatedChannel).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-100">MBA Recruiting Guide</h2>
        <p className="mt-1 text-sm text-slate-400">
          Which paths have a dedicated MBA internship (summer between Y1–Y2) and which have a formal post-MBA recruiting channel.
          Hover the <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 text-xs text-slate-400">i</span> for detail on each.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
              categoryFilter === "all"
                ? "border-slate-100 bg-slate-100 text-slate-900"
                : "border-slate-700 text-slate-400 hover:border-slate-500"
            }`}
          >
            All categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              onClick={() => setCategoryFilter(c.label)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                categoryFilter === c.label
                  ? "border-slate-100 bg-slate-100 text-slate-900"
                  : "border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-2">
          <select
            value={internshipFilter}
            onChange={(e) => setInternshipFilter(e.target.value as "all" | "yes" | "no")}
            className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All internships</option>
            <option value="yes">Has internship</option>
            <option value="no">No internship</option>
          </select>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value as "all" | "yes" | "no")}
            className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All channels</option>
            <option value="yes">Has channel</option>
            <option value="no">No channel</option>
          </select>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center">
          <div className="text-2xl font-bold text-slate-100">{filtered.length}</div>
          <div className="text-xs text-slate-500">careers shown</div>
        </div>
        <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-3 text-center">
          <div className="text-2xl font-bold text-emerald-400">{internshipYes}</div>
          <div className="text-xs text-slate-500">have MBA internship</div>
        </div>
        <div className="rounded-xl border border-sky-900/40 bg-sky-950/20 p-3 text-center">
          <div className="text-2xl font-bold text-sky-400">{channelYes}</div>
          <div className="text-xs text-slate-500">have dedicated channel</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Career
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                MBA Internship
                <span className="ml-1 block text-xs font-normal normal-case tracking-normal text-slate-600">
                  (summer Y1→Y2)
                </span>
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Post-MBA Channel
                <span className="ml-1 block text-xs font-normal normal-case tracking-normal text-slate-600">
                  (on-campus / structured)
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.map((c) => {
              const catMeta = CATEGORY_MAP[c.category];
              return (
                <tr
                  key={c.id}
                  className="bg-slate-950/30 transition hover:bg-slate-900/60"
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onSelect(c.id)}
                      className="flex items-center gap-2 text-left hover:underline"
                    >
                      <span aria-hidden>{c.emoji}</span>
                      <span className="font-medium text-slate-200">{c.name}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${catMeta.badge}`}
                    >
                      {catMeta.emoji} {c.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Tick yes={c.recruiting.mbaInternship} />
                    <Tooltip text={c.recruiting.internshipNote} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Tick yes={c.recruiting.dedicatedChannel} />
                    <Tooltip text={c.recruiting.channelNote} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            No careers match these filters.
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-600">
        "MBA Internship" = a dedicated summer associate program between Year 1 and Year 2. "Post-MBA Channel" = a structured on-campus or known recruiting pipeline for full-time post-MBA roles. Hover <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-700 text-xs text-slate-400">i</span> for firm-specific detail.
      </p>
    </div>
  );
}
