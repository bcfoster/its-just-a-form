import { Component, inject } from '@angular/core';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngrx/store';
import { NzListModule } from 'ng-zorro-antd/list';
import {
  AddArrayControlAction,
  FormArrayState,
  NgrxFormsModule,
} from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  BuilderForm,
  initialBuilder,
  PreviewForm,
} from './store/questions.reducer';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormInputList } from './form-input-list';
import { FormPreview } from './form-preview';
import { Observable } from 'rxjs';
import * as questionsSelectors from './store/questions.selectors';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'app-root',
  imports: [
    NgrxFormsModule,
    NzButtonModule,
    NzFormModule,
    NzListModule,
    NzSplitterModule,
    NzTypographyModule,
    FormPreview,
    FormInputList,
    FormPreview,
    PushPipe,
  ],
  template: `
    <nz-splitter>
      <nz-splitter-panel nzDefaultSize="20%" nzMin="20%" nzMax="99%">
        <div class="flex flex-col h-full p-3 gap-y-2">
          <div class="grow overflow-auto">
            @let builderForm = builderForm$ | ngrxPush;
            @if (builderForm) {
              <app-form-input-list [controls]="builderForm" />
            }
          </div>
          <div class="flex-none">
            <button nz-button nzType="primary" nzBlock (click)="addQuestion()">
              Add new input
            </button>
          </div>
        </div>
      </nz-splitter-panel>
      <nz-splitter-panel>
        <div class="p-3">
          @let previewForm = previewForm$ | ngrxPush;
          @if (previewForm) {
            <app-form-preview [controls]="previewForm" />
          }
        </div>
      </nz-splitter-panel>
    </nz-splitter>
  `,
})
export class App {
  private readonly store = inject(Store);

  protected readonly builderForm$: Observable<FormArrayState<BuilderForm>>;
  protected readonly previewForm$: Observable<FormArrayState<PreviewForm>>;

  constructor() {
    this.builderForm$ = this.store.select(questionsSelectors.selectBuilderForm);
    this.previewForm$ = this.store.select(questionsSelectors.selectPreviewForm);
  }

  addQuestion() {
    this.store.dispatch(
      new AddArrayControlAction('forms.builder', initialBuilder),
    );
  }
}
