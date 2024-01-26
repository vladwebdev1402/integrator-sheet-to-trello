import { IBoardList } from "@/shared/types/IBoardList";
import { TrelloService } from "./TrelloService";
import { ICreateList } from "./types";

const listExtendApi = TrelloService.injectEndpoints({
  endpoints: (build) => ({
    createList: build.mutation<IBoardList, ICreateList>({
      query: ({ idBoard, name }) => ({
        url: `/boards/${idBoard}/lists`,
        method: "POST",
        params: { name, pos: "bottom" },
      }),
      invalidatesTags: ["Board-List"],
    }),

    updateList: build.mutation<IBoardList, IBoardList>({
      query: (list) => ({
        url: `/lists/${list.id}`,
        params: { 
            name: list.name,
            pos: list.pos,
            closed: list.closed,
         },
        method: "PUT",
      }),
      onQueryStarted(list, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          TrelloService.util.updateQueryData(
            "getAllListByBoardId",
            list.idBoard,
            (draft) => {
                const oldList = draft.filter((arrList) => arrList.id === list.id)[0];
                const oldPos = oldList.pos;
                Object.assign(oldList, list); 
                if (oldPos !== list.pos) draft.sort((a, b) => a.pos - b.pos);
            },
          ),
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const { useCreateListMutation, useUpdateListMutation } = listExtendApi;
