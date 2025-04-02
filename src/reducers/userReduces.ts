import { actionTypes } from "../constants/user-action.constants";
import { UserActionTypes } from "../interfaces/user-action.interface";
import { IUser } from "../interfaces/user.interface";

const initialState: {
  users: IUser[];
  currentUser: IUser;
  error: string | null;
} = {
  users: [],
  currentUser: {
    name: "",
    email: "",
    phone_number: "",
  },
  error: null,
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.FETCH_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.FETCH_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case actionTypes.CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === (action.payload as IUser).id
            ? (action.payload as IUser)
            : user
        ),
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) =>
          user.id !== (action.payload as IUser).id
            ? (action.payload as IUser)
            : user
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
