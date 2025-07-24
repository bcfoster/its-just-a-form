import { Component, inject, OnInit } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { stepActions } from './store/step.actions';
import { Observable } from 'rxjs';
import { StepType } from './store/step.reducer';
import { PushPipe } from '@ngrx/component';
import * as stepSelectors from './store/step.selectors';
import { Form } from './form';

@Component({
  selector: 'app-step-harness',
  imports: [
    NzButtonModule,
    NgrxFormsModule,
    NzFormModule,
    FormsModule,
    PushPipe,
    Form,
  ],
  template: `
    @switch (type$ | ngrxPush) {
      @case ('form') {
        <app-form></app-form>
      }
    }
  `,
})
export class StepHarness implements OnInit {
  private readonly store = inject(Store);

  protected readonly type$: Observable<StepType>;

  constructor() {
    this.type$ = this.store.select(stepSelectors.selectType);
  }

  ngOnInit() {
    this.store.dispatch(stepActions.loaded());
  }
}
