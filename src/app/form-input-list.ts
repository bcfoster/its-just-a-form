import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import {
  AddArrayControlAction,
  FormArrayState,
  FormControlState,
  NgrxFormsModule,
  RemoveArrayControlAction,
} from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { questionsActions } from './store/questions.actions';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LowerCasePipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { BuilderForm } from './store/questions.reducer';
import * as questionsSelectors from './store/questions.selectors';
import { PushPipe } from '@ngrx/component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-form-input-list',
  imports: [
    CdkDrag,
    CdkDropList,
    NzInputModule,
    NgrxFormsModule,
    NzButtonModule,
    NzFormModule,
    NzTypographyModule,
    NzIconModule,
    NzDividerModule,
    CdkDrag,
    NzSelectModule,
    LowerCasePipe,
    PushPipe,
    NzCheckboxComponent,
    NzEmptyModule,
  ],
  template: `
    @let form = form$ | ngrxPush;
    @let name = name$ | ngrxPush;

    <h5 nz-typography>
      @if (name) {
        @if (editing) {
          <div class="flex gap-x-2 items-center">
            <input
              #formName
              nz-input
              placeholder="Form name"
              [ngrxFormControlState]="name"
            />
            <a
              href="javascript:void(0);"
              [disabled]="name.isInvalid"
              nz-button
              nzType="link"
              (click)="editing = false"
            >
              <nz-icon nzType="save" nzTheme="outline" />
            </a>
          </div>
        } @else {
          {{ name.value }}
          <a href="javascript:void(0);" (click)="editing = true">
            <nz-icon nzType="edit" nzTheme="outline" />
          </a>
        }
      }
    </h5>

    @if (form?.value?.length === 0) {
      <nz-empty nzNotFoundImage="simple" />
    }

    @if (form && form.value.length > 0) {
      <div cdkDropList (cdkDropListDropped)="drop($event)" class="example-list">
        @for (
          control of form.controls;
          track control.id;
          let count = $count;
          let index = $index
        ) {
          <div cdkDrag class="example-box flex flex-col p-3 gap-y-2">
            <div class="flex gap-x-2 items-center">
              <input
                nz-input
                placeholder="Label text"
                [ngrxFormControlState]="form.controls[index].controls.label"
              />
              @if (count > 1) {
                <a
                  href="javascript:void(0)"
                  (click)="removeQuestion(form.id, index)"
                >
                  <nz-icon nzType="delete" nzTheme="outline" />
                </a>
              }
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

            @if (
              form.controls[index].value.type == 'checkbox' ||
              form.controls[index].value.type == 'radio'
            ) {
              @let options = form.controls[index].controls.options;

              <div class="flex flex-col gap-y-2">
                @if (options.value.length > 0) {
                  <div>Options</div>
                }
                @for (
                  control of options.controls;
                  track control.id;
                  let count = $count;
                  let index = $index
                ) {
                  <div class="flex items-center gap-x-2">
                    <input nz-input [ngrxFormControlState]="control" />
                    @if (count > 1) {
                      <a
                        href="javascript:void(0);"
                        (click)="removeOption(options.id, index)"
                      >
                        <nz-icon nzType="delete" nzTheme="outline" />
                      </a>
                    }
                  </div>
                }
                <button
                  nz-button
                  nzType="link"
                  nzBlock
                  (click)="addOption(options.id)"
                >
                  Add option
                </button>
              </div>
            }

            <div class="flex flex-col gap-y-2">
              <div>Validators</div>
              <label
                nz-checkbox
                [ngrxFormControlState]="
                  form.controls[index].controls.validators.controls.required
                "
              >
                Required
              </label>
              <br />
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: `
    [nz-button] {
      line-height: normal;
    }

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
      padding: 10px 15px;
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

  protected readonly form$: Observable<FormArrayState<BuilderForm>>;
  protected readonly name$: Observable<FormControlState<string>>;
  protected editing = false;

  constructor() {
    this.form$ = this.store
      .select(questionsSelectors.selectForms)
      .pipe(map((forms) => forms.controls.builder));
    this.name$ = this.store
      .select(questionsSelectors.selectForms)
      .pipe(map((forms) => forms.controls.name));
  }

  @ViewChild('formName') formNameInput: ElementRef | undefined;

  drop(event: CdkDragDrop<string[]>) {
    this.store.dispatch(
      questionsActions.move({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
      }),
    );
  }

  addOption(id: string) {
    this.store.dispatch(new AddArrayControlAction(id, ''));
  }

  removeOption(id: string, index: number) {
    this.store.dispatch(new RemoveArrayControlAction(id, index));
  }

  removeQuestion(id: string, index: number) {
    this.store.dispatch(new RemoveArrayControlAction(id, index));
  }
}
