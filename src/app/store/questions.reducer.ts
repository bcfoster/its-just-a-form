import { createReducer, on } from '@ngrx/store';
import { Question } from './index';
import { questionsActions } from './questions.actions';
import {
  createFormArrayState,
  FormArrayState,
  onNgrxForms,
  setValue,
} from 'ngrx-forms';
import { immerOn } from 'ngrx-immer/store';

export const FORM_ID = 'question-form';

export interface Form {
  // TODO: try using 'or null' optional property
  someText?: string;
  someBoolean?: boolean;
  someBooleans?: boolean[];
  someDate?: string | null;
}

export interface State {
  questions: Question[];
  form: FormArrayState<Form>;
}

export const initialState: State = {
  questions: [],
  form: createFormArrayState(FORM_ID, []),
};

export const reducer = createReducer(
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
    [
      state.questions[action.previousIndex],
      state.questions[action.currentIndex],
    ] = [
      state.questions[action.currentIndex],
      state.questions[action.previousIndex],
    ];

    [
      state.form.controls[action.previousIndex],
      state.form.controls[action.currentIndex],
    ] = [
      state.form.controls[action.currentIndex],
      state.form.controls[action.previousIndex],
    ];
  }),
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
