import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const formActions = createActionGroup({
  source: 'Form',
  events: {
    Initialized: emptyProps(),
  },
});
