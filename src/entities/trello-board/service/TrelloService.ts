import { createApi } from "@reduxjs/toolkit/query/react";

import { baseTrelloQuery } from "@/shared/rtk";
import { IBoard, IBoardCard } from "@/shared/types";
import { TokenService } from "@/shared/api";
import { IBoardList } from "@/shared/types/IBoardList";

const TrelloService = createApi({
  reducerPath: "TrelloService",
  baseQuery: baseTrelloQuery,
  tagTypes: ["Boards", "Board", "Board-List", "Board-Card"],
  endpoints: (build) => ({
    getBoardsMembersById: build.query<string[], string>({
      query: (id) => ({
        url: `/boards/${id}/members`,
        params: {},
      }),
    }),

    getAllBoard: build.query<{ idBoards: string[] }, any>({
      query: () => ({
        url: `/tokens/${TokenService.getTrelloToken()}/member`,
        params: {},
      }),
      providesTags: ["Boards"],
    }),

    getBoardById: build.query<IBoard, string>({
      query: (id) => ({
        url: `/boards/${id}`,
        params: {},
      }),
      transformErrorResponse(error): string {
        if ("originalStatus" in error && error.originalStatus === 404)
          return "This board not found";
        return "There is not internet connection";
      },
    }),

    getAllListByBoardId: build.query<IBoardList[], string>({
      query: (id) => ({
        url: `/boards/${id}/lists`,
        params: {
          filter: "all",
        },
      }),
      providesTags: ["Board-List"],
      transformResponse(baseQueryReturnValue: IBoardList[], meta, arg) {
        return baseQueryReturnValue.sort((a, b) => a.pos - b.pos);
      },
    }),

    getAllCardsByBoardId: build.query<IBoardCard[], string>({
      query: (id) => ({
        url: `/boards/${id}/cards`,
        params: {},
      }),
      providesTags: ["Board-Card"],
      transformResponse(baseQueryReturnValue: IBoardCard[], meta, arg) {
        return baseQueryReturnValue.sort((a, b) => a.pos - b.pos);
      },
    }),

    getAllCardsByListId: build.query<IBoardCard[], string>({
      query: (id) => ({
        url: `/lists/${id}/cards`,
        params: {},
      }),
    }),
  }),
});

export { TrelloService };
export const {
  useGetAllBoardQuery,
  useGetAllCardsByBoardIdQuery,
  useGetAllCardsByListIdQuery,
  useGetBoardByIdQuery,
  useGetBoardsMembersByIdQuery,
  useGetAllListByBoardIdQuery,
  useLazyGetBoardByIdQuery,
  useLazyGetAllCardsByBoardIdQuery,
  useLazyGetAllListByBoardIdQuery
} = TrelloService;
