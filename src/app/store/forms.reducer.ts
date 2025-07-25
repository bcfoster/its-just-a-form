import { createReducer, on } from '@ngrx/store';
import { onNgrxForms } from 'ngrx-forms';

export interface Form {
  id: string;
  name: string;
}

export interface State {
  forms: Form[];
}

export const initialState: State = {
  forms: [
    {
      id: 'id',
      name: 'Personal information',
    },
  ],
};

export const reducer = createReducer(initialState, onNgrxForms());
