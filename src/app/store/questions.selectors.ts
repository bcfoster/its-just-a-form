import { questionsFeature } from './questions.feature';
import { createSelector } from '@ngrx/store';

export const { name, reducer, selectForms, selectQuestionsState } =
  questionsFeature;

export const selectFormName = createSelector(
  selectForms,
  (forms) => forms.value.name,
);

export const selectBuilderFormValue = createSelector(
  selectForms,
  (forms) => forms.value.builder,
);
