"use client";

import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ThemeMode = "dark" | "light";

export interface ThemeState {
  mode: ThemeMode;
}

const sliceName = "theme";

const initialState: ThemeState = {
  mode: "light",
};

export const themeSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      switch (state.mode) {
        case "dark":
          state.mode = "light";
          break;
        case "light":
          state.mode = "dark";
          break;
      }
      localStorage.setItem(sliceName, state.mode);
    },
  },
});

const theme = (state: RootState) => state.theme;
export const themeModeSelector = createSelector([theme], (theme) => theme.mode);

export const { setMode, toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
