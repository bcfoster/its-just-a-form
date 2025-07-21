import { createActionGroup, props } from '@ngrx/store';

export const questionsActions = createActionGroup({
  source: 'Questions',
  events: {
    Move: props<{ previousIndex: number; currentIndex: number }>(),
  },
});
