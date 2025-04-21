import { createReducer, on } from '@ngrx/store';
import { registerUserSuccess, loginUserSuccess, registerUserFailure, loginUserFailure } from './Auth.Action';
import { authState } from './Auth.State';

export const authReducer = createReducer(
  authState,
  on(registerUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
  })),
  on(loginUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
  })),
  on(registerUserFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),
  on(loginUserFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }))
);
