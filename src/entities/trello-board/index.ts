import { TrelloService } from "./service/TrelloService";
import TrelloCard from "./ui/TrelloCard";

import {
  useGetAllBoardQuery,
  useGetBoardByIdQuery,
  useGetAllListByBoardIdQuery,
  useGetAllCardsByListIdQuery,
  useGetAllCardsByBoardIdQuery,
  useLazyGetBoardByIdQuery,
  useLazyGetAllCardsByBoardIdQuery,
  useLazyGetAllListByBoardIdQuery,
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

import {
  useAddCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} from "./service/cardExtendApi";

import { useGetAllBoardInfo } from "./lib/useGetAllBoardInfo";

export {
  useGetAllBoardQuery,
  useGetAllListByBoardIdQuery,
  useGetBoardByIdQuery,
  useGetAllCardsByListIdQuery,
  useGetAllCardsByBoardIdQuery,
  useLazyGetBoardByIdQuery,
  useLazyGetAllCardsByBoardIdQuery,
  useLazyGetAllListByBoardIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useCreateListMutation,
  useUpdateListMutation,
  useAddCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
  TrelloService,
  TrelloCard,
  useGetAllBoardInfo,
};
