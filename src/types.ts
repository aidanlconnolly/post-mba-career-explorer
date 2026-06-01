export type Category =
  | "Consulting"
  | "Private Equity & Investing"
  | "Investment Banking"
  | "Tech"
  | "Startups"
  | "Corporate & Industry"
  | "Luxury & Lifestyle";

export type Comp = {
  entryTotal: string; // first post-MBA year all-in
  seniorTotal: string; // ~senior level all-in
  ceiling: string; // realistic top of the path
  notes: string; // carry, equity, signing, caveats
};

// All ratings 1–5 (5 = highest)
export type Ratings = {
  comp: number; // total earning power
  workLife: number; // 5 = great balance, 1 = brutal
  prestige: number; // brand/exit signaling
  difficulty: number; // 5 = hardest to break into
};

// Quiz-matching axes, 0–100 (the "ideal candidate" profile for this path)
export type FitVector = {
  money: number; // how much the path optimizes for $
  workLife: number; // how much lifestyle/balance it offers
  risk: number; // comp/career volatility & uncertainty
  structure: number; // defined path & process vs. ambiguity
  impact: number; // mission / building something meaningful
  analytical: number; // analytical/quant vs. people/operating
};

export type BreakIn = {
  timeline: string; // when recruiting happens relative to MBA
  whoHires: string[]; // representative employers
  whatHelps: string[]; // levers that improve odds
  commonBackgrounds: string[]; // who tends to land it
};

export type Career = {
  id: string;
  name: string;
  category: Category;
  emoji: string;
  tagline: string;
  exMbbFit: number; // 1–5, how natural a landing spot for ex-MBB consultants
  exMbbNote: string;
  comp: Comp;
  ratings: Ratings;
  hoursPerWeek: string; // e.g. "55–70"
  dayToDay: string[];
  pros: string[];
  cons: string[];
  breakIn: BreakIn;
  exits: string[];
  fit: FitVector;
};

export type SortKey = "comp" | "workLife" | "prestige" | "difficulty" | "exMbbFit";
export type View = "explore" | "compare" | "quiz";
