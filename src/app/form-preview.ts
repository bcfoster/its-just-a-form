import { Component, inject, input } from '@angular/core';
import { FormArrayState, NgrxFormsModule } from 'ngrx-forms';
import { PreviewForm } from './store/form-builder/form-builder.reducer';
import { CheckboxInput } from './inputs/checkbox-input';
import {
  DateInput,
  SelectInput,
  TextareaInput,
  TextInput,
  ToggleInput,
} from './inputs';
import { PushPipe } from '@ngrx/component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RadioInput } from './inputs/radio-input';
import { map, Observable } from 'rxjs';
import * as questionsSelectors from './store/form-builder/form-builder.selectors';
import { Store } from '@ngrx/store';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-preview',
  imports: [
    NzButtonModule,
    NgrxFormsModule,
    DateInput,
    SelectInput,
    ToggleInput,
    TextareaInput,
    TextInput,
    CheckboxInput,
    NzFormModule,
    RadioInput,
    NzTypographyComponent,
    PushPipe,
    FormsModule,
  ],
  template: `
    <h3 nz-typography>{{ name$ | ngrxPush }}</h3>
    <form nz-form autocomplete="off" (ngSubmit)="submit(controls().value)">
      <div class="flex flex-col gap-y-3">
        @for (control of controls().controls; track control.id) {
          <div class="flex flex-col">
            @if (control.value.label !== '') {
              <nz-form-label
                [nzRequired]="control.value.required"
                nzLabelAlign="left"
                nzNoColon
              >
                {{ control.value.label }}
              </nz-form-label>
            }
            @switch (control.value.type) {
              @case ('checkbox') {
                <app-checkbox-input
                  [control]="control.controls.someBooleans"
                  [options]="control.value.options"
                />
              }
              @case ('date') {
                <app-date-input [control]="control.controls.someDate" />
              }
              @case ('radio') {
                <app-radio-input
                  [control]="control.controls.someText"
                  [options]="control.value.options"
                />
              }
              @case ('select') {
                <app-select-input
                  [control]="control.controls.someText"
                  [options]="control.value.options"
                />
              }
              @case ('text') {
                <app-text-input [control]="control.controls.someText" />
              }
              @case ('textarea') {
                <app-textarea-input [control]="control.controls.someText" />
              }
              @case ('toggle') {
                <app-toggle-input [control]="control.controls.someBoolean" />
              }
            }
          </div>
        }
        <div>
          <button
            nz-button
            nzType="primary"
            [disabled]="controls().value.length === 0 || controls().isInvalid"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  `,
})
export class FormPreview {
  private readonly store = inject(Store);

  protected readonly name$: Observable<string>;

  controls = input.required<FormArrayState<PreviewForm>>();

  constructor() {
    this.name$ = this.store
      .select(questionsSelectors.selectFormName)
      .pipe(map((control) => control.value));
  }

  submit(form: PreviewForm[]) {
    console.log(JSON.stringify(form));
  }
}
