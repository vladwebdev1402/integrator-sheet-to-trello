import { createSlice } from "@reduxjs/toolkit";
import { IGoogleUser } from "./types";
import { authGoogleWithCode, getGoogleUserInfo, logoutGoogle } from "./actionCreator";

import { TokenService } from "@/shared/api";

interface IState {
  isLoading: boolean;
  isAuth: boolean;
  error: string;
  user: IGoogleUser | null;
}

const initialState: IState = {
  isLoading: false,
  isAuth: false,
  error: "",
  user: null,
};

const AuthGoogleSlice = createSlice({
  name: "AuthGoogleSlice",
  initialState,
  reducers: {
    checkGoogleAuth: (state) => {
      state.isAuth = TokenService.checkToken();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authGoogleWithCode.pending, (state, payload) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(authGoogleWithCode.fulfilled, (state, action) => {
      state.isLoading = false;
      TokenService.setToken(action.payload.access_token);
      TokenService.setRefreshToken(action.payload.refresh_token);
      state.isAuth = true;
      state.error = "";
    });

    builder.addCase(authGoogleWithCode.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "There is no internet connection"
    });

    builder.addCase(getGoogleUserInfo.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(getGoogleUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.user = {
        avatar: action.payload.picture,
        username: action.payload.name,
        gmail: action.payload.email,
      };
    });

    builder.addCase(getGoogleUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      TokenService.removeToken();
      state.error = action.payload || "There is no internet connection";
      state.user = null;
    });

    builder.addCase(logoutGoogle.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(logoutGoogle.fulfilled, (state) => {
      state.isLoading = false;
      state.error = "";
      TokenService.removeToken();
      state.isAuth = false;
      state.user = null;
    });
    builder.addCase(logoutGoogle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "There is no internet connection";
    });
  },
});

export default AuthGoogleSlice.reducer;

export const { checkGoogleAuth } = AuthGoogleSlice.actions;
