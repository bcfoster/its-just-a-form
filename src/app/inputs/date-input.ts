import { Component, input } from '@angular/core';
import { FormStep } from '../form-step';

@Component({
  selector: 'app-date-input',
  imports: [],
  template: ``,
  styles: ``,
})
export class DateInput {
  step = input.required<FormStep>();
}
