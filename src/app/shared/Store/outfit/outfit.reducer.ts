import { createReducer, on } from '@ngrx/store';
import { OutfitActions, OutfitApiActions } from './outfit.actions';
import { OutfitWithGarments } from '../../Models/outfit-with-garments.dto';

export interface OutfitState {
  outfits: OutfitWithGarments[];
  todayOutfits: OutfitWithGarments[];
  loading: boolean;
  error: string | null;
}

export const initialState: OutfitState = {
  outfits: [],
  todayOutfits: [],
  loading: false,
  error: null,
};

const _outfitReducer = createReducer(
  initialState,

  on(OutfitActions.loadOutfits, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(OutfitApiActions.loadOutfitsSuccess, (state, { outfits }) => ({
    ...state,
    outfits,
    loading: false,
    error: null,
  })),

  on(OutfitApiActions.loadOutfitsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OutfitActions.loadOutfitsByDate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(OutfitApiActions.loadOutfitsByDateSuccess, (state, { todayOutfits }) => ({
    ...state,
    todayOutfits,
    loading: false,
    error: null,
  })),

  on(OutfitApiActions.loadOutfitsByDateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OutfitActions.createOutfit, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(OutfitApiActions.createOutfitSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),

  on(OutfitApiActions.createOutfitFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OutfitActions.updateOutfit, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(OutfitApiActions.updateOutfitSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),

  on(OutfitApiActions.updateOutfitFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OutfitActions.deleteOutfit, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(OutfitApiActions.deleteOutfitSuccess, (state, { id }) => ({
    ...state,
    outfits: state.outfits.filter((o) => o.id !== id),
    loading: false,
    error: null,
  })),

  on(OutfitApiActions.deleteOutfitFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OutfitActions.wearOutfit, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(OutfitApiActions.wearOutfitSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),

  on(OutfitApiActions.wearOutfitFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function outfitReducer(state: any, action: any) {
  return _outfitReducer(state, action);
}
