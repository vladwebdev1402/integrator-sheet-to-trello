import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../api/AuthApi";

export const getTrelloUserInfo = createAsyncThunk(
  "auth/getTrelloUserInfo",
  async (thunkAPI) => {
    const response = await AuthApi.getUserInfo();
    return response;
  }
);

export const logoutTrello = createAsyncThunk(
  "auth/logoutTrello",
  async (thunkAPI) => {
    await AuthApi.logout();
  }
);
