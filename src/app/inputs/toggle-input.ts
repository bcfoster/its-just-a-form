import { Component, input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormStep } from '../form-step';

@Component({
  selector: 'app-toggle-input',
  imports: [MatSlideToggleModule],
  template: `
    <mat-slide-toggle>
      {{ step().subtitle }}
    </mat-slide-toggle>
  `,
  styles: ``,
})
export class ToggleInput {
  step = input.required<FormStep>();
}
