import { useState } from "react";
import { CareerCard } from "./CareerCard";
import { CATEGORIES, CATEGORY_MAP } from "../data/categories";
import type { Career, Category } from "../types";

function CategorySection({
  category,
  careers,
  onSelect,
}: {
  category: Category;
  careers: Career[];
  onSelect: (c: Career) => void;
}) {
  const [open, setOpen] = useState(false);
  const meta = CATEGORY_MAP[category];
  return (
    <section>
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-left transition hover:border-slate-600 hover:bg-slate-900"
      >
        <span className="mt-0.5 text-xl" aria-hidden>{meta.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-200">{category}</h2>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-500">
              {careers.length}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 leading-snug">{meta.roles}</p>
        </div>
        <span
          className={`mt-1 shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((c) => (
            <CareerCard key={c.id} career={c} onClick={() => onSelect(c)} />
          ))}
        </div>
      )}
    </section>
  );
}

export function CareerGrid({
  careers,
  grouped,
  onSelect,
}: {
  careers: Career[];
  grouped: boolean;
  onSelect: (c: Career) => void;
}) {
  if (careers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 p-12 text-center text-slate-500">
        No careers match these filters.
      </div>
    );
  }

  if (!grouped) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {careers.map((c) => (
          <CareerCard key={c.id} career={c} onClick={() => onSelect(c)} />
        ))}
      </div>
    );
  }

  // Preserve the canonical category order, keep within-group sort from App
  const byCategory = new Map<Category, Career[]>();
  for (const c of careers) {
    const arr = byCategory.get(c.category) ?? [];
    arr.push(c);
    byCategory.set(c.category, arr);
  }
  const orderedCategories = CATEGORIES.map((m) => m.label).filter((cat) =>
    byCategory.has(cat)
  );

  return (
    <div className="space-y-4">
      {orderedCategories.map((cat) => (
        <CategorySection
          key={cat}
          category={cat}
          careers={byCategory.get(cat)!}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
