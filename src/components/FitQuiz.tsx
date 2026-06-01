import { useState } from "react";
import { CareerCard } from "./CareerCard";
import { QUESTIONS, scoreCareers, type Axis } from "../lib/quiz";
import { CAREERS } from "../data/careers";
import type { Career } from "../types";

export function FitQuiz({ onSelect }: { onSelect: (c: Career) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<Axis, number>>>({});
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;

  function choose(axis: Axis, value: number) {
    const next = { ...answers, [axis]: value };
    setAnswers(next);
    if (step + 1 >= total) setDone(true);
    else setStep(step + 1);
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  if (done) {
    const ranked = scoreCareers(answers, CAREERS).slice(0, 6);
    return (
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Your top career matches</h2>
            <p className="text-sm text-slate-400">
              Ranked by fit with your answers. Tap any card for the full breakdown.
            </p>
          </div>
          <button
            onClick={restart}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-slate-500"
          >
            ↺ Retake
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ranked.map(({ career, match }) => (
            <CareerCard
              key={career.id}
              career={career}
              matchPct={match}
              onClick={() => onSelect(career)}
            />
          ))}
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>
            Question {step + 1} of {total}
          </span>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="hover:text-slate-300">
              ← Back
            </button>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="mb-5 text-xl font-semibold text-slate-100">{q.prompt}</h2>
      <div className="space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => choose(q.axis, opt.value)}
            className="block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left text-slate-200 transition hover:border-indigo-500/60 hover:bg-slate-900"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
