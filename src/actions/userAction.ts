import { ThunkAction } from "redux-thunk";
import { actionTypes } from "../constants/user-action.constants";
import { UserActionTypes } from "../interfaces/user-action.interface";
import { RootState } from "../store";
import axios from "axios";
import { IUser } from "../interfaces/user.interface";

const apiUrl = "https://67e656b06530dbd3110f8cd8.mockapi.io/pao/users";

export const fetchUsers =
  (): ThunkAction<void, RootState, unknown, UserActionTypes> =>
  async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}`);
      dispatch({
        type: actionTypes.FETCH_USERS,
        payload: response.data,
      });
    } catch (error: unknown) {
      dispatch({
        type: actionTypes.FETCH_USERS_ERROR,
        payload: error instanceof Error ? error.message : "Unknown error", // 👈 `payload` เป็น `string`
      });
    }
  };

export const fetchUser =
  (id: number): ThunkAction<void, RootState, unknown, UserActionTypes> =>
  async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      dispatch({
        type: actionTypes.FETCH_USER,
        payload: response.data,
      });
    } catch (error: unknown) {
      dispatch({
        type: actionTypes.FETCH_USERS_ERROR,
        payload: error instanceof Error ? error.message : "Unknown error", // 👈 `payload` เป็น `string`
      });
    }
  };

export const createUser =
  (user: IUser): ThunkAction<void, RootState, unknown, UserActionTypes> =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}`, user);
      dispatch({
        type: actionTypes.CREATE_USER,
        payload: response.data,
      });
      return { success: true };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return { success: false, message };
    }
  };

export const updateUser =
  (user: IUser): ThunkAction<void, RootState, unknown, UserActionTypes> =>
  async (dispatch) => {
    try {
      const response = await axios.put(`${apiUrl}/${user.id}`, user);
      dispatch({
        type: actionTypes.UPDATE_USER,
        payload: response.data,
      });
      return { success: true };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return { success: false, message };
    }
  };

export const deleteUser =
  (userId: number): ThunkAction<void, RootState, unknown, UserActionTypes> =>
  async (dispatch) => {
    try {
      await axios.delete(`${apiUrl}/${userId}`);
      dispatch({
        type: actionTypes.DELETE_USER,
        payload: userId,
      });
      return { success: true };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return { success: false, message };
    }
  };
