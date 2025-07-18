import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const questionsActions = createActionGroup({
  source: 'Questions',
  events: {
    Initialize: emptyProps(),
    Move: props<{ previousIndex: number; currentIndex: number }>(),
  },
});
