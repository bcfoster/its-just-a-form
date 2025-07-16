import { Component, input } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export interface FormStep {
  icon?: string;
  symbol?: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-form-step-list-item',
  imports: [CdkDrag, MatIconModule, MatListModule],
  template: `
    <mat-list-item cdkDrag style="cursor: move">
      @if (step().symbol) {
        <mat-icon matListItemIcon fontSet="material-symbols-outlined">
          {{ step().symbol }}
        </mat-icon>
      } @else {
        <mat-icon matListItemIcon>
          {{ step().icon }}
        </mat-icon>
      }
      <span matListItemTitle>{{ step().title }}</span>
      <span matListItemLine>{{ step().subtitle }}</span>
    </mat-list-item>
  `,
  styles: ``,
})
export class FormStepListItem {
  step = input.required<FormStep>();
}
