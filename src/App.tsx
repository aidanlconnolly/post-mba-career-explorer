import { useMemo, useState } from "react";
import { CAREERS } from "./data/careers";
import { TopNav } from "./components/TopNav";
import { FilterBar } from "./components/FilterBar";
import { CareerGrid } from "./components/CareerGrid";
import { CareerDetail } from "./components/CareerDetail";
import { CompareTab } from "./components/CompareTab";
import { FitQuiz } from "./components/FitQuiz";
import type { Career, Category, SortKey, View } from "./types";

const MAX_COMPARE = 3;

export default function App() {
  const [view, setView] = useState<View>("explore");
  const [selected, setSelected] = useState<Career | null>(null);
  const [category, setCategory] = useState<Category | "all">("all");
  const [exMbbOnly, setExMbbOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("comp");
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let list = CAREERS.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (exMbbOnly && c.exMbbFit < 4) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sortKey === "exMbbFit") return b.exMbbFit - a.exMbbFit;
      return b.ratings[sortKey] - a.ratings[sortKey];
    });
    return list;
  }, [category, exMbbOnly, sortKey]);

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
          />
        ) : view === "explore" ? (
          <>
            <FilterBar
              activeCategory={category}
              onCategory={setCategory}
              exMbbOnly={exMbbOnly}
              onExMbbToggle={() => setExMbbOnly((v) => !v)}
              sortKey={sortKey}
              onSort={setSortKey}
              resultCount={filtered.length}
            />
            <CareerGrid careers={filtered} grouped={category === "all"} onSelect={openCareer} />
          </>
        ) : view === "compare" ? (
          <CompareTab
            careers={compareCareers}
            onRemove={(id) => toggleCompare(id)}
            onGoExplore={() => changeView("explore")}
          />
        ) : (
          <FitQuiz onSelect={openCareer} />
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-slate-600">
        Compensation ranges are US-market estimates (2025–26) and vary by firm, city, and year.
        For directional exploration, not offers.
      </footer>
    </div>
  );
}
