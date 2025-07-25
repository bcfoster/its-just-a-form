import { Component, inject } from '@angular/core';
import { FormArrayState, NgrxFormsModule } from 'ngrx-forms';
import { CheckboxInput } from './inputs/checkbox-input';
import {
  DateInput,
  SelectInput,
  TextareaInput,
  TextInput,
  ToggleInput,
} from './inputs';
import { LetDirective } from '@ngrx/component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RadioInput } from './inputs/radio-input';
import { Observable } from 'rxjs';
import * as stepSelectors from './store/step/step.selectors';
import { Store } from '@ngrx/store';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { Input, Step } from './store/step/step.reducer';
import { stepActions } from './store/step/step.actions';

@Component({
  selector: 'app-form',
  imports: [
    NzButtonModule,
    NgrxFormsModule,
    DateInput,
    SelectInput,
    ToggleInput,
    TextareaInput,
    TextInput,
    CheckboxInput,
    NzFormModule,
    RadioInput,
    NzTypographyComponent,
    FormsModule,
    LetDirective,
  ],
  template: `
    <ng-container
      *ngrxLet="{
        index: index$,
        name: name$,
        form: form$,
        steps: steps$,
      } as vm"
    >
      <div class="flex flex-col gap-y-2 w-1/2 self">
        <h3 nz-typography style="margin-bottom: 0">{{ vm.name }}</h3>

        <form nz-form autocomplete="off">
          <div class="flex flex-col gap-y-3">
            @for (control of vm.form.controls; track control.id) {
              <div class="flex flex-col">
                @if (control.value.label !== '') {
                  <nz-form-label
                    [nzRequired]="control.value.required"
                    nzLabelAlign="left"
                    nzNoColon
                  >
                    {{ control.value.label }}
                  </nz-form-label>
                }
                @switch (control.value.type) {
                  @case ('checkbox') {
                    <app-checkbox-input
                      [control]="control.controls.someBooleans"
                      [options]="control.value.options"
                    />
                  }
                  @case ('date') {
                    <app-date-input [control]="control.controls.someDate" />
                  }
                  @case ('radio') {
                    <app-radio-input
                      [control]="control.controls.someText"
                      [options]="control.value.options"
                    />
                  }
                  @case ('select') {
                    <app-select-input
                      [control]="control.controls.someText"
                      [options]="control.value.options"
                    />
                  }
                  @case ('text') {
                    <app-text-input [control]="control.controls.someText" />
                  }
                  @case ('textarea') {
                    <app-textarea-input [control]="control.controls.someText" />
                  }
                  @case ('toggle') {
                    <app-toggle-input
                      [control]="control.controls.someBoolean"
                    />
                  }
                }
              </div>
            }
          </div>
        </form>

        <div class="flex gap-x-2">
          <button
            nz-button
            nzType="primary"
            [disabled]="
              vm.index === 0 || vm.form.value.length === 0 || vm.form.isInvalid
            "
            (click)="previous()"
          >
            Previous
          </button>
          <button
            nz-button
            nzType="primary"
            [disabled]="
              vm.index === vm.steps.length - 1 ||
              vm.form.value.length === 0 ||
              vm.form.isInvalid
            "
            (click)="next()"
          >
            Next
          </button>
        </div>
      </div>
    </ng-container>
  `,
})
export class Form {
  private readonly store = inject(Store);

  protected readonly name$: Observable<string>;
  protected readonly index$: Observable<number>;
  protected readonly steps$: Observable<Step[]>;
  protected readonly form$: Observable<FormArrayState<Input>>;

  constructor() {
    this.index$ = this.store.select(stepSelectors.selectIndex);
    this.name$ = this.store.select(stepSelectors.selectName);
    this.steps$ = this.store.select(stepSelectors.selectSteps);
    this.form$ = this.store.select(stepSelectors.selectForm);
  }

  previous() {
    this.store.dispatch(stepActions.previous());
  }

  next() {
    this.store.dispatch(stepActions.next());
  }
}
