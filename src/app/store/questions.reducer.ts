import { createReducer } from '@ngrx/store';
import { InputTypes } from './index';
import {
  createFormArrayState,
  createFormControlState,
  FormArrayState,
  FormControlState,
  onNgrxForms,
  setUserDefinedProperty,
  updateArray,
  updateGroup,
  validate,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

export const FORM_ID = 'form';

export interface Form {
  // TODO: try using 'or null' optional property
  label: string;
  type: string;
  options: string[];
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
  name: FormControlState<string>;
  builder: FormArrayState<FormInput>;
}

export const initialFormValue: FormInput = {
  type: 'text',
  label: '',
  options: [''],
  validators: {
    required: false,
  },
};

export const initialState: State = {
  name: createFormControlState('name', 'New form'),
  builder: createFormArrayState(FORM_ID, [initialFormValue]),
};

// TODO: updateArray with updateGroup<Form> that uses the same map/switch in mapToForms
//       could updateGroup<Form> be used to chain multiple updates together that conditionally apply
//       the user defined properties? if not, the user defined props must be set in an effect, right?
export const rawReducer = createReducer(initialState, onNgrxForms());

export const validateDynamicForm = updateArray<Form>(
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
  (state) => state.name,
  validate(required),
);
