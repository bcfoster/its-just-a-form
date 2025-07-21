import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngrx/store';
import { NzListModule } from 'ng-zorro-antd/list';
import { AddArrayControlAction, NgrxFormsModule } from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FORM_ID, initialFormValue } from './store/questions.reducer';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormWrapper } from './form-wrapper';
import { FormInputList } from './form-input-list';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    NgrxFormsModule,
    NzButtonModule,
    NzFormModule,
    NzListModule,
    NzSplitterModule,
    NzTypographyModule,
    FormWrapper,
    FormInputList,
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
          <app-form-wrapper />
        </div>
      </nz-splitter-panel>
    </nz-splitter>
  `,
})
export class App {
  private readonly store = inject(Store);

  addQuestion() {
    this.store.dispatch(new AddArrayControlAction(FORM_ID, initialFormValue));
  }
}
