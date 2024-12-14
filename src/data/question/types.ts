export interface Question {
  id: number;
  question: string;
  answer: string | string[];
  answers: {
    [key: string]: string;
  };
  tag?: string[];
}

export interface QuestionsList {
  questions: Question[];
}
