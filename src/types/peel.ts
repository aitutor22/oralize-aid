
export type SectionType = "point" | "explanation" | "example" | "link";

export interface ScoredWord {
  word: string;
  score: "good" | "fair" | "poor";
}
