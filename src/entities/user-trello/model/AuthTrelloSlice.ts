import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITrelloUser } from "./types";
import { TokenService } from "@/shared/api";
import { getTrelloUserInfo, logoutTrello } from "./actionCreator";

interface IState {
  isLoading: boolean;
  error: string;
  user: null | ITrelloUser;
  isAuth: boolean;
}

const initialState: IState = {
  isLoading: false,
  error: "",
  user: null,
  isAuth: false,
};

const AuthTrelloSlice = createSlice({
  name: "AuthTrelloSlice",
  initialState,
  reducers: {
    saveTrelloToken: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      TokenService.setTrelloToken(action.payload);
    },

    checkTrelloAuth: (state) => {
      state.isAuth = TokenService.checkTrelloToken();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTrelloUserInfo.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(getTrelloUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      const { avatarUrl, bio, fullName, id, idBoards } = action.payload;
      state.user = {
        id,
        avatar: avatarUrl,
        username: fullName,
        boards: idBoards,
        bio,
      };
    });

    builder.addCase(getTrelloUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "There is no internet connection";
    });

    builder.addCase(logoutTrello.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(logoutTrello.fulfilled, (state, action) => {
      state.isAuth = false;
      state.user = null;
      state.isLoading = false;
      TokenService.removeTrelloToken();
    });
    builder.addCase(logoutTrello.rejected, (state, action) => {
      state.isLoading = false;
      TokenService.removeTrelloToken();
      state.error = action.payload || "There is no internet connection";
    });
  },
});

export default AuthTrelloSlice.reducer;

export const { saveTrelloToken, checkTrelloAuth } = AuthTrelloSlice.actions;
