import { createReducer, on } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  onNgrxForms,
  setUserDefinedProperty,
  setValue,
  updateArray,
  updateGroup,
  validate,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { formActions } from '../form/form.actions';
import { formsActions } from '../forms/forms.actions';

export const BUILDER_FORM_ID = 'forms.builder';
export const PREVIEW_FORM_ID = 'forms.preview';

export type InputType =
  | 'checkbox'
  | 'date'
  | 'radio'
  | 'select'
  | 'text'
  | 'textarea'
  | 'toggle';

// TODO: don't be a bozo - export form names as constants because you just know you're going to rename one of them
//       while "refactoring" and then the forms are going to break and you won't know why you bozo
export interface Validators {
  required: boolean;
}

export interface BuilderForm {
  type: InputType;
  label: string;
  options: string[];
  validators: Validators;
}

export const initialBuilder: BuilderForm = {
  type: 'text',
  label: '',
  options: [''],
  validators: {
    required: false,
  },
};

export interface PreviewForm {
  // TODO: try using 'or null' optional property
  type: string;
  label: string;
  options: string[];
  // TODO: exploit this property to try and eliminate the 'some' duplication
  value?: string | boolean | boolean[] | null;
  someText?: string;
  someBoolean?: boolean;
  someBooleans?: boolean[];
  someDate?: string | null;
  required?: boolean;
}

export const initialPreview: PreviewForm = {
  type: 'text',
  label: '',
  options: [],
  value: '',
  someText: '',
};

export interface Forms {
  name: string;
  builder: BuilderForm[];
  preview: PreviewForm[];
}

export interface State {
  forms: FormGroupState<Forms>;
}

export const initialState: State = {
  forms: createFormGroupState('forms', {
    name: 'New form',
    builder: [initialBuilder],
    preview: [initialPreview],
  }),
};

const rawReducer = createReducer(
  initialState,
  onNgrxForms(),
  on(formActions.loaded, (state, action) => ({
    ...state,
    forms: updateGroup(state.forms, {
      preview: setValue(action.form),
    }),
  })),
  on(formsActions.loadForm, (state, action) => ({
    ...state,
    forms: updateGroup(state.forms, {
      name: setValue(action.form.name),
      builder: setValue<BuilderForm[]>(JSON.parse(action.form.json)),
    }),
  })),
);

export const validateForms = updateGroup<Forms>({
  name: validate(required),
  builder: updateArray(updateGroup<BuilderForm>({})),
  preview: updateArray<PreviewForm>(
    (group) => setUserDefinedProperty(group, 'required', true),
    (group) =>
      updateGroup<PreviewForm>(
        group,
        group.userDefinedProperties['required']
          ? {
              someBoolean: (c) => (c !== undefined ? validate(c, required) : c),
              someBooleans: (c) =>
                c !== undefined ? validate(c, required) : c,
              someDate: (c) => (c !== undefined ? validate(c, required) : c),
              someText: (c) => (c !== undefined ? validate(c, required) : c),
            }
          : {},
      ),
  ),
});

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  (state) => state.forms,
  validateForms,
);
