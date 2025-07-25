import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const formsActions = createActionGroup({
  source: 'Forms',
  events: {
    Remove: props<{ id: string }>(),
  },
});
