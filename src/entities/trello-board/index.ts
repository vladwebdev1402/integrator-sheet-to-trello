import { TrelloService } from "./service/TrelloService";
import TrelloCard from "./ui/TrelloCard";

import {
  useGetAllBoardQuery,
  useGetBoardByIdQuery,
  useGetAllListByBoardIdQuery,
  useGetAllCardsByListIdQuery,
  useGetAllCardsByBoardIdQuery,
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
  useGetAllCardsByBoardIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useCreateListMutation,
  useUpdateListMutation,
  useAddCardMutation,
  TrelloService,
  TrelloCard,
};
