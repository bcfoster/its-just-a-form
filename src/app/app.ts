import { Component, inject } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Question } from './store';
import { Observable } from 'rxjs';
import * as questionsSelectors from './store/questions.selectors';
import { questionsActions } from './store/questions.actions';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  FormArrayState,
  NgrxFormsModule,
  NgrxValueConverters,
} from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LowerCasePipe } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-root',
  imports: [
    CdkDropList,
    NzButtonModule,
    NzListModule,
    NzInputModule,
    NzSplitterModule,
    PushPipe,
    CdkDrag,
    NgrxFormsModule,
    NzFormModule,
    NzSwitchComponent,
    NzSelectModule,
    LowerCasePipe,
    NzCheckboxModule,
    NzDatePickerModule,
  ],
  template: `
    @let questions = questions$ | ngrxPush;
    @let form = form$ | ngrxPush;

    <nz-splitter>
      <nz-splitter-panel nzDefaultSize="20%" nzMin="20%" nzMax="99%">
        <div class="flex flex-col h-full p-3">
          <div class="grow overflow-auto">
            <div
              cdkDropList
              (cdkDropListDropped)="drop($event)"
              class="example-list w-full"
            >
              @for (question of questions; track question) {
                <div cdkDrag class="p-2 example-box">
                  {{ question.label }}
                </div>
              }
            </div>
          </div>
          <div class="flex-none">
            <button nz-button nzType="primary" nzBlock disabled>
              Add question
            </button>
          </div>
        </div>
      </nz-splitter-panel>
      <nz-splitter-panel>
        @if (form && questions) {
          <div class="px-3">
            <form
              class="flex flex-col gap-y-4"
              nz-form
              [ngrxFormState]="form"
              autocomplete="off"
            >
              @for (question of questions; track question; let index = $index) {
                <div class="flex flex-col">
                  <nz-form-label nzRequired nzFor="text" nzLabelAlign="left">
                    {{ question.label }}
                  </nz-form-label>
                  @switch (question.type) {
                    @case ('checkbox') {
                      <label
                        nz-checkbox
                        [ngrxFormControlState]="form.controls[index]"
                      >
                        Head
                      </label>
                      <br />
                      <label nz-checkbox>Chest</label>
                      <br />
                      <label nz-checkbox>Torso</label>
                      <br />
                      <label nz-checkbox>Arms</label>
                      <br />
                      <label nz-checkbox>Legs</label>
                    }
                    @case ('date') {
                      <nz-date-picker
                        [ngrxFormControlState]="form.controls[index]"
                        [ngrxValueConverter]="dateValueConverter"
                      ></nz-date-picker>
                    }
                    @case ('select') {
                      <nz-select
                        nzPlaceHolder="Select an option"
                        [ngrxFormControlState]="form.controls[index]"
                      >
                        @for (option of question.options; track option) {
                          <nz-option
                            [nzValue]="option | lowercase"
                            [nzLabel]="option"
                          ></nz-option>
                        }
                      </nz-select>
                    }
                    @case ('text') {
                      <input
                        nz-input
                        id="text"
                        [ngrxFormControlState]="form.controls[index]"
                      />
                    }
                    @case ('textarea') {
                      <textarea
                        rows="4"
                        nz-input
                        [ngrxFormControlState]="form.controls[index]"
                      ></textarea>
                    }
                    @case ('toggle') {
                      <nz-switch
                        [ngrxFormControlState]="form.controls[index]"
                      />
                    }
                  }
                </div>
              }
            </form>
          </div>
        }
      </nz-splitter-panel>
    </nz-splitter>
  `,
  styles: `
    .example-list {
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
      background: white;
    }

    .cdk-drag-preview {
      box-sizing: border-box;
      box-shadow:
        0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      /*transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);*/
    }

    .example-box:last-child {
      border: none;
    }

    .example-list.cdk-drop-list-dragging
      .example-box:not(.cdk-drag-placeholder) {
      /*transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);*/
    }
  `,
})
export class App {
  protected title = 'its-just-a-form';
  private readonly store = inject(Store);

  protected readonly form$: Observable<FormArrayState<string | boolean | null>>;
  protected readonly questions$: Observable<Question[]>;

  dateValueConverter = NgrxValueConverters.dateToISOString;

  constructor() {
    this.form$ = this.store.select(questionsSelectors.selectForm);
    this.questions$ = this.store.select(questionsSelectors.selectQuestions);
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
