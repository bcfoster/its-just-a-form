import { createFeature } from '@ngrx/store';

import { reducer } from './forms.reducer';

export const FEATURE_KEY = 'forms';

export const formsFeature = createFeature({
  name: FEATURE_KEY,
  reducer,
});
