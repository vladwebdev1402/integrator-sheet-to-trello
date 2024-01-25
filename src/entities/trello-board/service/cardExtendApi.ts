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

    updateCard: build.mutation<IBoardCard, IBoardCard>({
      query: (card) => ({
        url: `/cards/${card.id}`,
        params: {
          name: card.name,
          pos: card.pos,
          desc: card.desc,
        },
        method: "PUT",
      }),
      onQueryStarted(card, {dispatch, queryFulfilled}) {
        const resultPatch = dispatch(TrelloService.util.updateQueryData(
          "getAllCardsByBoardId",
          card.idBoard,
          (draft) => {
            const oldCard = draft.filter((arrCard) => arrCard.id === card.id)[0];
            Object.assign(oldCard, card);
          },
        ));
        queryFulfilled.catch(resultPatch.undo) 
      },
    }),

    deleteCard: build.mutation<number, IBoardCard>({
      query: (card) => ({
        url: `/cards/${card.id}`,
        params: {},
        method: "DELETE",
      }),
      onQueryStarted(card, {dispatch, queryFulfilled}) {
        const resultPatch = dispatch(TrelloService.util.updateQueryData(
          "getAllCardsByBoardId",
          card.idBoard,
          (draft) => {
            const idx = draft.findIndex((arrCard) => arrCard.id === card.id);
            draft.splice(idx, 1);
          },
        ));
        queryFulfilled.catch(resultPatch.undo) 
      },
    })
  }),
});

export const { useAddCardMutation, useUpdateCardMutation, useDeleteCardMutation } = cardExtendApi;
