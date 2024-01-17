import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../api/AuthApi";
import { IResponseUserInfo, ITokenResponse } from "../api/types";

export const authGoogleWithCode = createAsyncThunk<
  ITokenResponse,
  any,
  { rejectValue: string }
>("auth/getTokenWithCode", async (code: string, thunkAPI) => {
  try {
    const response = await AuthApi.getToken(code);
    return response.data;
  } catch {
    return thunkAPI.rejectWithValue(
      "An error occurred during authorization. Please re-authorize."
    );
  }
});

export const getGoogleUserInfo = createAsyncThunk<
  IResponseUserInfo,
  any,
  { rejectValue: string }
>("auth/getUserInfo", async (args, thunkAPI) => {
  try {
    const response = await AuthApi.getUserInfo();
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      "An error occurred during authorization. Please re-authorize."
    );
  }
});

export const logoutGoogle = createAsyncThunk<any, any, { rejectValue: string }>(
  "auth/logoutGoogle",
  async (args, thunkAPI) => {
    try {
      return await AuthApi.logout();
    } catch {
      return thunkAPI.rejectWithValue(
        "An error occurred when logging out of the profile. Please reload the page and try again."
      );
    }
  }
);
