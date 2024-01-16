import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";
import { authGoogleWithCode, getGoogleUserInfo, logoutGoogle } from "./actionCreator";

import { TokenService } from "@/shared/api";

interface IState {
  isLoading: boolean;
  isAuth: boolean;
  error: string;
  user: IUser | null;
}

const initialState: IState = {
  isLoading: false,
  isAuth: false,
  error: "",
  user: null,
};

const AuthGoogleSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    checkGoogleAuth: (state) => {
      state.isAuth = TokenService.checkToken();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authGoogleWithCode.pending, (state, payload) => {
      state.isLoading = true;
    });

    builder.addCase(authGoogleWithCode.fulfilled, (state, action) => {
      state.isLoading = false;
      TokenService.setToken(action.payload.access_token);
      state.isAuth = true;
    });

    builder.addCase(getGoogleUserInfo.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getGoogleUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {
        avatar: action.payload.picture,
        username: action.payload.name,
        gmail: action.payload.email,
      };
    });

    builder.addCase(getGoogleUserInfo.rejected, (state) => {
      state.isLoading = false;
    })

    builder.addCase(logoutGoogle.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(logoutGoogle.fulfilled, (state) => {
      state.isLoading = false;
      TokenService.removeToken();
      state.isAuth = false;
      state.user = null;
    });
  },
});

export default AuthGoogleSlice.reducer;

export const { checkGoogleAuth } = AuthGoogleSlice.actions;
