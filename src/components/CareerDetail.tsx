import type { ReactNode } from "react";
import { CategoryBadge } from "./Badge";
import { RatingBar } from "./RatingBar";
import { RATING_LABELS, stars } from "../lib/format";
import { PROGRESSIONS } from "../data/progression";
import type { Career, ProgressionLikelihood } from "../types";
import type { InterestState } from "../lib/interest";

const LIKELIHOOD_STYLES: Record<ProgressionLikelihood, { badge: string; label: string }> = {
  High:     { badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300", label: "High" },
  Medium:   { badge: "border-amber-500/40 bg-amber-500/10 text-amber-300",       label: "Medium" },
  Low:      { badge: "border-rose-500/40 bg-rose-500/10 text-rose-300",           label: "Low" },
  Variable: { badge: "border-violet-500/40 bg-violet-500/10 text-violet-300",    label: "Variable" },
};

function List({ items, marker = "•" }: { items: string[]; marker?: string }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2 text-sm text-slate-300">
          <span className="select-none text-slate-600">{marker}</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      {children}
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t, i) => (
        <span
          key={i}
          className="rounded-md border border-slate-700 bg-slate-800/60 px-2 py-1 text-xs text-slate-300"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function CareerDetail({
  career,
  onBack,
  interest,
  onSetInterest,
}: {
  career: Career;
  onBack: () => void;
  interest?: InterestState;
  onSetInterest: (state: InterestState | null) => void;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200"
      >
        ← Back to all careers
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="text-5xl" aria-hidden>
              {career.emoji}
            </span>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">{career.name}</h2>
              <p className="mt-1 text-slate-400">{career.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <CategoryBadge category={career.category} />
                <span className="text-sm text-slate-500">⏱ {career.hoursPerWeek} hrs/week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          {RATING_LABELS.map((r) => (
            <RatingBar
              key={r.key}
              label={r.label}
              metric={r.key}
              value={career.ratings[r.key]}
            />
          ))}
        </div>
      </div>

      {/* ex-MBB callout */}
      <div className="mt-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-indigo-300">Fit for ex-MBB consultants</span>
          <span className="text-indigo-400">{stars(career.exMbbFit)}</span>
        </div>
        <p className="mt-1 text-sm text-slate-300">{career.exMbbNote}</p>
      </div>

      {/* Compensation */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { k: "Entry (1st yr)", v: career.comp.entryTotal },
          { k: "Senior", v: career.comp.seniorTotal },
          { k: "Ceiling", v: career.comp.ceiling },
        ].map((c) => (
          <div key={c.k} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">{c.k}</div>
            <div className="mt-1 font-semibold text-emerald-400">{c.v}</div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-sm text-slate-400">
        <span className="font-medium text-slate-300">💡 Comp notes: </span>
        {career.comp.notes}
      </p>

      {/* Advancement track */}
      {(() => {
        const prog = PROGRESSIONS[career.id];
        if (!prog) return null;
        const style = LIKELIHOOD_STYLES[prog.likelihood];
        return (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Advancement Track
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Likelihood of reaching senior level:</span>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}>
                  {style.label}
                </span>
              </div>
            </div>

            {/* Step track — horizontal scroll on mobile */}
            <div className="flex items-start gap-0 overflow-x-auto pb-2">
              {prog.track.map((step, i) => (
                <div key={i} className="flex items-start">
                  {/* Step node */}
                  <div className="flex min-w-[120px] max-w-[160px] flex-col items-center gap-1 px-2 text-center">
                    <div
                      className={`h-3 w-3 shrink-0 rounded-full border-2 ${
                        i === 0
                          ? "border-slate-400 bg-slate-400"
                          : "border-slate-600 bg-slate-800"
                      }`}
                    />
                    <span className="text-xs font-medium leading-snug text-slate-200">{step.title}</span>
                    <span className="text-xs text-slate-500">{step.timeframe}</span>
                    {step.note && (
                      <span className="text-xs italic text-slate-600">{step.note}</span>
                    )}
                  </div>
                  {/* Connector line */}
                  {i < prog.track.length - 1 && (
                    <div className="mt-1.5 h-px w-6 shrink-0 bg-slate-700" />
                  )}
                </div>
              ))}
            </div>

            <p className="mt-3 text-sm text-slate-400">{prog.likelihoodNote}</p>
          </div>
        );
      })()}

      {/* Body grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <Section title="A day in the life">
            <List items={career.dayToDay} />
          </Section>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <Section title="How to break in">
            <p className="mb-3 text-sm text-slate-300">
              <span className="font-medium text-slate-200">Timing: </span>
              {career.breakIn.timeline}
            </p>
            <div className="space-y-3">
              <div>
                <div className="mb-1.5 text-xs uppercase tracking-wide text-slate-500">
                  Who hires
                </div>
                <Chips items={career.breakIn.whoHires} />
              </div>
              <div>
                <div className="mb-1.5 text-xs uppercase tracking-wide text-slate-500">
                  What helps
                </div>
                <List items={career.breakIn.whatHelps} marker="✓" />
              </div>
              <div>
                <div className="mb-1.5 text-xs uppercase tracking-wide text-slate-500">
                  Common backgrounds
                </div>
                <Chips items={career.breakIn.commonBackgrounds} />
              </div>
            </div>
          </Section>
        </div>

        <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-5">
          <Section title="Pros">
            <List items={career.pros} marker="+" />
          </Section>
        </div>

        <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-5">
          <Section title="Cons">
            <List items={career.cons} marker="−" />
          </Section>
        </div>
      </div>

      {/* Exits */}
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <Section title="Where it leads (exit paths)">
          <Chips items={career.exits} />
        </Section>
      </div>

      {/* Interest buttons */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <p className="mb-4 text-sm font-semibold text-slate-300">Is this role a fit for you?</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onSetInterest(interest === "interested" ? null : "interested")}
            className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition ${
              interest === "interested"
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                : "border-slate-700 text-slate-300 hover:border-emerald-600/60 hover:bg-emerald-950/30 hover:text-emerald-300"
            }`}
          >
            <span>👍</span> Interested
            {interest === "interested" && <span className="ml-1 text-xs opacity-60">(click to clear)</span>}
          </button>
          <button
            onClick={() => onSetInterest(interest === "not-interested" ? null : "not-interested")}
            className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition ${
              interest === "not-interested"
                ? "border-rose-500 bg-rose-500/20 text-rose-300"
                : "border-slate-700 text-slate-300 hover:border-rose-700/60 hover:bg-rose-950/30 hover:text-rose-300"
            }`}
          >
            <span>👎</span> Not Interested
            {interest === "not-interested" && <span className="ml-1 text-xs opacity-60">(click to clear)</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
