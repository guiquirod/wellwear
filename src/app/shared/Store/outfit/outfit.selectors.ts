import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OutfitState } from './outfit.reducer';

export const selectOutfitState = createFeatureSelector<OutfitState>('outfit');

export const selectAllOutfits = createSelector(
  selectOutfitState,
  (state: OutfitState) => state?.outfits || []
);

export const selectTodayOutfits = createSelector(
  selectOutfitState,
  (state: OutfitState) => state?.todayOutfits || []
);

export const selectOutfitLoading = createSelector(
  selectOutfitState,
  (state: OutfitState) => state.firstLoad
);

export const selectOutfitError = createSelector(
  selectOutfitState,
  (state: OutfitState) => state.firstLoadError
);
