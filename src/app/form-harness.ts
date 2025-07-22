import { Component, inject, OnInit } from '@angular/core';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { Forms, PreviewForm } from './store/questions.reducer';
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
import * as questionsSelectors from './store/questions.selectors';
import { Store } from '@ngrx/store';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { formActions } from './store/form.actions';

@Component({
  selector: 'app-form-harness',
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
    <div *ngrxLet="forms$ as forms" class="m-5">
      <h3 nz-typography>{{ forms.value.name }}</h3>
      <form nz-form autocomplete="off" (ngSubmit)="submit(forms.value.preview)">
        <div class="flex flex-col gap-y-3">
          @for (control of forms.controls.preview.controls; track control.id) {
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
                  <app-toggle-input [control]="control.controls.someBoolean" />
                }
              }
            </div>
          }
          <div>
            <button
              nz-button
              nzType="primary"
              [disabled]="
                forms.value.preview.length === 0 ||
                forms.controls.preview.isInvalid
              "
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class FormHarness implements OnInit {
  private readonly store = inject(Store);

  protected readonly forms$: Observable<FormGroupState<Forms>>;

  constructor() {
    this.forms$ = this.store.select(questionsSelectors.selectForms);
  }

  ngOnInit() {
    this.store.dispatch(formActions.initialized());
  }

  submit(form: PreviewForm[]) {
    console.log(JSON.stringify(form));
  }
}
