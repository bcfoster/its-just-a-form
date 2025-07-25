import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const formBuilderActions = createActionGroup({
  source: 'Form Builder',
  events: {
    Move: props<{ from: number; to: number }>(),
    Save: emptyProps(),
    Saved: emptyProps(),
  },
});
