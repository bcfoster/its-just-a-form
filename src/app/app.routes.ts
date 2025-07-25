import { Routes } from '@angular/router';
import { StepHarness } from './step-harness';
import { FormBuilder } from './form-builder';
import { FormHarness } from './form-harness';
import { ExperienceBuilder } from './experience-builder';

export const routes: Routes = [
  { path: '', component: ExperienceBuilder },
  { path: 'form', component: FormBuilder },
  { path: 'form/:id', component: FormHarness },
];
