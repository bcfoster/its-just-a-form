import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormStepListItem } from './form-step-list-item';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { QuestionFormStep } from './question-form-step';
import { FormStep } from './form-step';

@Component({
  selector: 'app-root',
  imports: [
    CdkDropList,
    FormStepListItem,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    QuestionFormStep,
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
          <mat-tab label="Preview">
            <div class="p-5">
              @if (step > -1) {
                @switch (formStep.type) {
                  @case ('question') {
                    <app-question-form-step
                      [step]="formStep"
                    ></app-question-form-step>
                  }
                  @case ('ai_question') {
                    <div>ai_question</div>
                  }
                  @case ('form') {
                    <div>form</div>
                  }
                  @case ('adjudicate') {
                    <div>adjudicate</div>
                  }
                  @case ('route_to_url') {
                    <div>route_to_url</div>
                  }
                  @case ('route_to_form') {
                    <div>route_to_form</div>
                  }
                }
              }
              <div class="flex gap-3">
                @if (step > -1) {
                  <button matButton="outlined" (click)="previous()">
                    Previous
                  </button>
                }
                <button matButton="outlined" (click)="next()">
                  {{ step == -1 ? 'Start' : 'Next' }}
                </button>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
})
export class App {
  protected title = 'its-just-a-form';

  steps: FormStep[] = [
    {
      type: 'question',
      icon: 'live_help',
      title: 'Question',
      subtitle: 'What is your birth day?',
      input: 'select',
      options: ['Steak', 'Pizza', 'Tacos'],
    },
    {
      type: 'ai_question',
      icon: 'assistant',
      title: 'Dynamic Question',
      subtitle: "Collect the worker's date of birth",
    },
    {
      type: 'form',
      icon: 'article',
      title: 'Form',
      subtitle: 'Worker contact information',
    },
    {
      type: 'adjudicate',
      icon: 'auto_awesome',
      title: 'Adjudicate',
      subtitle: 'Express adjudication',
    },
    {
      type: 'route_to_url',
      icon: 'call_split',
      title: 'Route to URL',
      subtitle: 'https://www.worksafebc.com',
    },
    {
      type: 'route_to_form',
      icon: 'call_split',
      title: 'Route to Form',
      subtitle: 'Worker contact information',
    },
  ];

  step = -1;

  get formStep(): FormStep {
    return this.steps[this.step];
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
  }

  previous() {
    this.step = this.step - 1 > -1 ? this.step - 1 : -1;
  }

  next() {
    this.step = this.step + 1 < this.steps.length ? this.step + 1 : -1;
  }
}
