import { Component, inject } from '@angular/core';
import { FormArrayState, NgrxFormsModule } from 'ngrx-forms';
import { PreviewForm } from './store/form-builder.reducer';
import { CheckboxInput } from './inputs/checkbox-input';
import {
  DateInput,
  SelectInput,
  TextareaInput,
  TextInput,
  ToggleInput,
} from './inputs';
import { LetDirective } from '@ngrx/component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RadioInput } from './inputs/radio-input';
import { Observable } from 'rxjs';
import * as stepSelectors from './store/step.selectors';
import { Store } from '@ngrx/store';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { Input } from './store/step.reducer';

@Component({
  selector: 'app-form',
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
    FormsModule,
    LetDirective,
  ],
  template: `
    <div *ngrxLet="form$ as form" class="m-5">
      <h3 nz-typography>{{ 'Step name for form?' }}</h3>
      <form nz-form autocomplete="off" (ngSubmit)="submit(form.value)">
        <div class="flex flex-col gap-y-3">
          @for (control of form.controls; track control.id) {
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
              [disabled]="form.value.length === 0 || form.isInvalid"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class Form {
  private readonly store = inject(Store);

  protected readonly form$: Observable<FormArrayState<Input>>;

  constructor() {
    this.form$ = this.store.select(stepSelectors.selectForm);
  }

  submit(form: PreviewForm[]) {
    console.log(JSON.stringify(form));
  }
}
