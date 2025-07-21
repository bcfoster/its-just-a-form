import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { initialQuestions, Question } from './store';
import { Observable } from 'rxjs';
import * as questionsSelectors from './store/questions.selectors';
import { questionsActions } from './store/questions.actions';
import { NzListModule } from 'ng-zorro-antd/list';
import { FormArrayState, NgrxFormsModule } from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Form } from './store/questions.reducer';
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
    PushPipe,
    FormWrapper,
    FormInputList,
  ],
  template: `
    @let form = form$ | ngrxPush;
    @let questions = questions$ | ngrxPush;

    @if (form && questions) {
      <nz-splitter>
        <nz-splitter-panel nzDefaultSize="20%" nzMin="20%" nzMax="99%">
          <div class="flex flex-col h-full p-3 gap-y-2">
            <div class="grow overflow-auto">
              <app-form-input-list [questions]="questions" />
            </div>
            <div class="flex-none">
              <button nz-button nzType="primary" nzBlock disabled>
                Add question
              </button>
            </div>
          </div>
        </nz-splitter-panel>
        <nz-splitter-panel>
          <div class="p-3">
            <h3 nz-typography>Personal information</h3>
            <!-- TODO: use a view model -->
            <app-form-wrapper
              [form]="form"
              [questions]="questions"
            ></app-form-wrapper>
          </div>
        </nz-splitter-panel>
      </nz-splitter>
    }
  `,
})
export class App implements OnInit {
  private readonly store = inject(Store);

  // TODO: use type unknown?
  protected readonly form$: Observable<FormArrayState<Form>>;
  protected readonly questions$: Observable<Question[]>;

  constructor() {
    this.form$ = this.store.select(questionsSelectors.selectForm);
    this.questions$ = this.store.select(questionsSelectors.selectQuestions);
  }

  ngOnInit(): void {
    this.store.dispatch(
      questionsActions.initialize({ questions: initialQuestions }),
    );
  }
}
