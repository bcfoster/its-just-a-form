import { questionsFeature } from './questions.feature';
import { createSelector } from '@ngrx/store';

export const {
  name,
  reducer,
  selectForm,
  selectQuestions,
  selectQuestionsState,
} = questionsFeature;
