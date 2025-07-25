import { formsFeature } from './forms.feature';
import { createSelector } from '@ngrx/store';
import * as fromForms from './forms.reducer';

export const {
  name,
  reducer,
  selectEntities,
  selectFormsState,
  selectIds,
  selectSelectedUserId,
} = formsFeature;

export const selectAllForms = createSelector(
  selectFormsState,
  fromForms.selectAllForms,
);
