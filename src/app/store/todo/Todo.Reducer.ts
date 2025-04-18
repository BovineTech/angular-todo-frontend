import { createReducer, on } from "@ngrx/store";
import { todoState } from "./Todo.State";
import {
  addTodoSuc,
  deleteTodoSuc,
  getTodo,
  loadTodo,
  loadTodoFail,
  loadTodoSuc,
  updateTodoSuc,
} from "../todo/Todo.Action";
import { state } from "@angular/animations";

const _todoReducer = createReducer(
  todoState,
  on(loadTodo, (state) => {
    return {
      ...state,
      loading: true,  // Set loading to true when fetching todos
    };
  }),
  on(loadTodoSuc, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: "",
      loading: false,
    };
  }),
  on(loadTodoFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errMsg,
      loading: false
    };
  }),
  on(deleteTodoSuc, (state, action) => {
    const _newdata = state.list.filter((o) => o._id != action.todoId);
    return {
      ...state,
      list: _newdata,
      errormessage: "",
    };
  }),
  on(addTodoSuc, (state, action) => {
    const _newdata = { ...action.data };
    return {
      ...state,
      list: [...state.list, _newdata],
      errormessage: "",
      loading: false,
    };
  }),
  on(updateTodoSuc, (state, action) => {
    const _newdata = state.list.map((o) => {
      return o._id === action.data._id ? action.data : o;
    });
    return {
      ...state,
      list: _newdata,
      errormessage: "",
      loading: false,
    };
  }),
  on(getTodo, (state, action) => {
    let _newdata = state.list.find((o) => o._id === action.todoId);
    if (_newdata == null) {
      _newdata = state.todoobj;
    }
    return {
      ...state,
      todoobj: _newdata,
    };
  }),
);

export function todoReducer(state: any, action: any) {
  return _todoReducer(state, action);
}
