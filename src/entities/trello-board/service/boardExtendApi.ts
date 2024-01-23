import { IBoard } from "@/shared/types";
import { TrelloService } from "./TrelloService";
import { ICreateBoard } from "./types";


const boardExtendApi = TrelloService.injectEndpoints({
    endpoints: (build) => ({
        createBoard: build.mutation<IBoard, ICreateBoard>({
            query: (params) => ({
                url: `/boards`,
                params: {...params},
                method: "POST",
            }),
            invalidatesTags: ["Boards"],
        }),    
    }),

});

export const {useCreateBoardMutation} = boardExtendApi;