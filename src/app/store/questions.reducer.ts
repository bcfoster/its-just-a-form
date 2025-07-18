import { createReducer, on } from '@ngrx/store';
import { Question } from './index';
import { questionsActions } from './questions.actions';
import { createFormArrayState, FormArrayState, onNgrxForms } from 'ngrx-forms';
import { immerOn } from 'ngrx-immer/store';

export const FORM_ID = 'question-form';

export interface State {
  questions: Question[];
  form: FormArrayState<string | boolean | null>;
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
