import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { questionsActions } from './questions.actions';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs';
import * as questionSelectors from './questions.selectors';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { SetValueAction } from 'ngrx-forms';
import { initialPreview, PreviewForm } from './questions.reducer';

@Injectable()
export class QuestionEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  move$ = createEffect(() =>
    this.actions$.pipe(
      ofType(questionsActions.move),
      withLatestFrom(this.store.select(questionSelectors.selectForms)),
      map(([action, form]) => {
        const inputs = [...form.controls.builder.value];
        moveItemInArray(inputs, action.previousIndex, action.currentIndex);
        return new SetValueAction(form.id, inputs);
      }),
    ),
  );

  toPreview$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SetValueAction<string | boolean | null>>('ngrx/forms/SET_VALUE'),
      filter((action) => action.controlId.startsWith('forms.builder')),
      withLatestFrom(
        this.store.select(questionSelectors.selectBuilderFormValue),
      ),
      map(([_, form]) =>
        form.map((input) => {
          let preview = {
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
      map(
        (inputs) => new SetValueAction<PreviewForm[]>('forms.preview', inputs),
      ),
    ),
  );
}
