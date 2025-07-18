import { Component, input } from '@angular/core';
import { FormStep } from '../form-step';

@Component({
  selector: 'app-select-input',
  imports: [],
  template: ``,
  styles: ``,
})
export class SelectInput {
  step = input.required<FormStep>();
}
