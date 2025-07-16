import { Component, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormStep } from '../form-step';

@Component({
  selector: 'app-text-input',
  imports: [MatInputModule],
  template: `
    <mat-form-field>
      <mat-label>{{ step().subtitle }}</mat-label>
      <input matInput />
    </mat-form-field>
  `,
  styles: ``,
})
export class TextInput {
  step = input.required<FormStep>();
}
