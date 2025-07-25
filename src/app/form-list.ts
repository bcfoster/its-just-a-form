import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Observable } from 'rxjs';
import * as formSelectors from './store/forms.selectors';
import { PushPipe } from '@ngrx/component';
import { Form } from './store/forms.reducer';

@Component({
  selector: 'app-form-list',
  imports: [NzDividerModule, NzTableModule, NzTypographyModule, PushPipe],
  template: `
    <h1 nz-typography>Forms</h1>
    <nz-table #formTable [nzData]="(forms$ | ngrxPush) ?? []" nzSize="small">
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
              <a>Action</a>
              <nz-divider nzType="vertical"></nz-divider>
              <a>Delete</a>
            </td>
          </tr>
        }
      </tbody>
    </nz-table>
  `,
})
export class FormList {
  private readonly store = inject(Store);

  protected readonly forms$: Observable<Form[]>;

  constructor() {
    this.forms$ = this.store.select(formSelectors.selectForms);
  }

  select(form: Form) {
    console.log(JSON.stringify(form));
  }
}
