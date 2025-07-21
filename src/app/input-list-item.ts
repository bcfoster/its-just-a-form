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
import { LowerCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';

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
  ],
  template: `
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
              <a (click)="isEditing = false">save</a>
            </nz-list-item-action>
            <nz-list-item-action>
              <a (click)="removed.emit()">remove</a>
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
          form().value.type == 'checkbox' ||
          form().value.type == 'radio' ||
          form().value.type == 'select'
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
        <div class="flex gap-x-2 justify-between">
          <span nz-typography nzEllipsis>{{ form().value.label }}</span>
          <ul nz-list-item-actions>
            <nz-list-item-action>
              <a (click)="isEditing = true">edit</a>
            </nz-list-item-action>
            <nz-list-item-action>
              <a (click)="removed.emit()">remove</a>
            </nz-list-item-action>
          </ul>
        </div>
      }
    </div>
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
