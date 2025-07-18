import { Component, input } from '@angular/core';
import { FormStep } from '../form-step';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-toggle-input',
  imports: [NzSwitchComponent],
  template: `
    <nz-switch />
  `,
  styles: ``,
})
export class ToggleInput {
  step = input.required<FormStep>();
}
