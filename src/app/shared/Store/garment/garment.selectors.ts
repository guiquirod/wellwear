import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GarmentState } from './garment.reducer';

export const selectGarmentState = createFeatureSelector<GarmentState>('garment');

export const selectAllGarments = createSelector(
  selectGarmentState,
  (state: GarmentState) => state?.garments || []
);

export const selectGarmentsLoading = createSelector(
  selectGarmentState,
  (state: GarmentState) => state.firstLoad
);

export const selectGarmentsError = createSelector(
  selectGarmentState,
  (state: GarmentState) => state.firstLoadError
);
