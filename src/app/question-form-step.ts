import { Component, input } from '@angular/core';
import {
  DateInput,
  SelectInput,
  TextareaInput,
  TextInput,
  ToggleInput,
} from './inputs';
import { FormStep } from './form-step';

@Component({
  selector: 'app-question-form-step',
  imports: [DateInput, TextareaInput, TextInput, SelectInput, ToggleInput],
  template: `
    @switch (step().input) {
      @case ('date') {
        <app-date-input [step]="step()"></app-date-input>
      }
      @case ('text') {
        <app-text-input [step]="step()"></app-text-input>
      }
      @case ('textarea') {
        <app-textarea-input [step]="step()"></app-textarea-input>
      }
      @case ('select') {
        <app-select-input [step]="step()"></app-select-input>
      }
      @case ('toggle') {
        <app-toggle-input [step]="step()"></app-toggle-input>
      }
    }
  `,
})
export class QuestionFormStep {
  step = input.required<FormStep>();
}
