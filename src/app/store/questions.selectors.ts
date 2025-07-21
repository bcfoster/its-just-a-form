import { questionsFeature } from './questions.feature';
import { createFormArrayState } from 'ngrx-forms';
import { FORM_ID, validateForm } from './questions.reducer';
import { createSelector } from '@ngrx/store';

export const { name, reducer, selectBuilder, selectQuestionsState } =
  questionsFeature;

export const selectBuilderFormValue = createSelector(
  selectBuilder,
  (builder) => builder.value,
);

export const selectGeneratedForm = createSelector(
  selectBuilderFormValue,
  (form) => {
    return validateForm(
      createFormArrayState(
        FORM_ID,
        form.map((input) => ({
          type: input.type,
          label: input.label,
          someText: '',
          someBoolean: false,
          someBooleans: [],
          someDate: null,
          required: input.validators.required,
        })),
      ),
    );
  },
);
