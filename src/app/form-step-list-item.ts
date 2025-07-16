import { Component, input } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormStep } from './form-step';

@Component({
  selector: 'app-form-step-list-item',
  imports: [CdkDrag, MatIconModule, MatListModule],
  template: `
    <mat-list-item cdkDrag style="cursor: move">
      <mat-icon matListItemIcon>
        {{ step().icon }}
      </mat-icon>
      <span matListItemTitle>{{ step().title }}</span>
      <span matListItemLine>{{ step().subtitle }}</span>
    </mat-list-item>
  `,
  styles: ``,
})
export class FormStepListItem {
  step = input.required<FormStep>();
}
