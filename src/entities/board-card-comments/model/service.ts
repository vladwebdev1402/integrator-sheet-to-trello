import { createApi } from "@reduxjs/toolkit/query/react";

import { baseTrelloQuery } from "@/shared/rtk";
import { ICardComment } from "@/shared/types/ICardComment";

export const TrelloCardCommentsService = createApi({
    reducerPath: "trelloCardCommentsService",
    baseQuery: baseTrelloQuery,
    endpoints : (build) => ({
        getAllComments: build.query<ICardComment[], string>({
            query: (id) => ({
                url: `/cards/${id}/actions`,
                params: {
                    type: "commentCard",
                },
            })
        })    
    }),
})  

export const { useGetAllCommentsQuery } = TrelloCardCommentsService;