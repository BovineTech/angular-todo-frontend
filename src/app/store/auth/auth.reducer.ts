import { createReducer, on } from '@ngrx/store';
import { registerUserSuccess, loginUserSuccess, registerUserFailure, loginUserFailure } from './auth.actions';

export interface AuthState {
  user: any;
  error: string;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: '',
  loading: false,
};

export const authReducer = createReducer(
  initialState,
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
