import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { questionsActions } from './questions.actions';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs';
import * as questionSelectors from './questions.selectors';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AddArrayControlAction,
  RemoveArrayControlAction,
  SetValueAction,
} from 'ngrx-forms';
import {
  BUILDER_FORM_ID,
  initialPreview,
  PREVIEW_FORM_ID,
} from './questions.reducer';

@Injectable()
export class QuestionsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  move$ = createEffect(() =>
    this.actions$.pipe(
      ofType(questionsActions.move),
      filter((action) => action.from !== action.to),
      withLatestFrom(this.store.select(questionSelectors.selectForms)),
      map(([{ from, to }, form]) => {
        const inputs = [...form.controls.builder.value];
        moveItemInArray(inputs, from, to);
        return new SetValueAction(BUILDER_FORM_ID, inputs);
      }),
    ),
  );

  toPreview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SetValueAction.TYPE,
        AddArrayControlAction.TYPE,
        RemoveArrayControlAction.TYPE,
      ),
      filter((action) => action.controlId.startsWith(BUILDER_FORM_ID)),
      withLatestFrom(this.store.select(questionSelectors.selectBuilderForm)),
      map(([, form]) =>
        form.value.map((input) => {
          const preview = {
            ...initialPreview,
            type: input.type,
            label: input.label,
            options: input.options ?? [],
            required: input.validators.required,
          };

          switch (input.type) {
            case 'checkbox':
              return {
                ...preview,
                someBooleans: input.options.map((_) => false),
              };
            case 'date':
              return {
                ...preview,
                someDate: null,
              };
            case 'toggle':
              return {
                ...preview,
                someBoolean: false,
              };
            case 'radio':
            case 'select':
            case 'text':
            case 'textarea':
            default:
              return {
                ...preview,
                someText: '',
              };
          }
        }),
      ),
      map((inputs) => new SetValueAction(PREVIEW_FORM_ID, inputs)),
    ),
  );
}
