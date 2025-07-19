import { Component, input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-checkbox-input',
  imports: [NgrxFormsModule, NzCheckboxModule],
  template: `
    @if (control() !== undefined) {
      <div>
        <label nz-checkbox [ngrxFormControlState]="$any(control())">Head</label>
        <br />
        <label nz-checkbox>Chest</label>
        <br />
        <label nz-checkbox>Torso</label>
        <br />
        <label nz-checkbox>Arms</label>
        <br />
        <label nz-checkbox>Legs</label>
      </div>
    }
  `,
  styles: ``,
})
export class CheckboxInput {
  control = input.required<FormControlState<boolean | undefined> | undefined>();
}
