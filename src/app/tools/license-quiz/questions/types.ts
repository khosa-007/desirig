export interface Question {
  q: { en: string; pa: string };
  options: { en: string; pa: string }[];
  correct: number;
  explanation: { en: string; pa: string };
  category: string;
}

export interface Exam {
  id: string;
  name: { en: string; pa: string };
  questions: Question[];
}
