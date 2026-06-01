import type { SortKey } from "../types";

// Rating (1–5) → percentage width for bars.
export function ratingPct(rating: number): number {
  return Math.max(0, Math.min(100, (rating / 5) * 100));
}

export const SORT_LABELS: Record<SortKey, string> = {
  comp: "Compensation",
  workLife: "Work-Life Balance",
  prestige: "Prestige",
  difficulty: "Hardest to break in",
  exMbbFit: "Best for ex-MBB",
};

export const SORT_KEYS: SortKey[] = ["comp", "workLife", "prestige", "exMbbFit", "difficulty"];

export const RATING_LABELS: { key: keyof RatingShape; label: string }[] = [
  { key: "comp", label: "Comp" },
  { key: "workLife", label: "Work-Life" },
  { key: "prestige", label: "Prestige" },
  { key: "difficulty", label: "Difficulty" },
];

type RatingShape = { comp: number; workLife: number; prestige: number; difficulty: number };

// "★★★★☆" style string for ex-MBB fit (1–5).
export function stars(n: number): string {
  const full = Math.round(n);
  return "★".repeat(full) + "☆".repeat(Math.max(0, 5 - full));
}
