import { Component, inject, input } from '@angular/core';
import { FormArrayState, NgrxFormsModule } from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { questionsActions } from './store/questions.actions';
import { Store } from '@ngrx/store';
import { Question } from './store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LowerCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormInput } from './store/questions.reducer';
import * as questionsSelectors from './store/questions.selectors';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'app-form-input-list',
  imports: [
    CdkDrag,
    CdkDropList,
    NgrxFormsModule,
    NzButtonModule,
    NzFormModule,
    NzTypographyModule,
    CdkDrag,
    NzSelectModule,
    LowerCasePipe,
    PushPipe,
  ],
  template: `
    @let form = form$ | ngrxPush;

    @if (form) {
      <h5 nz-typography>Personal information</h5>
      <div
        cdkDropList
        (cdkDropListDropped)="drop($event)"
        class="example-list w-full"
      >
        @for (question of questions(); track question; let index = $index) {
          <div cdkDrag class="example-box flex flex-col p-3 gap-y-2">
            <div class="flex justify-between">
              <div>
                {{ question.label }}
              </div>
              <div id="edit" class="invisible">
                <a href="#">edit</a>
              </div>
            </div>
            <nz-select
              nzPlaceHolder="Select an option"
              [nzDropdownMatchSelectWidth]="false"
              [ngrxFormControlState]="form.controls[index].controls.type"
            >
              @for (
                option of [
                  'Checkbox',
                  'Date',
                  'Radio',
                  'Select',
                  'Text',
                  'Textarea',
                  'Toggle',
                ];
                track option
              ) {
                <nz-option
                  [nzValue]="option | lowercase"
                  [nzLabel]="option"
                ></nz-option>
              }
            </nz-select>
          </div>
        }
      </div>
    }
  `,
  styles: `
    .example-list {
      border: solid 1px #ccc;
    }

    .example-box {
      border-bottom: solid 1px #ccc;
      color: rgba(0, 0, 0, 0.87);
      box-sizing: border-box;
      cursor: move;
    }

    .cdk-drag-preview {
      box-sizing: border-box;
      box-shadow:
        0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12);
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 15px;
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);
    }

    .example-box:last-child {
      border: none;
    }

    .example-list.cdk-drop-list-dragging
      .example-box:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .example-box:hover div#edit {
      visibility: visible !important;
    }
  `,
})
export class FormInputList {
  private readonly store = inject(Store);

  protected readonly form$: Observable<FormArrayState<FormInput>>;

  questions = input.required<Question[]>();

  constructor() {
    this.form$ = this.store.select(questionsSelectors.selectBuilder);
  }

  drop(event: CdkDragDrop<string[]>) {
    this.store.dispatch(
      questionsActions.move({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
      }),
    );
  }
}
