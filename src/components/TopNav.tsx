import type { View } from "../types";

const TABS: { id: View; label: string; emoji: string }[] = [
  { id: "explore", label: "Explore", emoji: "🧭" },
  { id: "compare", label: "Compare", emoji: "⚖️" },
  { id: "quiz", label: "Find my fit", emoji: "🎯" },
];

export function TopNav({
  view,
  onChange,
  compareCount,
}: {
  view: View;
  onChange: (v: View) => void;
  compareCount: number;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🎓
          </span>
          <div>
            <h1 className="text-lg font-bold leading-tight text-slate-100">
              Post-MBA Career Explorer
            </h1>
            <p className="text-xs text-slate-400">
              Salary, day-to-day reality & how to break in — including the niche paths
            </p>
          </div>
        </div>

        <nav className="flex gap-1 rounded-lg border border-slate-800 bg-slate-900 p-1">
          {TABS.map((t) => {
            const active = view === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span className="mr-1" aria-hidden>
                  {t.emoji}
                </span>
                {t.label}
                {t.id === "compare" && compareCount > 0 && (
                  <span
                    className={`ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${
                      active ? "bg-slate-900 text-slate-100" : "bg-indigo-500 text-white"
                    }`}
                  >
                    {compareCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
