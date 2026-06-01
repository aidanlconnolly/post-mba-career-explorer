import { CATEGORY_MAP } from "../data/categories";
import type { Category } from "../types";

export function CategoryBadge({ category }: { category: Category }) {
  const meta = CATEGORY_MAP[category];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${meta.badge}`}
    >
      <span aria-hidden>{meta.emoji}</span>
      {category}
    </span>
  );
}

export function ExMbbBadge({ fit }: { fit: number }) {
  if (fit < 4) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-300">
      ★ ex-MBB fit
    </span>
  );
}
