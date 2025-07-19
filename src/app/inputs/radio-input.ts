import { Component, input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { LowerCasePipe } from '@angular/common';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-radio-input',
  imports: [NgrxFormsModule, NzRadioModule, LowerCasePipe],
  template: `
    @if (control() !== undefined) {
      <nz-radio-group [ngrxFormControlState]="$any(control())">
        @for (option of options(); track option) {
          <label nz-radio [nzValue]="option | lowercase">
            {{ option }}
          </label>
        }
      </nz-radio-group>
    }
  `,
  styles: `
    [nz-radio] {
      display: block;
    }
  `,
})
export class RadioInput {
  control = input.required<FormControlState<string | undefined> | undefined>();
  options = input.required<string[]>();
}
