import { Component, input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-textarea-input',
  imports: [NgrxFormsModule, NzInputDirective],
  template: `
    <textarea nz-input [ngrxFormControlState]="control()"></textarea>
  `,
  styles: ``,
})
export class TextareaInput {
  control = input.required<FormControlState<string>>();
}
