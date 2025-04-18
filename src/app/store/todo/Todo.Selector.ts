import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoModel } from "./Todo.Model";

const getTodoState = createFeatureSelector<TodoModel>("todo");

export const getTodoList = createSelector(getTodoState, (state) => {
  return state.list;
});

export const selectTodo = createSelector(getTodoState, (state) => {
  return state.todoobj;
});

export const getTodoLoading = createSelector(getTodoState, (state) => {
  return state.loading;  // Get loading status from the state
});
