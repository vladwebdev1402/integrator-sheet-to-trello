import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit"
import { AuthGoogleReducer } from "@/entities/user-google";
const reducers = combineReducers({
  AuthGoogleReducer
})

export const rootStore = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
