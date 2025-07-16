import { Component, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormStep } from '../form-step';

@Component({
  selector: 'app-textarea-input',
  imports: [MatInputModule],
  template: `
    <mat-form-field>
      <mat-label>{{ step().subtitle }}</mat-label>
      <textarea matInput></textarea>
    </mat-form-field>
  `,
  styles: ``,
})
export class TextareaInput {
  step = input.required<FormStep>();
}
