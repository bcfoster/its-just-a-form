import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { questionsActions } from './questions.actions';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';
import * as questionSelectors from './questions.selectors';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { SetValueAction } from 'ngrx-forms';

@Injectable()
export class QuestionEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  move$ = createEffect(() =>
    this.actions$.pipe(
      ofType(questionsActions.move),
      withLatestFrom(this.store.select(questionSelectors.selectBuilder)),
      map(([action, form]) => {
        const inputs = [...form.value];
        moveItemInArray(inputs, action.previousIndex, action.currentIndex);
        return new SetValueAction(form.id, inputs);
      }),
    ),
  );
}
