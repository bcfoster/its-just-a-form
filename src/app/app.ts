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
    <mat-drawer-container class="example-container">
      <mat-drawer mode="side" opened>
        <mat-list
          cdkDropList
          class="example-list"
          (cdkDropListDropped)="drop($event)"
        >
          @for (step of steps; track step) {
            <app-form-step-list-item class="example-box" [step]="step" />
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
  styles: `
    .example-list {
      width: 500px;
      max-width: 100%;
      border: solid 1px #ccc;
    }

    .example-box {
      border-bottom: solid 1px #ccc;
      color: rgba(0, 0, 0, 0.87);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      cursor: move;
    }

    .cdk-drag-preview {
      border: none;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow:
        0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .example-box:last-child {
      border: none;
    }

    .example-list.cdk-drop-list-dragging
      .example-box:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .example-container {
      min-height: 100%;
    }
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
