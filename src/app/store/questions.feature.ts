import { createFeature } from '@ngrx/store';

import { reducer } from './questions.reducer';

export const FEATURE_KEY = 'questions';

export const questionsFeature = createFeature({
  name: FEATURE_KEY,
  reducer,
});
