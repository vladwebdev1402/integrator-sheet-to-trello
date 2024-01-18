import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit"
import { AuthGoogleReducer } from "@/entities/user-google";
import { AuthTrelloReducer } from "@/entities/user-trello";
import { SheetsListService } from "@/entities/sheet-list";

const reducers = combineReducers({
  AuthGoogleReducer,
  AuthTrelloReducer,
  [SheetsListService.reducerPath]: SheetsListService.reducer,
})

export const rootStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(SheetsListService.middleware),
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
