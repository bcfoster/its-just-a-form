import { createReducer, on } from '@ngrx/store';
import { Question } from './index';
import { questionsActions } from './questions.actions';
import { createFormArrayState, FormArrayState, onNgrxForms } from 'ngrx-forms';

const initialQuestions: Question[] = [
  {
    id: '1',
    type: 'text',
    label: 'Preferred first name',
    icon: 'text_format',
  },
  {
    id: '2',
    type: 'textarea',
    label: 'Additional details',
    icon: 'subject',
  },
  { id: '3', type: 'date', label: 'Date of birth', icon: 'calendar_month' },
  {
    id: '4',
    type: 'select',
    label: 'Gender',
    icon: 'arrow_drop_down',
    options: ['Male', 'Female', 'Other'],
  },
  {
    id: '5',
    type: 'toggle',
    label: 'Unable to work due to injury',
    icon: 'toggle_on',
  },
  {
    id: '6',
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
  questions: initialQuestions,
  form: createFormArrayState(FORM_ID, ['Test', 'Test', null, '', false, false]),
};

export const reducer = createReducer(
  initialState,
  onNgrxForms(),

  on(questionsActions.move, (state, action) => {
    const questions = [...state.questions];
    const temp = state.questions[action.previousIndex];
    questions[action.previousIndex] = questions[action.currentIndex];
    questions[action.currentIndex] = temp;

    return {
      ...state,
      questions,
    };
  }),
);
