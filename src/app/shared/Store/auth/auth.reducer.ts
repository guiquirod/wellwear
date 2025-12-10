import { Action, createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions } from './auth.actions';

export interface AuthState {
  id: number | null;
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  id: null,
  email: null,
  name: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const _authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthApiActions.loginSuccess, (state, { user }) => ({
    ...state,
    id: user.id!,
    email: user.email,
    name: user.name,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),

  on(AuthApiActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthApiActions.registerSuccess, (state, { user }) => ({
    ...state,
    id: user.id!,
    email: user.email,
    name: user.name,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),

  on(AuthApiActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthApiActions.logoutSuccess, () => ({
    ...initialState,
  })),

  on(AuthApiActions.loadAuthFromStorageSuccess, (state, { user }) => ({
    ...state,
    id: user.id!,
    email: user.email,
    name: user.name,
    isAuthenticated: true,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}