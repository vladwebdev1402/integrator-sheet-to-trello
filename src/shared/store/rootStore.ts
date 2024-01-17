import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit"
import { AuthGoogleReducer } from "@/entities/user-google";
import { AuthTrelloReducer } from "@/entities/user-trello";
const reducers = combineReducers({
  AuthGoogleReducer,
  AuthTrelloReducer,
})

export const rootStore = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
