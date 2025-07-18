import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { questionsActions } from './questions.actions';
import { Store } from '@ngrx/store';
import * as questionsSelectors from './questions.selectors';
import { map, withLatestFrom } from 'rxjs';
import { SetValueAction } from 'ngrx-forms';

@Injectable()
export class QuestionsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(questionsActions.initialize),
      withLatestFrom(this.store.select(questionsSelectors.selectQuestions)),
      map(([_, questions]) => {
        const values = questions.map((q) => {
          switch (q.type) {
            case 'checkbox':
            case 'toggle':
              return false;
            case 'date':
              return null;
            case 'select':
            case 'text':
            case 'textarea':
            default:
              return '';
          }
        });

        return new SetValueAction('question-form', values);
      }),
    ),
  );
}
