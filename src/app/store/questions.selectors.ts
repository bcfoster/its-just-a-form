import { questionsFeature } from './questions.feature';
import { createSelector } from '@ngrx/store';

export const { name, reducer, selectForms, selectQuestionsState } =
  questionsFeature;

export const selectBuilderForm = createSelector(
  selectForms,
  (forms) => forms.controls.builder,
);

export const selectPreviewForm = createSelector(
  selectForms,
  (forms) => forms.controls.preview,
);

export const selectFormName = createSelector(
  selectForms,
  (forms) => forms.value.name,
);
