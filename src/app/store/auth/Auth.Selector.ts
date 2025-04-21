import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthModel } from "./Auth.Model";

const getAuthState = createFeatureSelector<AuthModel>("auth");

export const getUser = createSelector(getAuthState, (state) => {
  return state.user;
});

export const getAuthLoading = createSelector(getAuthState, (state) => {
  return state.loading;
});
