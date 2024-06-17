export type QuestionnaireType = {
  id: number;
  title: string;
  isPublic: boolean;
  genreName: string;
  answerCount: number;
  createdAt: string;
  updatedAt: string;
};

export type AnswerType = {
  id: number;
  questionnaireTitle: string;
  genreName: string;
  numberOfQuestions: number;
  createdAt: string;
};

export type GenreType = {
  id: number;
  genreName: string;
};

export type QuestionTypeType = {
  id: number;
  typeName: string;
};
