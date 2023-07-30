"use client";

import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum ThemeModes {
  Dark = "dark",
  Light = "light",
}

export interface ThemeState {
  mode: ThemeModes;
}

const sliceName = "theme";

const initialState: ThemeState = {
  mode: ThemeModes.Light,
};

export const themeSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ThemeModes>) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      switch (state.mode) {
        case ThemeModes.Dark:
          state.mode = ThemeModes.Light;
          break;
        case ThemeModes.Light:
          state.mode = ThemeModes.Dark;
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
