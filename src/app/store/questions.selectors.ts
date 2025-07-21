import { questionsFeature } from './questions.feature';
import { createFormArrayState } from 'ngrx-forms';
import { Form, FORM_ID, validateDynamicForm } from './questions.reducer';
import { createSelector } from '@ngrx/store';

export const {
  name,
  reducer,
  selectBuilder,
  selectName,
  selectQuestionsState,
} = questionsFeature;

export const selectFormName = createSelector(
  selectName,
  (control) => control.value,
);

export const selectBuilderFormValue = createSelector(
  selectBuilder,
  (builder) => builder.value,
);

export const selectGeneratedForm = createSelector(
  selectBuilderFormValue,
  (form) => {
    return validateDynamicForm(
      createFormArrayState<Form>(
        FORM_ID,
        form.map((input) => ({
          type: input.type,
          label: input.label,
          options: input.options ?? [],
          someText: '',
          someBoolean: false,
          someBooleans: input.options.map(() => false),
          someDate: null,
          required: input.validators.required,
        })),
      ),
    );
  },
);

export const selectGeneratedFormValue = createSelector(
  selectGeneratedForm,
  (form) => JSON.stringify(form.value),
);
