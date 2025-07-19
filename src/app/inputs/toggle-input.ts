import { Component, input } from '@angular/core';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';

@Component({
  selector: 'app-toggle-input',
  imports: [NzSwitchModule, NgrxFormsModule],
  template: `
    @if (control() !== undefined) {
      <nz-switch [ngrxFormControlState]="$any(control())" />
    }
  `,
  styles: ``,
})
export class ToggleInput {
  control = input.required<FormControlState<boolean | undefined> | undefined>();
}
