"use client";

import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  // is_active: boolean;
  // role: string;
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (thunkAPI) => {
  return fetch("/api/auth/user").then((resp) => {
    if (resp.ok) return resp.json();
    return null;
  });
});

export interface UserState {
  user: User;
}

const sliceName = "user";

const initialState: UserState = {
  user: <User>{},
};

export const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    // toggleMode: (state) => {
    //   switch (state.mode) {
    //     case ThemeModes.Dark:
    //       state.mode = ThemeModes.Light;
    //       break;
    //     case ThemeModes.Light:
    //       state.mode = ThemeModes.Dark;
    //       break;
    //   }
    //   localStorage.setItem(sliceName, state.mode);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const user = action.payload;
      console.log(user);
      
      state.user = user;
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    });
  },
});

// const theme = (state: RootState) => state.theme;
const user = (state: RootState) => state.user;
export const userSelector = createSelector([user], (user) => {
  return { user: user.user, isAuthenticated: !!user.user.pk };
});
// export const isUserAuthenticated = createSelector([user], (user) => !!user.user.pk);
// export const themeModeSelector = createSelector([theme], (theme) => theme.mode);

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
