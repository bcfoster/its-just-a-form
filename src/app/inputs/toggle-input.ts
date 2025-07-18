import { Component, input } from '@angular/core';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';

@Component({
  selector: 'app-toggle-input',
  imports: [NzSwitchModule, NgrxFormsModule],
  template: `
    <nz-switch [ngrxFormControlState]="control()" />
  `,
  styles: ``,
})
export class ToggleInput {
  control = input.required<FormControlState<boolean>>();
}
