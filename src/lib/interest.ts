import { useState, useCallback } from "react";

export type InterestState = "interested" | "not-interested";

const KEY = "career-interests";

function load(): Record<string, InterestState> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function useInterests() {
  const [interests, setInterests] = useState<Record<string, InterestState>>(load);

  const setInterest = useCallback((id: string, state: InterestState | null) => {
    setInterests((prev) => {
      const next = { ...prev };
      if (state === null) {
        delete next[id];
      } else {
        next[id] = state;
      }
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { interests, setInterest };
}
