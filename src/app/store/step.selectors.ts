import { createSelector } from '@ngrx/store';
import { stepFeature } from './step.feature';

export const {
  name,
  reducer,
  selectForm,
  selectIndex,
  selectSteps,
  selectStepState,
} = stepFeature;

export const selectType = createSelector(
  selectSteps,
  selectIndex,
  (steps, index) => steps[index]?.type ?? '',
);

export const selectName = createSelector(
  selectSteps,
  selectIndex,
  (steps, index) => steps[index]?.name ?? '',
);

export const selectData = createSelector(
  selectSteps,
  selectIndex,
  (steps, index) => steps[index]?.data ?? '',
);
