import { TrelloService } from "./TrelloService";
import { ICreateCard } from "./types";
import { IBoardCard } from "@/shared/types";

const cardExtendApi = TrelloService.injectEndpoints({
  endpoints: (build) => ({
    addCard: build.mutation<IBoardCard, ICreateCard>({
      query: ({ name, idList }) => ({
        url: `/cards`,
        method: "POST",
        params: { name, idList, pos: "bottom" },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data: createdCard } = await queryFulfilled;

          dispatch(
            TrelloService.util.updateQueryData(
              "getAllCardsByBoardId",
              createdCard.idBoard,
              (draft) => {
                draft.push(createdCard);
              }
            )
          );
        } catch {}
      },
    }),
  }),
});

export const { useAddCardMutation } = cardExtendApi;
