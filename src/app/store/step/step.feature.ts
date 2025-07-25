import { createFeature } from '@ngrx/store';

import { reducer } from './step.reducer';

export const FEATURE_KEY = 'step';

export const stepFeature = createFeature({
  name: FEATURE_KEY,
  reducer,
});
