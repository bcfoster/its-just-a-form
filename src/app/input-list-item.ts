import { Component, inject, input, output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzListModule } from 'ng-zorro-antd/list';
import {
  AddArrayControlAction,
  FormGroupState,
  NgrxFormsModule,
  RemoveArrayControlAction,
} from 'ngrx-forms';
import { BuilderForm } from './store/questions.reducer';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-input-list-item',
  imports: [
    NzButtonModule,
    NzCheckboxModule,
    NzListModule,
    NzIconModule,
    NzTypographyModule,
    NgrxFormsModule,
    NzInputDirective,
    NzSelectModule,
    LowerCasePipe,
    TitleCasePipe,
    CdkDrag,
  ],
  template: `
    <div cdkDrag [cdkDragDisabled]="$any(false)" class="flex flex-col p-2">
      <div class="flex flex-col gap-y-2">
        @if (isEditing) {
          <div class="flex gap-x-2 justify-between">
            <input
              nz-input
              placeholder="Label text"
              [ngrxFormControlState]="form().controls.label"
            />
            <ul nz-list-item-actions style="margin-left: 0">
              <nz-list-item-action>
                <button
                  nz-button
                  nzType="link"
                  (click)="isEditing = false"
                  [disabled]="form().isInvalid"
                  style="margin: 0; padding: 0;"
                >
                  save
                </button>
              </nz-list-item-action>
              <nz-list-item-action>
                <button
                  nz-button
                  nzType="link"
                  (click)="removed.emit()"
                  style="margin: 0; padding: 0;"
                >
                  remove
                </button>
              </nz-list-item-action>
            </ul>
          </div>

          <nz-select
            nzPlaceHolder="Select an option"
            [nzDropdownMatchSelectWidth]="false"
            [ngrxFormControlState]="form().controls.type"
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
            form().value.type === 'checkbox' ||
            form().value.type === 'radio' ||
            form().value.type === 'select'
          ) {
            @let options = form().controls.options;

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
                form().controls.validators.controls.required
              "
            >
              Required
            </label>
            <br />
          </div>
        } @else {
          <div class="flex gap-x-2 justify-between items-center">
            <div class="flex flex-col gap-y-1">
              <!-- TODO: a label with no spaces will not trigger nzEllipsis and will overflow the buttons -->
              <span nz-typography nzEllipsis>{{ form().value.label }}</span>
              <span nz-typography>
                <kbd style="margin: 0;">
                  {{ form().value.type | titlecase }}
                </kbd>
              </span>
            </div>
            <ul nz-list-item-actions>
              <nz-list-item-action>
                <button
                  nz-button
                  nzType="link"
                  (click)="isEditing = true"
                  style="margin: 0; padding: 0;"
                >
                  edit
                </button>
              </nz-list-item-action>
              <nz-list-item-action>
                <button
                  nz-button
                  nzType="link"
                  (click)="removed.emit()"
                  style="margin: 0; padding: 0;"
                >
                  remove
                </button>
              </nz-list-item-action>
            </ul>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    [nz-button] {
      line-height: normal;
    }

    .cdk-drag-animating {
      transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-preview {
      background-color: white;
      box-sizing: border-box;
      box-shadow:
        0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }
  `,
})
export class InputListItem {
  private readonly store = inject(Store);

  protected isEditing = false;
  protected removed = output();

  form = input.required<FormGroupState<BuilderForm>>();

  addOption(id: string) {
    this.store.dispatch(new AddArrayControlAction(id, ''));
  }

  removeOption(id: string, index: number) {
    this.store.dispatch(new RemoveArrayControlAction(id, index));
  }
}
