import { IBoard } from "@/shared/types";
import { TrelloService } from "./TrelloService";
import { ICreateBoard } from "./types";


const boardExtendApi = TrelloService.injectEndpoints({
    endpoints: (build) => ({
        createBoard: build.mutation<IBoard, ICreateBoard>({
            query: (params) => ({
                url: `/boards`,
                params: {...params, defaultLists: false},
                method: "POST",
            }),
            invalidatesTags: ["Boards"],
        }),   

        updateBoard: build.mutation<IBoard, IBoard>({
            query: (board) => ({
                url: `/boards/${board.id}`,
                method: "PUT",
                params: {name: board.name, desc: board.desc},
            }),
            onQueryStarted: async (board, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(TrelloService.util.updateQueryData(
                    "getBoardById",
                    board.id,
                    (draft) => Object.assign(draft, board)
                ))
                queryFulfilled.catch(patchResult.undo);
            },
        }),

        deleteBoard: build.mutation<any, string>({
            query: (id) => ({
                url: `/boards/${id}`,
                method: "DELETE",
                params: {},
            }),
            invalidatesTags: ["Boards"],
            transformErrorResponse(error): string {
                if ("originalStatus" in error && error.originalStatus === 404) return "This board not found";
                return "There is not internet connection";
              },
        }),
    }),

});

export const {useCreateBoardMutation, useUpdateBoardMutation, useDeleteBoardMutation} = boardExtendApi;