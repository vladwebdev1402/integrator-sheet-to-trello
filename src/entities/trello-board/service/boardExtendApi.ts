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
        updateBoard: build.mutation<IBoard, IBoard>({
            query: (params) => ({
                url: `/boards/${params.id}`,
                method: "PUT",
                params: {name: params.name, desc: params.desc},
            }),
            onQueryStarted: async (board, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(TrelloService.util.updateQueryData(
                    "getBoardById",
                    board.id,
                    (draft) => Object.assign(draft, board)
                ))
                queryFulfilled.catch(patchResult.undo);
            },
        })
    }),

});

export const {useCreateBoardMutation, useUpdateBoardMutation} = boardExtendApi;