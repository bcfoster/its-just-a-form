import { createReducer, on } from '@ngrx/store';
import { createFormArrayState, FormArrayState, onNgrxForms } from 'ngrx-forms';
import { stepActions } from './step.actions';

export const FORM_ID = 'form';

export type StepType = 'form' | 'redirect';

export interface Input {
  type: string;
  label: string;
  options: string[];
  someText?: string;
  someBoolean?: boolean;
  someBooleans?: boolean[];
  someDate?: string | null;
  required?: boolean;
}

export interface Step {
  id: string; // todo: i want this to be a v7 uuid and i want to use the value to sort objects. regenerate each time list is saved?
  type: StepType;
  name: string;
  meta?: string;
  data?: string;
}

export interface State {
  form: FormArrayState<Input>;
  index: number;
  steps: Step[];
}

export const initialState: State = {
  form: createFormArrayState(FORM_ID, []),
  index: 0,
  steps: [
    {
      id: '1',
      type: 'form',
      name: 'Personal information',
      data: '[{"type":"text","label":"First name","options":[],"value":"","someText":"Brent"}]',
    },
    {
      id: '2',
      type: 'form',
      name: 'Contact information',
      data: '[{"type":"text","label":"Phone number","options":[],"value":"","someText":"604-828-4064"}]',
    },
    {
      id: '3',
      type: 'redirect',
      name: 'Redirect',
      data: 'https://www.google.ca/',
    },
  ],
};

export const reducer = createReducer(
  initialState,
  onNgrxForms(),
  on(stepActions.next, (state) => ({
    ...state,
    index: state.index + 1,
  })),
  on(stepActions.previous, (state) => ({
    ...state,
    index: state.index - 1,
  })),
);

// export const validateForms = updateGroup<Forms>({
//   name: validate(required),
//   builder: updateArray(updateGroup<BuilderForm>({})),
//   preview: updateArray<PreviewForm>(
//     (group) => setUserDefinedProperty(group, 'required', true),
//     (group) =>
//       updateGroup<PreviewForm>(
//         group,
//         group.userDefinedProperties['required']
//           ? {
//               someBoolean: (c) => (c !== undefined ? validate(c, required) : c),
//               someBooleans: (c) =>
//                 c !== undefined ? validate(c, required) : c,
//               someDate: (c) => (c !== undefined ? validate(c, required) : c),
//               someText: (c) => (c !== undefined ? validate(c, required) : c),
//             }
//           : {},
//       ),
//   ),
// });

// export const reducer = wrapReducerWithFormStateUpdate(
//   rawReducer,
//   (state) => state.forms,
//   validateForms,
// );
