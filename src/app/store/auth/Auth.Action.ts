import { createAction, props } from '@ngrx/store';
import { User } from "../../model/User";

const REGISTER_USER = '[Auth] Register User';
const REGISTER_USER_SUCCESS = '[Auth] Register User Success';
const REGISTER_USER_FAILURE = '[Auth] Register User Failure';

const LOGIN_USER = '[Auth] Login User';
const LOGIN_USER_SUCCESS = '[Auth] Login User Success';
const LOGIN_USER_FAILURE = '[Auth] Login User Failure';

const GET_USER = '[Auth] get User';
const GET_USER_SUCCESS = '[Auth] get User Success';
const GET_USER_FAILURE = '[Auth] get User Failure';

export const registerUser = createAction(REGISTER_USER, props<User>());

export const registerUserSuccess = createAction(REGISTER_USER_SUCCESS, props<any>());

export const registerUserFailure = createAction(REGISTER_USER_FAILURE, props<{ error: string }>());

export const loginUser = createAction(LOGIN_USER, props<User>());

export const loginUserSuccess = createAction(LOGIN_USER_SUCCESS, props<any>());

export const loginUserFailure = createAction(LOGIN_USER_FAILURE, props<{ error: string }>());

export const getUser = createAction(GET_USER, props<User>());

export const getUserSuccess = createAction(GET_USER_SUCCESS, props<any>());

export const getUserFailure = createAction(GET_USER_FAILURE, props<{ error: string }>());

export const emptyAction = createAction('empty')
