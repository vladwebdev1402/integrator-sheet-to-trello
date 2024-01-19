import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit"
import { AuthGoogleReducer } from "@/entities/user-google";
import { AuthTrelloReducer } from "@/entities/user-trello";
import { SheetsListService } from "@/entities/list-of-sheets";
import { SpreadSheetService } from "@/entities/spreedsheet";

const reducers = combineReducers({
  AuthGoogleReducer,
  AuthTrelloReducer,
  [SheetsListService.reducerPath]: SheetsListService.reducer,
  [SpreadSheetService.reducerPath]: SpreadSheetService.reducer,
})

export const rootStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(SheetsListService.middleware, SpreadSheetService.middleware),
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
