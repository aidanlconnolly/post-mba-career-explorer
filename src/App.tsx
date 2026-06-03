import { useMemo, useState } from "react";
import { CAREERS } from "./data/careers";
import { TopNav } from "./components/TopNav";
import { CareerGrid } from "./components/CareerGrid";
import { CareerDetail } from "./components/CareerDetail";
import { CompareTab } from "./components/CompareTab";
import { FitQuiz } from "./components/FitQuiz";
import { RecruitingTable } from "./components/RecruitingTable";
import { SORT_LABELS, SORT_KEYS } from "./lib/format";
import { useInterests } from "./lib/interest";
import type { Career, SortKey, View } from "./types";

const MAX_COMPARE = 3;

export default function App() {
  const [view, setView] = useState<View>("explore");
  const [selected, setSelected] = useState<Career | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("comp");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [interestMode, setInterestMode] = useState(false);
  const { interests, setInterest } = useInterests();

  const sorted = useMemo(
    () => [...CAREERS].sort((a, b) => b.ratings[sortKey] - a.ratings[sortKey]),
    [sortKey]
  );

  const compareCareers = useMemo(
    () =>
      compareIds
        .map((id) => CAREERS.find((c) => c.id === id))
        .filter((c): c is Career => Boolean(c)),
    [compareIds]
  );

  function toggleCompare(id: string) {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_COMPARE
          ? [...prev, id]
          : prev
    );
  }

  function openCareer(c: Career) {
    setSelected(c);
    window.scrollTo({ top: 0 });
  }

  function openCareerById(id: string) {
    const c = CAREERS.find((x) => x.id === id);
    if (c) openCareer(c);
  }

  function changeView(v: View) {
    setSelected(null);
    setView(v);
  }

  return (
    <div className="min-h-full">
      <TopNav view={view} onChange={changeView} compareCount={compareIds.length} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {selected ? (
          <CareerDetail
            career={selected}
            onBack={() => setSelected(null)}
            inCompare={compareIds.includes(selected.id)}
            canAddCompare={compareIds.length < MAX_COMPARE}
            onToggleCompare={() => toggleCompare(selected.id)}
            interest={interests[selected.id]}
            onSetInterest={(state) => setInterest(selected.id, state)}
          />
        ) : view === "explore" ? (
          <>
            {/* Sort / filter controls */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <p className="text-sm text-slate-500">{CAREERS.length} careers across 9 categories</p>
                <button
                  onClick={() => setInterestMode((m) => !m)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                    interestMode
                      ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-300"
                      : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                  }`}
                >
                  {interestMode ? "✓ My List" : "☆ My List"}
                </button>
              </div>
              {!interestMode && (
                <label className="flex items-center gap-2 text-sm text-slate-400">
                  Sort by
                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                    className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-slate-200 focus:border-slate-500 focus:outline-none"
                  >
                    {SORT_KEYS.map((k) => (
                      <option key={k} value={k}>
                        {SORT_LABELS[k]}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            <CareerGrid careers={sorted} onSelect={openCareer} interests={interests} flatMode={interestMode} />
          </>
        ) : view === "compare" ? (
          <CompareTab
            careers={compareCareers}
            onRemove={(id) => toggleCompare(id)}
            onGoExplore={() => changeView("explore")}
          />
        ) : view === "quiz" ? (
          <FitQuiz onSelect={openCareer} />
        ) : (
          <RecruitingTable onSelect={openCareerById} />
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-slate-600">
        Compensation ranges are US-market estimates (2025–26) and vary by firm, city, and year.
        Recruiting data reflects general patterns — verify with your school's career office.
      </footer>
    </div>
  );
}
