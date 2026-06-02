import { useState } from "react";
import { CAREERS } from "../data/careers";
import { CATEGORY_MAP } from "../data/categories";

type SortCol = "name" | "category" | "internship" | "channel";
type SortDir = "asc" | "desc";

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

function SortHeader({
  col,
  label,
  sub,
  sortCol,
  sortDir,
  onSort,
  align = "left",
}: {
  col: SortCol;
  label: string;
  sub?: string;
  sortCol: SortCol;
  sortDir: SortDir;
  onSort: (c: SortCol) => void;
  align?: "left" | "center";
}) {
  const active = sortCol === col;
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <button
        onClick={() => onSort(col)}
        className={`inline-flex flex-col ${align === "center" ? "items-center" : "items-start"} gap-0.5 hover:text-slate-300 ${active ? "text-slate-300" : ""}`}
      >
        <span className="flex items-center gap-1">
          {label}
          <span className="text-slate-600">
            {active ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕"}
          </span>
        </span>
        {sub && <span className="text-xs font-normal normal-case tracking-normal text-slate-600">{sub}</span>}
      </button>
    </th>
  );
}

export function RecruitingTable({ onSelect }: { onSelect: (id: string) => void }) {
  const [sortCol, setSortCol] = useState<SortCol>("internship");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(col: SortCol) {
    if (col === sortCol) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      // For yes/no columns default desc (Yes first); for text default asc
      setSortDir(col === "internship" || col === "channel" ? "desc" : "asc");
    }
  }

  const sorted = [...CAREERS].sort((a, b) => {
    let cmp = 0;
    if (sortCol === "name") cmp = a.name.localeCompare(b.name);
    else if (sortCol === "category") cmp = a.category.localeCompare(b.category);
    else if (sortCol === "internship") {
      cmp = Number(a.recruiting.mbaInternship) - Number(b.recruiting.mbaInternship);
    } else if (sortCol === "channel") {
      cmp = Number(a.recruiting.dedicatedChannel) - Number(b.recruiting.dedicatedChannel);
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  const internshipYes = CAREERS.filter((c) => c.recruiting.mbaInternship).length;
  const channelYes = CAREERS.filter((c) => c.recruiting.dedicatedChannel).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-100">MBA Recruiting Guide</h2>
        <p className="mt-1 text-sm text-slate-400">
          Which paths have a dedicated MBA internship (summer between Y1–Y2) and which have a formal post-MBA recruiting channel.
          Click any column header to sort. Hover{" "}
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 text-xs text-slate-400">i</span>
          {" "}for firm-specific detail.
        </p>
      </div>

      {/* Summary stats */}
      <div className="mb-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center">
          <div className="text-2xl font-bold text-slate-100">{CAREERS.length}</div>
          <div className="text-xs text-slate-500">total careers</div>
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
              <SortHeader col="name" label="Career" sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
              <SortHeader col="category" label="Category" sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
              <SortHeader
                col="internship"
                label="MBA Internship"
                sub="summer Y1→Y2"
                sortCol={sortCol}
                sortDir={sortDir}
                onSort={handleSort}
                align="center"
              />
              <SortHeader
                col="channel"
                label="Post-MBA Channel"
                sub="on-campus / structured"
                sortCol={sortCol}
                sortDir={sortDir}
                onSort={handleSort}
                align="center"
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sorted.map((c) => {
              const catMeta = CATEGORY_MAP[c.category];
              return (
                <tr key={c.id} className="bg-slate-950/30 transition hover:bg-slate-900/60">
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
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${catMeta.badge}`}>
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
      </div>

      <p className="mt-4 text-xs text-slate-600">
        "MBA Internship" = dedicated summer program between Year 1 and Year 2. "Post-MBA Channel" = structured on-campus or known recruiting pipeline for full-time roles. Data reflects 2025–26 general patterns.
      </p>
    </div>
  );
}
