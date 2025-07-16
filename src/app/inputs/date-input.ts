import { Component, input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormStep } from '../form-step';

@Component({
  selector: 'app-date-input',
  imports: [MatDatepickerModule, MatInputModule],
  template: `
    <mat-form-field>
      <mat-label>{{ step().subtitle }}</mat-label>
      <input matInput [matDatepicker]="picker" />
      <mat-datepicker-toggle
        matIconSuffix
        [for]="picker"
      ></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  styles: ``,
})
export class DateInput {
  step = input.required<FormStep>();
}
