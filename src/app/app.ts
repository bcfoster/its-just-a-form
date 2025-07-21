import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngrx/store';
import { NzListModule } from 'ng-zorro-antd/list';
import { AddArrayControlAction, NgrxFormsModule } from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { initialBuilder } from './store/questions.reducer';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormInputList } from './form-input-list';
import { FormPreview } from './form-preview';

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
  ],
  template: `
    <nz-splitter>
      <nz-splitter-panel nzDefaultSize="20%" nzMin="20%" nzMax="99%">
        <div class="flex flex-col h-full p-3 gap-y-2">
          <div class="grow overflow-auto">
            <app-form-input-list />
          </div>
          <div class="flex-none">
            <button nz-button nzType="primary" nzBlock (click)="addQuestion()">
              Add question
            </button>
          </div>
        </div>
      </nz-splitter-panel>
      <nz-splitter-panel>
        <div class="p-3">
          <app-form-preview />
        </div>
      </nz-splitter-panel>
    </nz-splitter>
  `,
})
export class App {
  private readonly store = inject(Store);

  addQuestion() {
    this.store.dispatch(
      new AddArrayControlAction('forms.builder', initialBuilder),
    );
  }
}
