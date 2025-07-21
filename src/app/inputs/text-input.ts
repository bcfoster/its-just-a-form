import { Component, input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-text-input',
  imports: [NgrxFormsModule, NzInputDirective],
  template: `
    @if (control() !== undefined) {
      <input nz-input [ngrxFormControlState]="$any(control())" />
    }
  `,
})
export class TextInput {
  control = input.required<FormControlState<string | undefined> | undefined>();
}
