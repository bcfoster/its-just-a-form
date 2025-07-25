import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Observable } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { Form } from './store/forms/forms.reducer';
import * as formsSelectors from './store/forms/forms.selectors';
import { formsActions } from './store/forms/forms.actions';

@Component({
  selector: 'app-form-list',
  imports: [NzDividerModule, NzTableModule, NzTypographyModule, PushPipe],
  template: `
    <div class="flex flex-col h-full">
      <h1 nz-typography>Forms</h1>
      <nz-table
        #formTable
        [nzData]="(forms$ | ngrxPush) ?? []"
        nzFrontPagination="false"
        nzSize="small"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          @for (data of formTable.data; track data) {
            <tr (click)="select(data)">
              <td>{{ data.name }}</td>
              <td>
                @if (false) {
                  <a>action</a>
                  <nz-divider nzType="vertical"></nz-divider>
                }
                <a href="javascript:void(0);" (click)="remove(data.id)">
                  remove
                </a>
              </td>
            </tr>
          }
        </tbody>
      </nz-table>
    </div>
  `,
})
export class FormList {
  private readonly store = inject(Store);

  protected readonly forms$: Observable<Form[]>;

  constructor() {
    this.forms$ = this.store.select(formsSelectors.selectAllForms);
  }

  select(form: Form) {
    console.log(JSON.stringify(form));
  }

  remove(id: string) {
    this.store.dispatch(formsActions.remove({ id }));
  }
}
