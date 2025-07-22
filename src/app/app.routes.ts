import { Routes } from '@angular/router';
import { FormHarness } from './form-harness';
import { FormBuilder } from './form-builder';

export const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'form', component: FormBuilder },
  { path: 'form/:id', component: FormHarness },
];
