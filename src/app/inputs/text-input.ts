import { Component, input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-text-input',
  imports: [NgrxFormsModule, NzInputDirective],
  template: `
    @if (control() !== undefined) {
      <input nz-input [ngrxFormControlState]="$any(control())" />
      <span class="error">
        @if (control()?.errors && control()?.isTouched) {
          @if (control()?.errors?.required) {
            Field is required
          }
        }
      </span>
    }
  `,
  styles: `
    input:focus.ngrx-forms-invalid {
      box-shadow: 0 0 0 2px lightpink;
    }

    .ngrx-forms-invalid.ngrx-forms-touched {
      border-color: red;
    }

    .error {
      color: red;
    }
  `,
})
export class TextInput {
  control = input.required<FormControlState<string | undefined> | undefined>();
}
