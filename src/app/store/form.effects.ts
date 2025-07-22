import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';
import { formActions } from './form.actions';
import * as routerSelectors from './router.selectors';

@Injectable()
export class FormEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.initialized),
      withLatestFrom(this.store.select(routerSelectors.selectRouteParams)),
      map(([, { id }]) =>
        formActions.loaded({
          id,
          name: 'Sample form',
          form: [
            {
              type: 'text',
              label: 'Last name',
              someText: 'Appleseed',
              options: [],
            },
            {
              type: 'text',
              label: 'First name',
              someText: 'John',
              options: [],
            },
          ],
        }),
      ),
    ),
  );
}
