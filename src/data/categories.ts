import type { Category } from "../types";

export type CategoryMeta = {
  label: Category;
  emoji: string;
  // Tailwind classes for badges/accents (kept as full literals so JIT picks them up)
  badge: string; // text + bg + border for a chip
  dot: string; // solid accent (bars, dots)
  ring: string; // hover/selected ring
};

export const CATEGORIES: CategoryMeta[] = [
  {
    label: "Consulting",
    emoji: "🧭",
    badge: "text-sky-300 bg-sky-500/10 border-sky-500/30",
    dot: "bg-sky-500",
    ring: "ring-sky-500/40",
  },
  {
    label: "Private Equity & Investing",
    emoji: "💰",
    badge: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/40",
  },
  {
    label: "Investment Banking",
    emoji: "🏦",
    badge: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    dot: "bg-amber-500",
    ring: "ring-amber-500/40",
  },
  {
    label: "Tech",
    emoji: "💻",
    badge: "text-violet-300 bg-violet-500/10 border-violet-500/30",
    dot: "bg-violet-500",
    ring: "ring-violet-500/40",
  },
  {
    label: "Startups",
    emoji: "🚀",
    badge: "text-rose-300 bg-rose-500/10 border-rose-500/30",
    dot: "bg-rose-500",
    ring: "ring-rose-500/40",
  },
  {
    label: "Corporate & Industry",
    emoji: "🏢",
    badge: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    dot: "bg-cyan-500",
    ring: "ring-cyan-500/40",
  },
  {
    label: "Luxury & Lifestyle",
    emoji: "✨",
    badge: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/30",
    dot: "bg-fuchsia-500",
    ring: "ring-fuchsia-500/40",
  },
];

export const CATEGORY_MAP: Record<Category, CategoryMeta> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.label] = c;
    return acc;
  },
  {} as Record<Category, CategoryMeta>
);
