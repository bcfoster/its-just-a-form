import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const stepActions = createActionGroup({
  source: 'Step',
  events: {
    Initialized: emptyProps(),
    Loaded: emptyProps(),
    Next: emptyProps(),
    Previous: emptyProps(),
  },
});
