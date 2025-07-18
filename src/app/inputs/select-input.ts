import { Component, input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { Question } from '../store';

@Component({
  selector: 'app-select-input',
  imports: [NgrxFormsModule],
  template: `
    <!--    <mat-form-field>-->
    <!--      <mat-label>{{ question().label }}</mat-label>-->
    <!--      <select-->
    <!--        matNativeControl-->
    <!--        [name]="question().label"-->
    <!--        [ngrxFormControlState]="control()"-->
    <!--      >-->
    <!--        @for (option of question().options; track option) {-->
    <!--          <option [value]="option">-->
    <!--            {{ option }}-->
    <!--          </option>-->
    <!--        }-->
    <!--      </select>-->
    <!--    </mat-form-field>-->
  `,
  styles: ``,
})
export class SelectInput {}
