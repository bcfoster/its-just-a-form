import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Form } from './forms.reducer';

export const formsActions = createActionGroup({
  source: 'Forms',
  events: {
    Remove: props<{ id: string }>(),
    'Load Form': props<{ form: Form }>(),
  },
});
