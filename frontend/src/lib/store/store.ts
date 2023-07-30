"use client"
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { themeSlice } from "./features/themeSlice";
import { userSlice } from "./features/userSice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    user: userSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
