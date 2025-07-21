import { Component, inject, input } from '@angular/core';
import {
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
import { map, Observable } from 'rxjs';
import { BuilderForm } from './store/questions.reducer';
import * as questionsSelectors from './store/questions.selectors';
import { PushPipe } from '@ngrx/component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { InputListItem } from './input-list-item';

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
    PushPipe,
    NzEmptyModule,
    InputListItem,
  ],
  template: `
    @let form = form$ | ngrxPush;
    @let name = name$ | ngrxPush;

    <h5 nz-typography>
      @if (name) {
        @if (editing) {
          <div class="flex gap-x-2 items-center">
            <input
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

    @if (form !== undefined && form.value.length === 0) {
      <nz-empty nzNotFoundImage="simple" />
    }

    @if (form !== undefined && form.value.length > 0) {
      <div cdkDropList (cdkDropListDropped)="drop($event)" class="example-list">
        @for (control of form.controls; track control.id; let index = $index) {
          <div cdkDrag class="example-box flex flex-col p-3 gap-y-2">
            <app-input-list-item
              [form]="control"
              (removed)="removeQuestion(form.id, index)"
            />
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

  controls = input.required<FormArrayState<BuilderForm>>();

  constructor() {
    this.form$ = this.store
      .select(questionsSelectors.selectForms)
      .pipe(map((forms) => forms.controls.builder));
    this.name$ = this.store
      .select(questionsSelectors.selectForms)
      .pipe(map((forms) => forms.controls.name));
  }

  drop(event: CdkDragDrop<string[]>) {
    this.store.dispatch(
      questionsActions.move({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
      }),
    );
  }

  removeQuestion(id: string, index: number) {
    this.store.dispatch(new RemoveArrayControlAction(id, index));
  }
}
