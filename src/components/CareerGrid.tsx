import { useState } from "react";
import { CareerCard } from "./CareerCard";
import { SUPER_CATEGORIES, CATEGORY_MAP } from "../data/categories";
import type { Career, Category } from "../types";
import type { InterestState } from "../lib/interest";

// ── Category tile (square card) ──────────────────────────────────
function CategoryTile({
  category,
  count,
  open,
  onToggle,
}: {
  category: Category;
  count: number;
  open: boolean;
  onToggle: () => void;
}) {
  const meta = CATEGORY_MAP[category];
  return (
    <button
      onClick={onToggle}
      className={`flex flex-col items-start rounded-xl border p-4 text-left transition ${
        open
          ? "border-slate-400 bg-slate-800"
          : "border-slate-800 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900"
      }`}
    >
      <span className="text-2xl mb-2" aria-hidden>{meta.emoji}</span>
      <span className="text-sm font-semibold text-slate-200 leading-snug">{category}</span>
      <span className="mt-1 text-xs text-slate-500">{count} {count === 1 ? "career" : "careers"}</span>
      <span className="mt-1.5 text-xs text-slate-600 leading-snug line-clamp-2">{meta.roles}</span>
    </button>
  );
}

// ── Super-category section ───────────────────────────────────────
function SuperSection({
  label,
  categories,
  careersByCategory,
  onSelect,
  interests,
}: {
  label: string;
  categories: Category[];
  careersByCategory: Map<Category, Career[]>;
  onSelect: (c: Career) => void;
  interests: Record<string, InterestState>;
}) {
  const [openCat, setOpenCat] = useState<Category | null>(null);

  // Only show categories that have careers after filtering/sorting
  const visibleCats = categories.filter((c) => (careersByCategory.get(c)?.length ?? 0) > 0);
  if (visibleCats.length === 0) return null;

  function toggle(cat: Category) {
    setOpenCat((prev) => (prev === cat ? null : cat));
  }

  const openCareers = openCat ? (careersByCategory.get(openCat) ?? []) : [];

  return (
    <section>
      {/* Super-category header */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </h2>

      {/* Square tile grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visibleCats.map((cat) => (
          <CategoryTile
            key={cat}
            category={cat}
            count={careersByCategory.get(cat)!.length}
            open={openCat === cat}
            onToggle={() => toggle(cat)}
          />
        ))}
      </div>

      {/* Expanded career cards */}
      {openCat && openCareers.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {openCareers.map((c) => (
            <CareerCard key={c.id} career={c} onClick={() => onSelect(c)} interest={interests[c.id]} />
          ))}
        </div>
      )}
    </section>
  );
}

// ── Flat interest view ───────────────────────────────────────────
function FlatSection({
  label,
  careers,
  onSelect,
  interests,
  emptyMsg,
}: {
  label: string;
  careers: Career[];
  onSelect: (c: Career) => void;
  interests: Record<string, InterestState>;
  emptyMsg: string;
}) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</h2>
      {careers.length === 0 ? (
        <p className="text-sm text-slate-600 italic">{emptyMsg}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((c) => (
            <CareerCard key={c.id} career={c} onClick={() => onSelect(c)} interest={interests[c.id]} />
          ))}
        </div>
      )}
    </section>
  );
}

// ── Main export ──────────────────────────────────────────────────
export function CareerGrid({
  careers,
  onSelect,
  interests = {},
  flatMode = false,
}: {
  careers: Career[];
  onSelect: (c: Career) => void;
  interests?: Record<string, InterestState>;
  flatMode?: boolean;
}) {
  if (careers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 p-12 text-center text-slate-500">
        No careers match these filters.
      </div>
    );
  }

  if (flatMode) {
    const interested = careers.filter((c) => interests[c.id] === "interested");
    const notInterested = careers.filter((c) => interests[c.id] === "not-interested");
    const unsorted = careers.filter((c) => !interests[c.id]);
    return (
      <div className="space-y-10">
        <FlatSection label="Interested" careers={interested} onSelect={onSelect} interests={interests} emptyMsg="No roles marked interested yet." />
        <FlatSection label="Not Interested" careers={notInterested} onSelect={onSelect} interests={interests} emptyMsg="No roles marked not interested yet." />
        {unsorted.length > 0 && (
          <FlatSection label="Undecided" careers={unsorted} onSelect={onSelect} interests={interests} emptyMsg="" />
        )}
      </div>
    );
  }

  // Group careers by category (preserving the sort order from props)
  const byCategory = new Map<Category, Career[]>();
  for (const c of careers) {
    const arr = byCategory.get(c.category) ?? [];
    arr.push(c);
    byCategory.set(c.category, arr);
  }

  return (
    <div className="space-y-10">
      {SUPER_CATEGORIES.map((sc) => (
        <SuperSection
          key={sc.label}
          label={sc.label}
          categories={sc.categories}
          careersByCategory={byCategory}
          onSelect={onSelect}
          interests={interests}
        />
      ))}
    </div>
  );
}
