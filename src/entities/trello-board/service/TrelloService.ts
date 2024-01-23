import { createApi } from "@reduxjs/toolkit/query/react";

import { baseTrelloQuery } from "@/shared/rtk";
import { IBoard } from "@/shared/types";

const TrelloService = createApi({
  reducerPath: "TrelloService",
  baseQuery: baseTrelloQuery,
  endpoints: (build) => ({
    getBoardsMembersById: build.query<string[], string>({
      query: (id) => ({
        url: `/boards/${id}/members`,
        params: {},
      })
    }),

    getBoardById: build.query<IBoard, string>({
      query: (id) => ({
        url: `/boards/${id}`,
        params: {},
      }),
    }),
  }),
});

export { TrelloService };
export const { useGetBoardByIdQuery, useGetBoardsMembersByIdQuery } = TrelloService;
