import { baseTrelloQuery } from "@/shared/rtk";
import { ITrelloMember } from "@/shared/types/ITrelloMember";
import { createApi } from "@reduxjs/toolkit/query/react";

export const TrelloMembersService = createApi({
  reducerPath: "TrelloMembersService",
  baseQuery: baseTrelloQuery,
  endpoints: (build) => ({
    getlAllMembers: build.query<ITrelloMember[], string>({
      query: (id) => ({
        url: `/cards/${id}/members`,
        params: {},
      }),
    }),
  }),
});

export const { useGetlAllMembersQuery } = TrelloMembersService;
