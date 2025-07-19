import { questionsFeature } from './questions.feature';
import { createSelector } from '@ngrx/store';

export const {
  name,
  reducer,
  selectBuilder,
  selectForm,
  selectQuestions,
  selectQuestionsState,
} = questionsFeature;
