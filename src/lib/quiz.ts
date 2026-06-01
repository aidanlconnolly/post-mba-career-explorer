import type { Career, FitVector } from "../types";

export type Axis = keyof FitVector;

export type QuizOption = { label: string; value: number };
export type QuizQuestion = {
  id: string;
  axis: Axis;
  prompt: string;
  options: QuizOption[];
};

// Each question maps to exactly one FitVector axis; the chosen option sets the
// user's target value (0–100) on that axis. Careers are then ranked by how
// closely their `fit` profile matches the user's answers.
export const QUESTIONS: QuizQuestion[] = [
  {
    id: "money",
    axis: "money",
    prompt: "How much does maximizing total compensation drive your decision?",
    options: [
      { label: "It's my top priority — show me the money", value: 95 },
      { label: "Important, but not the only thing", value: 65 },
      { label: "Comfortable is enough; other things matter more", value: 35 },
    ],
  },
  {
    id: "workLife",
    axis: "workLife",
    prompt: "What kind of lifestyle are you after?",
    options: [
      { label: "Protect my time and balance", value: 80 },
      { label: "Happy to grind hard for a few years", value: 45 },
      { label: "All-in intensity is totally fine", value: 15 },
    ],
  },
  {
    id: "risk",
    axis: "risk",
    prompt: "How do you feel about risk and uncertainty?",
    options: [
      { label: "I want stability and predictable pay", value: 25 },
      { label: "Some risk for more upside", value: 55 },
      { label: "High risk, high reward — I'll bet big", value: 90 },
    ],
  },
  {
    id: "structure",
    axis: "structure",
    prompt: "Do you prefer structure or ambiguity?",
    options: [
      { label: "A clear path with defined roles", value: 75 },
      { label: "A healthy mix of both", value: 50 },
      { label: "I thrive in ambiguity and build from scratch", value: 20 },
    ],
  },
  {
    id: "impact",
    axis: "impact",
    prompt: "What motivates you most day to day?",
    options: [
      { label: "Building something meaningful / ownership", value: 85 },
      { label: "A balance of mission and outcomes", value: 55 },
      { label: "Prestige and financial outcomes", value: 30 },
    ],
  },
  {
    id: "analytical",
    axis: "analytical",
    prompt: "What kind of work energizes you?",
    options: [
      { label: "Deep analysis, modeling, and quant", value: 90 },
      { label: "A blend of analysis and people", value: 60 },
      { label: "Leading people, operating, relationships", value: 35 },
    ],
  },
];

export type ScoredCareer = { career: Career; match: number };

// Returns careers ranked by match % (100 = perfect). Only the axes the user
// answered are weighted, so partial quizzes still produce a sensible ranking.
export function scoreCareers(
  answers: Partial<Record<Axis, number>>,
  careers: Career[]
): ScoredCareer[] {
  const axes = Object.keys(answers) as Axis[];
  if (axes.length === 0) return careers.map((career) => ({ career, match: 0 }));

  const scored = careers.map((career) => {
    let totalDiff = 0;
    for (const axis of axes) {
      const target = answers[axis]!;
      totalDiff += Math.abs(career.fit[axis] - target);
    }
    const avgDiff = totalDiff / axes.length; // 0–100
    const match = Math.round(100 - avgDiff); // higher is better
    return { career, match };
  });

  return scored.sort((a, b) => b.match - a.match);
}
