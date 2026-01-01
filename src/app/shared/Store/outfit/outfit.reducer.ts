import { createReducer, on } from '@ngrx/store';
import { OutfitActions, OutfitApiActions } from './outfit.actions';
import { OutfitWithGarments } from '../../Models/outfit-with-garments.dto';

export interface OutfitState {
  outfits: OutfitWithGarments[];
  todayOutfits: OutfitWithGarments[];
  firstLoad: boolean;
  firstLoadError: boolean;
  error: string | null;
}

export const initialState: OutfitState = {
  outfits: [],
  todayOutfits: [],
  firstLoad: true,
  firstLoadError: false,
  error: null,
};

const _outfitReducer = createReducer(
  initialState,

  on(OutfitActions.loadOutfits, (state) => ({
    ...state,
    error: null,
  })),

  on(OutfitApiActions.loadOutfitsSuccess, (state, { outfits }) => ({
    ...state,
    outfits,
    firstLoad: false,
    error: null,
  })),

  on(OutfitApiActions.loadOutfitsFailure, (state, { error }) => ({
    ...state,
    firstLoad: false,
    firstLoadError: true,
    error,
  })),

  on(OutfitActions.loadOutfitsByDate, (state) => ({
    ...state,
    error: null,
  })),

  on(OutfitApiActions.loadOutfitsByDateSuccess, (state, { todayOutfits }) => ({
    ...state,
    todayOutfits,
    firstLoad: false,
    error: null,
  })),

  on(OutfitApiActions.loadOutfitsByDateFailure, (state, { error }) => ({
    ...state,
    firstLoad: false,
    firstLoadError: true,
    error,
  })),

  on(OutfitActions.createOutfit, (state) => ({
    ...state,
    error: null,
  })),

  on(OutfitApiActions.createOutfitSuccess, (state) => ({
    ...state,
    error: null,
  })),

  on(OutfitApiActions.createOutfitFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(OutfitActions.updateOutfit, (state) => ({
    ...state,
    error: null,
  })),

  on(OutfitApiActions.updateOutfitSuccess, (state) => ({
    ...state,
    error: null,
  })),

  on(OutfitApiActions.updateOutfitFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(OutfitActions.deleteOutfit, (state) => ({
    ...state,
    error: null,
  })),

  on(OutfitApiActions.deleteOutfitSuccess, (state, { id }) => ({
    ...state,
    outfits: state.outfits.filter((o) => o.id !== id),
    error: null,
  })),

  on(OutfitApiActions.deleteOutfitFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(OutfitActions.wearOutfit, (state) => ({
    ...state,
    error: null,
  })),

  on(OutfitApiActions.wearOutfitSuccess, (state) => ({
    ...state,
    error: null,
  })),

  on(OutfitApiActions.wearOutfitFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function outfitReducer(state: any, action: any) {
  return _outfitReducer(state, action);
}
