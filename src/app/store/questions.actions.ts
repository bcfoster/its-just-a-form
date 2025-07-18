import { createActionGroup, props } from '@ngrx/store';
import { Question } from './index';

export const questionsActions = createActionGroup({
  source: 'Questions',
  events: {
    Initialize: props<{ questions: Question[] }>(),
    Move: props<{ previousIndex: number; currentIndex: number }>(),
  },
});
