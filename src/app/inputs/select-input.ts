import { Component, input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-select-input',
  imports: [NgrxFormsModule, NzSelectModule, LowerCasePipe],
  template: `
    <nz-select
      nzPlaceHolder="Select an option"
      [ngrxFormControlState]="$any(control())"
    >
      @for (option of options(); track option) {
        <nz-option
          [nzValue]="option | lowercase"
          [nzLabel]="option"
        ></nz-option>
      }
    </nz-select>
  `,
  styles: ``,
})
export class SelectInput {
  control = input.required<FormControlState<string | undefined> | undefined>();
  options = input.required<string[]>();
}
