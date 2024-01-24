import { IBoardList } from "@/shared/types/IBoardList";
import { TrelloService } from "./TrelloService";
import { ICreateList } from "./types";


const listExtendApi = TrelloService.injectEndpoints({
    endpoints: (build) => ({
        createList: build.mutation<IBoardList, ICreateList>({
            query: ({idBoard, name}) => ({
                url: `/boards/${idBoard}/lists`,
                method: "POST",
                params: {name, pos: "bottom"},
            }),
            invalidatesTags: ["Board-List"],
        }),
    }),
})

export const { useCreateListMutation } = listExtendApi; 