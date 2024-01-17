import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../api/AuthApi";
import { IUserInfoReponse } from "../api/types";

export const getTrelloUserInfo = createAsyncThunk<
  IUserInfoReponse,
  any,
  { rejectValue: string }
>("auth/getTrelloUserInfo", async (args, thunkAPI) => {
  try {
    const response = await AuthApi.getUserInfo();
    return response;
  } catch {
    return thunkAPI.rejectWithValue(
      "An error occurred during authorization. Please re-authorize."
    );
  }
});

export const logoutTrello = createAsyncThunk<any, any, { rejectValue: string }>(
  "auth/logoutTrello",
  async (args, thunkAPI) => {
    try {
      await AuthApi.logout();
    } catch {
      return thunkAPI.rejectWithValue(
        "An error occurred when logging out of the profile. Please reload the page and try again."
      );
    }
  }
);
