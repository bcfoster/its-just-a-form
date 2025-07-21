import { questionsFeature } from './questions.feature';
import { createFormArrayState } from 'ngrx-forms';
import { FORM_ID } from './questions.reducer';
import { createSelector } from '@ngrx/store';

export const {
  name,
  reducer,
  selectBuilder,
  selectForm,
  selectQuestions,
  selectQuestionsState,
} = questionsFeature;

export const selectBuilderFormValue = createSelector(
  selectBuilder,
  (builder) => builder.value,
);

export const selectGeneratedForm = createSelector(
  selectBuilderFormValue,
  (form) => {
    return createFormArrayState(
      FORM_ID,
      form.map((form) => ({
        type: form.type,
        label: form.label,
        someText: '',
        someBoolean: false,
        someBooleans: [],
        someDate: null,
        required: form.validators.required,
      })),
    );
  },
);
