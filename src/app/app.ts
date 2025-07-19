import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { initialQuestions, Question } from './store';
import { Observable } from 'rxjs';
import * as questionsSelectors from './store/questions.selectors';
import { questionsActions } from './store/questions.actions';
import { NzListModule } from 'ng-zorro-antd/list';
import { FormArrayState, NgrxFormsModule } from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  DateInput,
  SelectInput,
  TextareaInput,
  TextInput,
  ToggleInput,
} from './inputs';
import { CheckboxInput } from './inputs/checkbox-input';
import { Form } from './store/questions.reducer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    CdkDrag,
    CdkDropList,
    NgrxFormsModule,
    NzButtonModule,
    NzFormModule,
    NzListModule,
    NzSplitterModule,
    PushPipe,
    LetDirective,
    DateInput,
    SelectInput,
    ToggleInput,
    TextareaInput,
    TextInput,
    CheckboxInput,
  ],
  template: `
    @let questions = questions$ | ngrxPush;

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
                <div cdkDrag class="p-4 example-box flex">
                  <div>
                    {{ question.label }}
                  </div>
                  <div id="edit" class="invisible">
                    <a href="#">edit</a>
                  </div>
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
        <div class="p-3">
          <form
            *ngrxLet="form$ as form"
            nz-form
            [ngrxFormState]="form"
            autocomplete="off"
          >
            <div class="flex flex-col gap-y-3">
              @for (question of questions; track question; let index = $index) {
                <div class="flex flex-col">
                  <nz-form-label nzRequired nzLabelAlign="left">
                    {{ question.label }}
                  </nz-form-label>
                  @switch (question.type) {
                    @case ('checkbox') {
                      <app-checkbox-input
                        [control]="form.controls[index].controls.someBooleans"
                        [options]="[
                          'Head',
                          'Shoulders',
                          'Back',
                          'Arms',
                          'Legs',
                        ]"
                      />
                    }
                    @case ('date') {
                      <app-date-input
                        [control]="form.controls[index].controls.someDate"
                      />
                    }
                    @case ('select') {
                      <app-select-input
                        [control]="form.controls[index].controls.someText"
                        [options]="question.options ?? []"
                      />
                    }
                    @case ('text') {
                      <app-text-input
                        [control]="form.controls[index].controls.someText"
                      />
                    }
                    @case ('textarea') {
                      <app-textarea-input
                        [control]="form.controls[index].controls.someText"
                      />
                    }
                    @case ('toggle') {
                      <app-toggle-input
                        [control]="form.controls[index].controls.someBoolean"
                      />
                    }
                  }
                </div>
              }
            </div>
          </form>
        </div>
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
export class App implements OnInit {
  private readonly store = inject(Store);

  // TODO: use type unknown?
  protected readonly form$: Observable<FormArrayState<Form>>;
  protected readonly questions$: Observable<Question[]>;

  constructor() {
    this.form$ = this.store.select(questionsSelectors.selectForm);
    this.questions$ = this.store.select(questionsSelectors.selectQuestions);
  }

  ngOnInit(): void {
    this.store.dispatch(
      questionsActions.initialize({ questions: initialQuestions }),
    );
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
