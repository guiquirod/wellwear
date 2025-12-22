import { createReducer, on } from '@ngrx/store';
import { GarmentActions, GarmentApiActions } from './garment.actions';
import { GarmentDTO } from '../../Models/garment.dto';

export interface GarmentState {
  garments: GarmentDTO[];
  loading: boolean;
  error: string | null;
}

export const initialState: GarmentState = {
  garments: [],
  loading: false,
  error: null,
};

const _garmentReducer = createReducer(
  initialState,

  on(GarmentActions.loadGarments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(GarmentApiActions.loadGarmentsSuccess, (state, { garments }) => ({
    ...state,
    garments,
    loading: false,
    error: null,
  })),

  on(GarmentApiActions.loadGarmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(GarmentActions.createGarment, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(GarmentApiActions.createGarmentSuccess, (state, { garment }) => ({
    ...state,
    garments: [...state.garments, garment],
    loading: false,
    error: null,
  })),

  on(GarmentApiActions.createGarmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(GarmentActions.updateGarment, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(GarmentApiActions.updateGarmentSuccess, (state, { garment }) => ({
    ...state,
    garments: state.garments.map((g) => (g.id === garment.id ? garment : g)),
    loading: false,
    error: null,
  })),

  on(GarmentApiActions.updateGarmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(GarmentActions.deleteGarment, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(GarmentApiActions.deleteGarmentSuccess, (state, { id }) => ({
    ...state,
    garments: state.garments.filter((g) => g.id !== id),
    loading: false,
    error: null,
  })),

  on(GarmentApiActions.deleteGarmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function garmentReducer(state: any, action: any) {
  return _garmentReducer(state, action);
}
