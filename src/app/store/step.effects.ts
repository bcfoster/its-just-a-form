import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs';
import * as stepSelectors from './step.selectors';
import { stepActions } from './step.actions';
import { SetValueAction } from 'ngrx-forms';
import { FORM_ID } from './step.reducer';
import { Router } from '@angular/router';

@Injectable()
export class StepEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  form$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stepActions.loaded, stepActions.previous, stepActions.next),
      withLatestFrom(this.store.select(stepSelectors.selectStepState)),
      filter(([, state]) => state.steps[state.index].type === 'form'),
      map(
        ([, state]) =>
          new SetValueAction(
            FORM_ID,
            JSON.parse(state.steps[state.index]?.data ?? '') ?? [],
          ),
      ),
    ),
  );

  redirectToUrl$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(stepActions.loaded, stepActions.previous, stepActions.next),
        withLatestFrom(this.store.select(stepSelectors.selectStepState)),
        filter(([, state]) => state.steps[state.index].type === 'redirect'),
        map(
          ([, state]) =>
            (this.document.location.href =
              state.steps[state.index]?.data ?? 'http://localhost:4200/'),
        ),
      ),
    { dispatch: false },
  );
}
