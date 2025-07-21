import { Component, input } from '@angular/core';
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
import { Question } from './store';
import { RadioInput } from './inputs/radio-input';

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
  ],
  template: `
    <form
      *ngrxLet="form() as form"
      nz-form
      [ngrxFormState]="form"
      autocomplete="off"
    >
      <div class="flex flex-col gap-y-3">
        @for (question of questions(); track question; let index = $index) {
          <div class="flex flex-col">
            <nz-form-label
              [nzRequired]="
                form.controls[index].userDefinedProperties['required']
              "
              nzLabelAlign="left"
            >
              {{ question.label }}
            </nz-form-label>
            @switch (question.type) {
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
                  [options]="question.options ?? []"
                />
              }
              @case ('select') {
                <app-select-input
                  [control]="form.controls[index].controls.someText"
                  [options]="question.options ?? []"
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
  styles: ``,
})
export class FormWrapper {
  form = input.required<FormArrayState<Form>>();
  questions = input.required<Question[]>();
}
