import { Component, input } from '@angular/core';
import { Question } from '../store';
import {
  FormControlState,
  NgrxFormsModule,
  NgrxValueConverters,
} from 'ngrx-forms';

@Component({
  selector: 'app-date-input',
  imports: [NgrxFormsModule],
  template: `
    <!--    <mat-form-field>-->
    <!--      <mat-label>{{ question().label }}</mat-label>-->
    <!--      <input-->
    <!--        matInput-->
    <!--        [matDatepicker]="picker"-->
    <!--        [ngrxFormControlState]="control()"-->
    <!--        [ngrxValueConverter]="dateValueConverter"-->
    <!--      />-->
    <!--      <mat-hint>MM/DD/YYYY</mat-hint>-->
    <!--      <mat-datepicker-toggle-->
    <!--        matIconSuffix-->
    <!--        [for]="picker"-->
    <!--      ></mat-datepicker-toggle>-->
    <!--      <mat-datepicker #picker></mat-datepicker>-->
    <!--    </mat-form-field>-->
  `,
  styles: ``,
})
export class DateInput {
  dateValueConverter = NgrxValueConverters.dateToISOString;
}
