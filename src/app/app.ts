import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormStep, FormStepListItem } from './form-step-list-item';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  imports: [
    CdkDropList,
    FormStepListItem,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
  ],
  template: `
    <mat-drawer-container class="h-full">
      <mat-drawer mode="side" opened>
        <mat-list cdkDropList (cdkDropListDropped)="drop($event)">
          @for (step of steps; track step) {
            <app-form-step-list-item class="cursor-move" [step]="step" />
          }
        </mat-list>
      </mat-drawer>
      <mat-drawer-content>
        <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start">
          <mat-tab label="Preview">Preview</mat-tab>
        </mat-tab-group>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
})
export class App {
  protected title = 'its-just-a-form';

  steps: FormStep[] = [
    {
      icon: 'live_help',
      title: 'Question',
      subtitle: 'What is your birth day?',
    },
    {
      icon: 'assistant',
      title: 'Dynamic Question',
      subtitle: "Collect the worker's date of birth",
    },
    {
      symbol: 'article',
      title: 'Form',
      subtitle: 'Worker contact information',
    },
    {
      symbol: 'auto_awesome',
      title: 'Adjudicate',
      subtitle: 'Express adjudication',
    },
    {
      symbol: 'arrow_split',
      title: 'Route to URL',
      subtitle: 'https://www.worksafebc.com',
    },
    {
      symbol: 'arrow_split',
      title: 'Route to Form',
      subtitle: 'Worker contact information',
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
  }
}
