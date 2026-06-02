import type { Category } from "../types";

export type CategoryMeta = {
  label: Category;
  emoji: string;
  description: string; // one-liner shown under the accordion header
  roles: string; // parenthetical role summary shown as subtext
  // Tailwind classes for badges/accents (kept as full literals so JIT picks them up)
  badge: string; // text + bg + border for a chip
  dot: string; // solid accent (bars, dots)
  ring: string; // hover/selected ring
};

export const CATEGORIES: CategoryMeta[] = [
  {
    label: "Consulting",
    emoji: "🧭",
    description: "Advise companies on strategy, operations, and transformation.",
    roles: "MBB (McKinsey, Bain, BCG) · Boutique & specialized (LEK, Oliver Wyman, Kearney)",
    badge: "text-sky-300 bg-sky-500/10 border-sky-500/30",
    dot: "bg-sky-500",
    ring: "ring-sky-500/40",
  },
  {
    label: "Private Equity & Investing",
    emoji: "💰",
    description: "Deploy capital across buyouts, growth, VC, and public markets.",
    roles: "PE investing · PE portfolio ops (KKR Capstone, Bain Capital PG) · Growth equity · VC · Hedge fund · Search fund / ETA · Asset management · Family office",
    badge: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/40",
  },
  {
    label: "Investment Banking",
    emoji: "🏦",
    description: "Advisory on M&A, capital raises, and restructuring at the deal table.",
    roles: "Post-MBA Associate at bulge brackets (GS, MS, JPM) & elite boutiques (Evercore, Centerview)",
    badge: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    dot: "bg-amber-500",
    ring: "ring-amber-500/40",
  },
  {
    label: "Tech",
    emoji: "💻",
    description: "Build and operate products and businesses inside tech companies.",
    roles: "Product Management (APM/RPM) · BizOps / Strategy & Ops / Chief of Staff · GM & leadership rotational programs",
    badge: "text-violet-300 bg-violet-500/10 border-violet-500/30",
    dot: "bg-violet-500",
    ring: "ring-violet-500/40",
  },
  {
    label: "Startups",
    emoji: "🚀",
    description: "Build or operate venture-backed companies at every stage.",
    roles: "Founder · Early-stage operator (Seed–Series A) · Growth-stage operator (Series B+) · EIR / Founder-in-Residence",
    badge: "text-rose-300 bg-rose-500/10 border-rose-500/30",
    dot: "bg-rose-500",
    ring: "ring-rose-500/40",
  },
  {
    label: "Corporate & Industry",
    emoji: "🏢",
    description: "In-house leadership, strategy, and operating roles at large companies.",
    roles: "Corporate strategy · Corporate development / M&A · General management / LDP · CPG brand management · Real estate PE · Healthcare / pharma commercial",
    badge: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    dot: "bg-cyan-500",
    ring: "ring-cyan-500/40",
  },
  {
    label: "Luxury & Lifestyle",
    emoji: "✨",
    description: "Lead brands and experiences where taste and prestige are the product.",
    roles: "Luxury brand management (LVMH, Richemont, Kering, Hermès) · Luxury hospitality (Ritz-Carlton, Four Seasons, Aman)",
    badge: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/30",
    dot: "bg-fuchsia-500",
    ring: "ring-fuchsia-500/40",
  },
  {
    label: "Impact & Climate",
    emoji: "🌍",
    description: "Deploy capital and operating talent where profit meets purpose.",
    roles: "Impact investing (TPG Rise, Bain Double Impact, IFC) · Climate tech & energy transition · Social enterprise / nonprofit leadership",
    badge: "text-teal-300 bg-teal-500/10 border-teal-500/30",
    dot: "bg-teal-500",
    ring: "ring-teal-500/40",
  },
  {
    label: "Media, Sports & Entertainment",
    emoji: "🎬",
    description: "Strategy, operations, and business leadership where culture is the business.",
    roles: "Sports front office · Sports private equity (Silver Lake, Arctos) · Media & streaming strategy (Disney, Netflix) · Gaming & entertainment",
    badge: "text-orange-300 bg-orange-500/10 border-orange-500/30",
    dot: "bg-orange-500",
    ring: "ring-orange-500/40",
  },
];

export const CATEGORY_MAP: Record<Category, CategoryMeta> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.label] = c;
    return acc;
  },
  {} as Record<Category, CategoryMeta>
);
