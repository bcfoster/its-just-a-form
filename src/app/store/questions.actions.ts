import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const questionsActions = createActionGroup({
  source: 'Questions',
  events: {
    Move: props<{ from: number; to: number }>(),
    Save: emptyProps(),
    Saved: emptyProps(),
  },
});
