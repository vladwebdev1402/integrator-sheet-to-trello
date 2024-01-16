import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../api/AuthApi";

export const authGoogleWithCode = createAsyncThunk(
  "auth/getTokenWithCode",
  async (code: string, thunkAPI) => {
    const response = await AuthApi.getToken(code);
    return response.data;
  }
);

export const getGoogleUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (thunkAPI) => {
    const response = await AuthApi.getUserInfo();
    return response;
  }
);

export const logoutGoogle = createAsyncThunk("auth/logout", async (thunkAPI) => {
  await AuthApi.logout();
});
