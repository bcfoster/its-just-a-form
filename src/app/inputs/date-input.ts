import { Component, input } from '@angular/core';
import {
  FormControlState,
  NgrxFormsModule,
  NgrxValueConverters,
} from 'ngrx-forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-date-input',
  imports: [NgrxFormsModule, NzDatePickerModule],
  template: `
    @if (control !== undefined) {
      <nz-date-picker
        nzPlacement="bottomLeft"
        [ngrxFormControlState]="$any(control())"
        [ngrxValueConverter]="dateValueConverter"
      ></nz-date-picker>
    }
  `,
  styles: ``,
})
export class DateInput {
  control = input.required<
    FormControlState<string | null | undefined> | undefined
  >();

  dateValueConverter = NgrxValueConverters.dateToISOString;
}
