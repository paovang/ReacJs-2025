import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { IUser, IUserState } from "../interfaces/user.interface";

const apiUrl = "https://67e656b06530dbd3110f8cd8.mockapi.io/pao/users";

export const fetchUsers = createAsyncThunk<
  IUser[],
  { page: number; limit: number }
>("user/fetchUsers", async ({ page, limit }) => {
  const response = await axios.get(apiUrl, {
    params: {
      page,
      limit,
    },
  });
  return response.data;
});

export const fetchUser = createAsyncThunk<IUser, number>(
  "user/fetchUser",
  async (id: number) => {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  }
);

export const createUser = createAsyncThunk<IUser, IUser>(
  "user/createUser",
  async (user: IUser) => {
    const response = await axios.post(apiUrl, user);
    return response.data;
  }
);

export const updateUser = createAsyncThunk<IUser, IUser>(
  "user/updateUser",
  async (user: IUser) => {
    const response = await axios.put(`${apiUrl}/${user.id}`, user);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk<IUser, number>(
  "user/deleteUser",
  async (userId: number) => {
    const response = await axios.delete(`${apiUrl}/${userId}`);
    return response.data;
  }
);

// Initial state
const initialState: IUserState = {
  users: [] as IUser[],
  currentUser: null as IUser | null, // Set initial state to null
  error: null,
  loading: false,
  pagination: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50],
  },
};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updatePagination: (
      state,
      action: PayloadAction<{ currentPage: number; pageSize: number }>
    ) => {
      state.pagination.currentPage = action.payload.currentPage;
      state.pagination.pageSize = action.payload.pageSize;
    },
  },
  extraReducers: (builder) => {
    // Using addMatcher to handle common logic for pending, fulfilled, and rejected
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action: PayloadAction<IUser[] | IUser>) => {
          state.loading = false;
          if (action.type.includes("user/fetchUsers")) {
            state.users = action.payload as IUser[];
            state.pagination.total = 24;
          }
          if (action.type.includes("user/fetchUser")) {
            state.currentUser = action.payload as IUser;
          }
          if (action.type.includes("user/createUser")) {
            state.users.push(action.payload as IUser); // Add new user
          }
          if (action.type.includes("user/updateUser")) {
            state.users = state.users.map((user) =>
              user.id === (action.payload as IUser).id
                ? (action.payload as IUser)
                : user
            );
            state.currentUser = action.payload as IUser; // Update current user if needed
          }
          if (action.type.includes("user/deleteUser")) {
            state.users = state.users.filter(
              (user) => user.id !== (action.payload as IUser).id
            );
          }
        }
      )
      .addMatcher(
        (action) => action.type.includes("/rejected"),
        (state, action) => {
          state.loading = false;
          const errorMessage =
            (action.error as SerializedError)?.message ?? "An error occurred";
          state.error = errorMessage;
        }
      );
  },
});

export const { reducer } = userSlice;
export const { updatePagination } = userSlice.actions;
export default reducer;
