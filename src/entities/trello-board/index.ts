import { TrelloService } from "./service/TrelloService";
import BoardCard from "./ui/BoardCard";

import {
  useGetAllBoardQuery,
  useGetBoardByIdQuery,
  useGetAllListByBoardIdQuery,
  useGetAllCardsByListIdQuery,
} from "./service/TrelloService";
import {
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} from "./service/boardExtendApi";

import {
  useCreateListMutation,
  useUpdateListMutation,
} from "./service/listExtendApi";

import { useAddCardMutation } from "./service/cardExtendApi";

export {
  useGetAllBoardQuery,
  useGetAllListByBoardIdQuery,
  useGetBoardByIdQuery,
  useGetAllCardsByListIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useCreateListMutation,
  useUpdateListMutation,
  useAddCardMutation,
  TrelloService,
  BoardCard,
};
