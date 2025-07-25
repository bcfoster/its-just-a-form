import { Component, inject } from '@angular/core';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngrx/store';
import { NzListModule } from 'ng-zorro-antd/list';
import {
  AddArrayControlAction,
  FormArrayState,
  FormControlState,
  NgrxFormsModule,
} from 'ngrx-forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  BUILDER_FORM_ID,
  BuilderForm,
  initialBuilder,
  PreviewForm,
} from './store/form-builder/form-builder.reducer';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Observable } from 'rxjs';
import * as formBuilderSelectors from './store/form-builder/form-builder.selectors';
import { LetDirective } from '@ngrx/component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { formBuilderActions } from './store/form-builder/form-builder.actions';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-experience-builder',
  imports: [
    NgrxFormsModule,
    NzButtonModule,
    NzFormModule,
    NzListModule,
    NzSplitterModule,
    NzTypographyModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzSpaceModule,
    LetDirective,
  ],
  template: `
    <ng-container
      *ngrxLet="{
        name: formName$,
        builder: builderForm$,
        preview: previewForm$,
      } as vm"
    ></ng-container>
    <!--      @if (false) {-->
    <!--        <div style="box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px">-->
    <!--          <nz-page-header nzTitle="Form Builder" nzSubtitle="">-->
    <!--            <nz-page-header-title></nz-page-header-title>-->
    <!--            <nz-page-header-subtitle></nz-page-header-subtitle>-->
    <!--            <nz-page-header-extra>-->
    <!--              <nz-space>-->
    <!--                <button *nzSpaceItem nz-button nzType="primary">Search</button>-->
    <!--              </nz-space>-->
    <!--            </nz-page-header-extra>-->
    <!--          </nz-page-header>-->
    <!--        </div>-->
    <!--      }-->

    <!--      <nz-splitter>-->
    <!--        <nz-splitter-panel nzDefaultSize="25%" nzMin="20%" nzMax="99%">-->
    <!--          <div class="flex flex-col h-full px-3 py-4 gap-y-2">-->
    <!--            <div class="grow">-->
    <!--              <app-form-input-list [name]="vm.name" [controls]="vm.builder" />-->
    <!--            </div>-->
    <!--            <div class="flex-none">-->
    <!--              <div class="flex flex-col gap-y-3">-->
    <!--                <button-->
    <!--                  nz-button-->
    <!--                  nzType="default"-->
    <!--                  nzBlock-->
    <!--                  (click)="addQuestion()"-->
    <!--                >-->
    <!--                  Add input-->
    <!--                </button>-->
    <!--                <button nz-button nzType="primary" nzBlock (click)="save()">-->
    <!--                  Save-->
    <!--                </button>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </nz-splitter-panel>-->
    <!--        <nz-splitter-panel>-->
    <!--          <div class="p-3">-->
    <!--            <app-form-preview [controls]="vm.preview" />-->
    <!--          </div>-->
    <!--        </nz-splitter-panel>-->
    <!--      </nz-splitter>-->
    <!--    </ng-container>-->
  `,
})
export class ExperienceBuilder {
  private readonly store = inject(Store);

  protected readonly builderForm$: Observable<FormArrayState<BuilderForm>>;
  protected readonly previewForm$: Observable<FormArrayState<PreviewForm>>;
  protected readonly formName$: Observable<FormControlState<string>>;

  constructor() {
    this.builderForm$ = this.store.select(
      formBuilderSelectors.selectBuilderForm,
    );
    this.previewForm$ = this.store.select(
      formBuilderSelectors.selectPreviewForm,
    );
    this.formName$ = this.store.select(formBuilderSelectors.selectFormName);
  }

  addQuestion() {
    this.store.dispatch(
      new AddArrayControlAction(BUILDER_FORM_ID, initialBuilder),
    );
  }

  save() {
    this.store.dispatch(formBuilderActions.save());
  }
}
