// types.ts
export interface Option {
    text: string;
    isCorrect: boolean;
  }
  
  export interface Question {
    questionText: string;
    options: Option[];
    points: number;
  }
  
  export interface Quiz {
    title: string;
    type: string;
    questions: Question[];
    status: string;
  }
  