import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { formBuilderActions } from './form-builder.actions';
import { Store } from '@ngrx/store';
import { filter, map, tap, withLatestFrom } from 'rxjs';
import * as formBuilderSelectors from './form-builder.selectors';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AddArrayControlAction,
  RemoveArrayControlAction,
  SetValueAction,
} from 'ngrx-forms';
import {
  BUILDER_FORM_ID,
  BuilderForm,
  initialPreview,
  PREVIEW_FORM_ID,
} from './form-builder.reducer';
import { formsActions } from '../forms/forms.actions';

@Injectable()
export class FormBuilderEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formsActions.loadForm),
      map((action) => JSON.parse(action.form.json) as BuilderForm[]),
      map((inputs) => mapToPreview(inputs)),
      map((inputs) => new SetValueAction(PREVIEW_FORM_ID, inputs)),
    ),
  );

  move$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formBuilderActions.move),
      filter((action) => action.from !== action.to),
      withLatestFrom(this.store.select(formBuilderSelectors.selectForms)),
      map(([{ from, to }, form]) => {
        const inputs = [...form.controls.builder.value];
        moveItemInArray(inputs, from, to);
        return new SetValueAction(BUILDER_FORM_ID, inputs);
      }),
    ),
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formBuilderActions.save),
      withLatestFrom(this.store.select(formBuilderSelectors.selectBuilderForm)),
      tap(([, form]) => console.log(JSON.stringify(form.value))),
      map(() => formBuilderActions.saved()),
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
      withLatestFrom(this.store.select(formBuilderSelectors.selectBuilderForm)),
      map(([, form]) => mapToPreview(form.value)),
      map((inputs) => new SetValueAction(PREVIEW_FORM_ID, inputs)),
    ),
  );
}

const mapToPreview = (inputs: BuilderForm[]) =>
  inputs.map((input) => {
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
          someBooleans: input.options.map(() => {
            return false;
          }),
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
  });
