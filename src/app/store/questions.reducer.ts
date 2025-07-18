import { createReducer, on } from '@ngrx/store';
import { Question } from './index';
import { questionsActions } from './questions.actions';
import { createFormArrayState, FormArrayState, onNgrxForms, setValue, updateArray } from 'ngrx-forms';

export const initialQuestions: Question[] = [
  {
    id: '0',
    type: 'text',
    label: 'Preferred first name',
    icon: 'text_format',
  },
  {
    id: '1',
    type: 'textarea',
    label: 'Additional details',
    icon: 'subject',
  },
  { id: '2', type: 'date', label: 'Date of birth', icon: 'calendar_month' },
  {
    id: '3',
    type: 'select',
    label: 'Gender',
    icon: 'arrow_drop_down',
    options: ['Male', 'Female', 'Other'],
  },
  {
    id: '4',
    type: 'toggle',
    label: 'Unable to work due to injury',
    icon: 'toggle_on',
  },
  {
    id: '5',
    type: 'checkbox',
    label: 'Indicate your injuries',
    icon: 'checklist',
  },
];

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
  on(questionsActions.move, (state, action) => {
    const questions = [...state.questions];
    const temp = state.questions[action.previousIndex];
    questions[action.previousIndex] = questions[action.currentIndex];
    questions[action.currentIndex] = temp;

    const forms = [...state.form.value];
    const tmp = forms[action.previousIndex];
    forms[action.previousIndex] = forms[action.currentIndex];
    forms[action.currentIndex] = tmp;

    return {
      ...state,
      questions,
      form: setValue(state.form, forms),
    };
  }),
);
