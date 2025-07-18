import { Component, input } from '@angular/core';
import { FormStep } from '../form-step';

@Component({
  selector: 'app-text-input',
  imports: [],
  template: ``,
  styles: ``,
})
export class TextInput {
  step = input.required<FormStep>();
}
