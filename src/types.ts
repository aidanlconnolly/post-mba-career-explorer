export type Category =
  | "Consulting"
  | "Private Equity & Investing"
  | "Investment Banking"
  | "Quant Finance"
  | "Venture & Family Capital"
  | "Tech"
  | "Startups"
  | "Corporate & Industry"
  | "Luxury & Lifestyle"
  | "Impact & Climate"
  | "Media, Sports & Entertainment";

export type SuperCategory =
  | "Finance & Investing"
  | "Consulting"
  | "Tech & Startups"
  | "Corporate & Industry"
  | "Lifestyle & Culture"
  | "Impact";

export type Comp = {
  entryTotal: string;
  seniorTotal: string;
  ceiling: string;
  notes: string;
};

export type Ratings = {
  comp: number;      // 5 = highest earning power
  workLife: number;  // 5 = great balance
  prestige: number;
  difficulty: number; // 5 = hardest to break in
};

export type FitVector = {
  money: number;
  workLife: number;
  risk: number;
  structure: number;
  impact: number;
  analytical: number;
};

export type BreakIn = {
  timeline: string;
  whoHires: string[];
  whatHelps: string[];
  commonBackgrounds: string[];
};

export type Recruiting = {
  mbaInternship: boolean;
  internshipNote: string;
  dedicatedChannel: boolean;
  channelNote: string;
};

export type Career = {
  id: string;
  name: string;
  category: Category;
  emoji: string;
  tagline: string;
  exMbbFit: number;
  exMbbNote: string;
  comp: Comp;
  ratings: Ratings;
  hoursPerWeek: string;
  dayToDay: string[];
  pros: string[];
  cons: string[];
  breakIn: BreakIn;
  exits: string[];
  fit: FitVector;
  recruiting: Recruiting;
};

export type SortKey = "comp" | "workLife" | "prestige" | "difficulty";
export type View = "explore" | "compare" | "quiz" | "recruiting";

// ── Progression ───────────────────────────────────────────────────
export type ProgressionLikelihood = "High" | "Medium" | "Low" | "Variable";

export type ProgressionStep = {
  title: string;     // job level / title
  timeframe: string; // e.g. "Years 0–2"
  note?: string;     // optional stat, e.g. "~50% make it here"
};

export type Progression = {
  track: ProgressionStep[];
  likelihood: ProgressionLikelihood;
  likelihoodNote: string; // 1–2 sentences on dynamics & bottlenecks
};
