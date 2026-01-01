import { createReducer, on } from '@ngrx/store';
import { GarmentActions, GarmentApiActions } from './garment.actions';
import { GarmentDTO } from '../../Models/garment.dto';

export interface GarmentState {
  garments: GarmentDTO[];
  firstLoad: boolean;
  firstLoadError: boolean;
  error: string | null;
}

export const initialState: GarmentState = {
  garments: [],
  firstLoad: true,
  firstLoadError: false,
  error: null,
};

const _garmentReducer = createReducer(
  initialState,

  on(GarmentActions.loadGarments, (state) => ({
    ...state,
    error: null,
  })),

  on(GarmentApiActions.loadGarmentsSuccess, (state, { garments }) => ({
    ...state,
    garments,
    firstLoad: false,
    error: null,
  })),

  on(GarmentApiActions.loadGarmentsFailure, (state, { error }) => ({
    ...state,
    firstLoad: false,
    firstLoadError: true,
    error,
  })),

  on(GarmentActions.createGarment, (state) => ({
    ...state,
    error: null,
  })),

  on(GarmentApiActions.createGarmentSuccess, (state, { garment }) => ({
    ...state,
    garments: [...state.garments, garment],
    error: null,
  })),

  on(GarmentApiActions.createGarmentFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(GarmentActions.updateGarment, (state) => ({
    ...state,
    error: null,
  })),

  on(GarmentApiActions.updateGarmentSuccess, (state, { garment }) => ({
    ...state,
    garments: state.garments.map((g) => (g.id === garment.id ? garment : g)),
    error: null,
  })),

  on(GarmentApiActions.updateGarmentFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(GarmentActions.deleteGarment, (state) => ({
    ...state,
    error: null,
  })),

  on(GarmentApiActions.deleteGarmentSuccess, (state, { id }) => ({
    ...state,
    garments: state.garments.filter((g) => g.id !== id),
    error: null,
  })),

  on(GarmentApiActions.deleteGarmentFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function garmentReducer(state: any, action: any) {
  return _garmentReducer(state, action);
}
