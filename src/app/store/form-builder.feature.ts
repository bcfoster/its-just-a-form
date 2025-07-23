import { createFeature } from '@ngrx/store';

import { reducer } from './form-builder.reducer';

export const FEATURE_KEY = 'form-builder';

export const formBuilderFeature = createFeature({
  name: FEATURE_KEY,
  reducer,
});
