import { createAction, props } from "@ngrx/store";
import { Todo } from "../../model/Todo";

export const LOAD_TODO = '[todo] getall'
export const LOAD_TODO_SUCCESS = 'todo getall suc'
export const LOAD_TODO_FAIL = 'todo getall fail'

export const DELETE_TODO = '[todo] delete'
export const DELETE_TODO_SUCC = '[todo] delete succ'

export const ADD_TODO = '[todo] add'
export const ADD_TODO_SUCC = '[todo] add succ'

export const UPDATE_TODO = '[todo] update'
export const UPDATE_TODO_SUCC = '[todo] update succ'

export const GET_TODO = '[todo] get todo'


export const loadTodo = createAction(LOAD_TODO)
export const loadTodoSuc = createAction(LOAD_TODO_SUCCESS, props<{ list: Todo[] }>())
export const loadTodoFail = createAction(LOAD_TODO_FAIL, props<{ errMsg: string }>())

export const deleteTodo = createAction(DELETE_TODO,props<{todoId:string}>())
export const deleteTodoSuc = createAction(DELETE_TODO_SUCC, props<{ todoId:string }>())

export const addTodo = createAction(ADD_TODO,props<{data:Todo}>())
export const addTodoSuc = createAction(ADD_TODO_SUCC, props<{ data:Todo }>())

export const updateTodo = createAction(UPDATE_TODO,props<{data:Todo}>())
export const updateTodoSuc = createAction(UPDATE_TODO_SUCC, props<{ data:Todo }>())

export const getTodo = createAction(GET_TODO,props<{todoId:string}>())

export const emptyAction = createAction('empty')
