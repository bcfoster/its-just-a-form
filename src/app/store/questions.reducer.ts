import { createReducer, on } from '@ngrx/store';
import { InputTypes, Question } from './index';
import { questionsActions } from './questions.actions';
import {
  createFormArrayState,
  createFormGroupState,
  FormArrayState,
  FormGroupState,
  onNgrxForms,
  setValue,
} from 'ngrx-forms';
import { immerOn } from 'ngrx-immer/store';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';
import { v7 as uuidv7 } from 'uuid';

export const FORM_ID = 'question-form';
export const BUILDER_FORM_ID = 'builder-form';

export interface Form {
  // TODO: try using 'or null' optional property
  someText?: string;
  someBoolean?: boolean;
  someBooleans?: boolean[];
  someDate?: string | null;
}

export interface BuilderFormControl {
  label: string;
  type: InputTypes;
  options: string[];
  validators: string[];
}

export interface BuilderForm {
  name: string;
  formControls: BuilderFormControl[];
}

export interface State {
  questions: Question[];
  form: FormArrayState<Form>;
  builder: FormGroupState<BuilderForm>;
}

export const initialState: State = {
  questions: [],
  form: createFormArrayState(FORM_ID, []),
  builder: createFormGroupState<BuilderForm>(BUILDER_FORM_ID, {
    name: 'Personal information',
    formControls: [
      {
        type: 'text',
        label: 'Preferred first name',
        options: [],
        validators: [],
      },
      {
        type: 'textarea',
        label: 'Additional details',
        options: [],
        validators: [],
      },
      {
        type: 'date',
        label: 'Date of birth',
        options: [],
        validators: [],
      },
      {
        type: 'select',
        label: 'Gender',
        options: [],
        validators: [],
      },
      {
        type: 'toggle',
        label: 'Unable to work due to injury',
        options: [],
        validators: [],
      },
      {
        type: 'checkbox',
        label: 'Indicate your injuries',
        options: [],
        validators: [],
      },
      {
        type: 'radio',
        label: 'Favourite captain',
        options: [],
        validators: [],
      },
    ],
  }),
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
    moveItemInArray(state.questions, action.previousIndex, action.currentIndex);
    moveItemInArray(
      state.form.controls,
      action.previousIndex,
      action.currentIndex,
    );
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
