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
      invalidatesTags: ["Board-Card"],
    }),
  }),
});

export const {useAddCardMutation} = cardExtendApi;
