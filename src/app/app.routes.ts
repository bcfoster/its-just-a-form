import { Routes } from '@angular/router';
import { StepHarness } from './step-harness';
import { FormBuilder } from './form-builder';
import { FormHarness } from './form-harness';

export const routes: Routes = [
  { path: '', component: StepHarness },
  { path: 'form', component: FormBuilder },
  { path: 'form/:id', component: FormHarness },
];
