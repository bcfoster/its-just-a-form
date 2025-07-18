import { Component, input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-text-input',
  imports: [NgrxFormsModule, NzInputDirective],
  template: `
    <input nz-input [ngrxFormControlState]="control()" />
  `,
  styles: ``,
})
export class TextInput {
  control = input.required<FormControlState<string>>();
}
