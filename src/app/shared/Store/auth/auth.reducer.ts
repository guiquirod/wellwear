import { Action, createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions } from './auth.actions';

export interface AuthState {
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
  authChecked: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  email: null,
  name: null,
  isAuthenticated: false,
  authChecked: false,
  loading: false,
  error: null,
};

const _authReducer = createReducer(
  initialState,

  on(AuthActions.loginUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthApiActions.loginSuccess, (state, { user }) => ({
    ...state,
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

  on(AuthActions.registerUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthApiActions.registerSuccess, (state, { user }) => ({
    ...state,
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

  on(AuthActions.logoutUser, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthApiActions.logoutSuccess, () => ({
    ...initialState,
    authChecked: true,
  })),

  on(AuthApiActions.logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.deleteUser, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthApiActions.deleteUserSuccess, () => ({
    ...initialState,
    authChecked: true,
  })),

  on(AuthApiActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthApiActions.loadAuthFromStorageSuccess, (state, { user }) => ({
    ...state,
    email: user.email,
    name: user.name,
    isAuthenticated: true,
    authChecked: true,
  })),

  on(AuthApiActions.loadAuthFromStorageFailure, (state) => ({
    ...state,
    authChecked: true,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
