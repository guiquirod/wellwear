import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GarmentState } from './garment.reducer';

export const selectGarmentState = createFeatureSelector<GarmentState>('garment');

export const selectAllGarments = createSelector(
  selectGarmentState,
  (state: GarmentState) => state?.garments || []
);

export const selectGarmentsLoading = createSelector(
  selectGarmentState,
  (state: GarmentState) => state.loading
);

export const selectGarmentsError = createSelector(
  selectGarmentState,
  (state: GarmentState) => state.error
);

export const selectGarmentById = (id: string) => createSelector(
  selectAllGarments,
  (garments) => garments.find(g => g.id === id)
);
