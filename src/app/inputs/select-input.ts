import { Component, input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { LowerCasePipe } from '@angular/common';
import { FormStep } from '../form-step';

@Component({
  selector: 'app-select-input',
  imports: [MatSelectModule, LowerCasePipe],
  template: `
    <mat-form-field>
      <mat-label>Favorite food</mat-label>
      <mat-select>
        @for (option of step().options; track option) {
          <mat-option [value]="option | lowercase">
            {{ option }}
          </mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  styles: ``,
})
export class SelectInput {
  step = input.required<FormStep>();
}
