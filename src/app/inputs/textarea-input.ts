import { Component, input } from '@angular/core';
import { FormStep } from '../form-step';

@Component({
  selector: 'app-textarea-input',
  imports: [],
  template: ``,
  styles: ``,
})
export class TextareaInput {
  step = input.required<FormStep>();
}
