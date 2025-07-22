import { Routes } from '@angular/router';
import { App } from './app';
import { FormHarness } from './form-harness';
import { FormBuilder } from './form-builder';

export const routes: Routes = [
  { path: '', component: App, pathMatch: 'full' },
  { path: 'form/builder', component: FormBuilder },
  { path: 'form/:id', component: FormHarness },
];
