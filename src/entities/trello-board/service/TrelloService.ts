import { createApi } from "@reduxjs/toolkit/query/react";

import { baseTrelloQuery } from "@/shared/rtk";
import { IBoard } from "@/shared/types";
import { TokenService } from "@/shared/api";

const TrelloService = createApi({
  reducerPath: "TrelloService",
  baseQuery: baseTrelloQuery,
  tagTypes: ["Boards", "Board", "Board-List", "Board-Card"],
  endpoints: (build) => ({
    getBoardsMembersById: build.query<string[], string>({
      query: (id) => ({
        url: `/boards/${id}/members`,
        params: {},
      })
    }),

    getAllBoard: build.query<{idBoards: string[]}, any >({
      query: () => ({
        url: `/tokens/${TokenService.getTrelloToken()}/member`,
        params: {},
      }),
      providesTags: ["Boards"]
    }),

    getBoardById: build.query<IBoard, string>({
      query: (id) => ({
        url: `/boards/${id}`,
        params: {},
      }),
      transformErrorResponse(error): string {
        if ("originalStatus" in error && error.originalStatus === 404) return "This board not found";
        return "There is not internet connection";
      },
    }),
  }),
});

export { TrelloService };
export const { useGetAllBoardQuery, useGetBoardByIdQuery, useGetBoardsMembersByIdQuery } = TrelloService;
