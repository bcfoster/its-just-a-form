import { Component, input } from '@angular/core';
import { FormArrayState, NgrxFormsModule } from 'ngrx-forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-checkbox-input',
  imports: [NgrxFormsModule, NzCheckboxModule],
  template: `
    @if (control() !== undefined) {
      <div>
        @for (
          option of options();
          track option;
          let i = $index;
          let last = $last
        ) {
          <label
            nz-checkbox
            [ngrxFormControlState]="$any(control()!.controls[i])"
          >
            {{ option }}
          </label>
          @if (!last) {
            <br />
          }
        }
      </div>
    }
  `,
  styles: ``,
})
export class CheckboxInput {
  control = input.required<FormArrayState<boolean> | undefined>();
  options = input.required<string[]>();
}
