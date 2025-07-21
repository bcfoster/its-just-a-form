import { createReducer, on } from '@ngrx/store';
import { InputTypes, Question } from './index';
import { questionsActions } from './questions.actions';
import {
  createFormArrayState,
  FormArrayState,
  onNgrxForms,
  setUserDefinedProperty,
  setValue,
  updateArray,
  updateGroup,
  validate,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';
import { immerOn } from 'ngrx-immer/store';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { required } from 'ngrx-forms/validation';

export const FORM_ID = 'question-form';
export const BUILDER_FORM_ID = 'builder-form';

export interface Form {
  // TODO: try using 'or null' optional property
  label?: string;
  type?: string;
  someText?: string;
  someBoolean?: boolean;
  someBooleans?: boolean[];
  someDate?: string | null;
  required?: boolean;
}

export interface Validators {
  required: boolean;
}

export interface FormInput {
  label: string;
  type: InputTypes;
  options: string[];
  validators: Validators;
}

export interface State {
  name: string;
  questions: Question[];
  form: FormArrayState<Form>;
  builder: FormArrayState<FormInput>;
}

export const initialFormValue: FormInput = {
  type: 'text',
  label: '',
  options: [],
  validators: {
    required: false,
  },
};

export const initialState: State = {
  name: 'Personal information',
  questions: [],
  form: createFormArrayState(FORM_ID, []),
  builder: createFormArrayState(BUILDER_FORM_ID, []),
};

const rawReducer = createReducer(
  initialState,
  onNgrxForms(),
  on(questionsActions.initialize, (state, action) => ({
    ...state,
    questions: action.questions,
    // TODO: updateArray with updateGroup<Form> that uses the same map/switch in mapToForms
    //       could updateGroup<Form> be used to chain multiple updates together that conditionally apply
    //       the user defined properties? if not, the user defined props must be set in an effect, right?
    form: setValue(state.form, mapToForms(action.questions)),
  })),
  immerOn(questionsActions.move, (state, action) => {
    moveItemInArray(state.questions, action.previousIndex, action.currentIndex);
    moveItemInArray(
      state.form.controls,
      action.previousIndex,
      action.currentIndex,
    );
  }),
);

const validateForm = updateArray<Form>(
  (group) => setUserDefinedProperty(group, 'required', true),
  (group) =>
    updateGroup<Form>(
      group,
      group.userDefinedProperties['required']
        ? {
            someBoolean: (c) => (c !== undefined ? validate(c, required) : c),
            someBooleans: (c) => (c !== undefined ? validate(c, required) : c),
            someDate: (c) => (c !== undefined ? validate(c, required) : c),
            someText: (c) => (c !== undefined ? validate(c, required) : c),
          }
        : {},
    ),
);

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  (state) => state.form,
  validateForm,
);

const mapToForms = (questions: Question[]): Form[] =>
  questions.map((q) => {
    switch (q.type) {
      case 'checkbox':
        return { someBooleans: [false, false, false, false, false] };
      case 'toggle':
        return { someBoolean: false };
      case 'date':
        return { someDate: null };
      case 'select':
      case 'text':
      case 'textarea':
      default:
        return { someText: '' };
    }
  });
