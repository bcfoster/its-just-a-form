import { Component, input } from '@angular/core';
import { FormArrayState, NgrxFormsModule } from 'ngrx-forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-checkbox-input',
  imports: [NgrxFormsModule, NzCheckboxModule],
  template: `
    @let c = control();

    @if (c !== undefined) {
      <div>
        @for (
          option of options();
          track index;
          let index = $index;
          let last = $last
        ) {
          <label nz-checkbox [ngrxFormControlState]="c.controls[index]">
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
