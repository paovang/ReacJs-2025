import { Action } from "redux";
import { actionTypes } from "../constants/user-action.constants";
import { IUser } from "./user.interface";

export interface FetchUsersAction extends Action {
  type: typeof actionTypes.FETCH_USERS;
  payload: IUser[];
}

export interface FetchUserByIdAction extends Action {
  type: typeof actionTypes.FETCH_USER;
  payload: IUser;
}

export interface UpdateUserAction extends Action {
  type: typeof actionTypes.UPDATE_USER;
  payload: IUser;
}

export interface DeleteUserAction extends Action {
  type: typeof actionTypes.DELETE_USER;
  payload: number;
}

// ✅ Action สำหรับ FETCH_USERS_ERROR
export interface FetchUsersErrorAction extends Action {
  type: typeof actionTypes.FETCH_USERS_ERROR;
  payload: string; // 👈 ต้องเป็นข้อความ error
}

export type UserActionTypes =
  | FetchUsersAction
  | FetchUserByIdAction
  | FetchUsersErrorAction
  | UpdateUserAction
  | DeleteUserAction;
