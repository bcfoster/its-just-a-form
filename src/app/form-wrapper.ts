import { Component, effect, inject, input } from '@angular/core';
import { FormArrayState, NgrxFormsModule } from 'ngrx-forms';
import { Form } from './store/questions.reducer';
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
import * as questionsSelectors from './store/questions.selectors';
import { Store } from '@ngrx/store';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-form-wrapper',
  imports: [
    NgrxFormsModule,
    LetDirective,
    DateInput,
    SelectInput,
    ToggleInput,
    TextareaInput,
    TextInput,
    CheckboxInput,
    NzFormModule,
    RadioInput,
    NzTypographyComponent,
  ],
  template: `
    <h3 nz-typography>Personal information</h3>
    <form
      *ngrxLet="form$ as form"
      nz-form
      [ngrxFormState]="form"
      autocomplete="off"
    >
      <div class="flex flex-col gap-y-3">
        @for (control of form.controls; track control.id; let index = $index) {
          <div class="flex flex-col">
            <nz-form-label
              [nzRequired]="control.value.required"
              nzLabelAlign="left"
            >
              {{ control.value.label }}
            </nz-form-label>
            @switch (control.value.type) {
              @case ('checkbox') {
                <app-checkbox-input
                  [control]="form.controls[index].controls.someBooleans"
                  [options]="['Head', 'Shoulders', 'Back', 'Arms', 'Legs']"
                />
              }
              @case ('date') {
                <app-date-input
                  [control]="form.controls[index].controls.someDate"
                />
              }
              @case ('radio') {
                <app-radio-input
                  [control]="form.controls[index].controls.someText"
                  [options]="
                    form.controls[index].userDefinedProperties['options'] ?? []
                  "
                />
              }
              @case ('select') {
                <app-select-input
                  [control]="form.controls[index].controls.someText"
                  [options]="
                    form.controls[index].userDefinedProperties['options'] ?? []
                  "
                />
              }
              @case ('text') {
                <app-text-input
                  [control]="form.controls[index].controls.someText"
                />
              }
              @case ('textarea') {
                <app-textarea-input
                  [control]="form.controls[index].controls.someText"
                />
              }
              @case ('toggle') {
                <app-toggle-input
                  [control]="form.controls[index].controls.someBoolean"
                />
              }
            }
          </div>
        }
      </div>
    </form>
  `,
})
export class FormWrapper {
  private readonly store = inject(Store);

  protected readonly form$: Observable<FormArrayState<Form>>;

  constructor() {
    this.form$ = this.store.select(questionsSelectors.selectGeneratedForm);
  }
}
