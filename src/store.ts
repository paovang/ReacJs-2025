import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // devTools: process.env.NODE_EN === 'development'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
