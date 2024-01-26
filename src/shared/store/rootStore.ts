import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { AuthGoogleReducer } from "@/entities/user-google";
import { AuthTrelloReducer } from "@/entities/user-trello";
import { SpreadSheetService } from "@/entities/spreedsheet";
import { TrelloService } from "@/entities/trello-board";
import { TrelloCardCommentsService } from "@/entities/board-card-comments";
import { TrelloMembersService } from "@/entities/board-card-members";

const reducers = combineReducers({
  AuthGoogleReducer,
  AuthTrelloReducer,
  [SpreadSheetService.reducerPath]: SpreadSheetService.reducer,
  [TrelloService.reducerPath]: TrelloService.reducer,
  [TrelloCardCommentsService.reducerPath]: TrelloCardCommentsService.reducer,
  [TrelloMembersService.reducerPath]: TrelloMembersService.reducer,
});

export const rootStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      SpreadSheetService.middleware,
      TrelloService.middleware,
      TrelloCardCommentsService.middleware,
      TrelloMembersService.middleware,
    ),
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
