import { Component, inject, input } from '@angular/core';
import {
  AddArrayControlAction,
  FormArrayState,
  FormControlState,
  NgrxFormsModule,
  RemoveArrayControlAction,
} from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { questionsActions } from './store/questions.actions';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Observable } from 'rxjs';
import { BuilderForm, initialBuilder } from './store/questions.reducer';
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
    CdkDropList,
    NzInputModule,
    NgrxFormsModule,
    NzButtonModule,
    NzFormModule,
    NzTypographyModule,
    NzIconModule,
    NzDividerModule,
    NzSelectModule,
    NzEmptyModule,
    InputListItem,
  ],
  template: `
    <h5 nz-typography>
      @if (editing) {
        <div class="flex gap-x-2 items-center">
          <input
            nz-input
            placeholder="Form name"
            [ngrxFormControlState]="name()"
          />
          <a
            href="javascript:void(0);"
            [disabled]="name().isInvalid"
            nz-button
            nzType="link"
            (click)="editing = false"
          >
            <nz-icon nzType="save" nzTheme="outline" />
          </a>
        </div>
      } @else {
        {{ name().value }}
        <a href="javascript:void(0);" (click)="editing = true">
          <nz-icon nzType="edit" nzTheme="outline" />
        </a>
      }
    </h5>

    @if (controls().value.length === 0) {
      <nz-empty
        nzNotFoundImage="simple"
        [nzNotFoundContent]="contentTpl"
        [nzNotFoundFooter]="footerTpl"
      >
        <ng-template #contentTpl>
          <span nz-typography nzType="secondary">
            No user inputs have been added to this form
          </span>
        </ng-template>
        <ng-template #footerTpl>
          <button nz-button nzType="link" (click)="addQuestion(controls().id)">
            Click here to add a new input
          </button>
        </ng-template>
      </nz-empty>
    } @else {
      <div cdkDropList (cdkDropListDropped)="drop($event)">
        @for (
          control of controls().controls;
          track control.id;
          let index = $index
        ) {
          <app-input-list-item
            [form]="control"
            (removed)="removeQuestion(controls().id, index)"
          />
        }
      </div>
    }
  `,
  styles: `
    [nz-button] {
      line-height: normal;
    }
  `,
})
export class FormInputList {
  private readonly store = inject(Store);

  protected editing = false;

  controls = input.required<FormArrayState<BuilderForm>>();
  name = input.required<FormControlState<string>>();

  drop(event: CdkDragDrop<string[]>) {
    this.store.dispatch(
      questionsActions.move({
        from: event.previousIndex,
        to: event.currentIndex,
      }),
    );
  }

  addQuestion(id: string) {
    this.store.dispatch(new AddArrayControlAction(id, initialBuilder));
  }

  removeQuestion(id: string, index: number) {
    this.store.dispatch(new RemoveArrayControlAction(id, index));
  }
}
