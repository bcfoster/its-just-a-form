import { formBuilderFeature } from './form-builder.feature';
import { createSelector } from '@ngrx/store';

export const { name, reducer, selectForms } = formBuilderFeature;

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
  (forms) => forms.controls.name,
);
