import { Component, input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-textarea-input',
  imports: [NgrxFormsModule, NzInputDirective],
  template: `
    @if (control() !== undefined) {
      <textarea nz-input [ngrxFormControlState]="$any(control())"></textarea>
    }
  `,
  styles: ``,
})
export class TextareaInput {
  control = input.required<FormControlState<string | undefined> | undefined>();
}
