import { useCallback } from "react";
import {
  useLazyGetAllCardsByBoardIdQuery,
  useLazyGetAllListByBoardIdQuery,
  useLazyGetBoardByIdQuery,
} from "../service/TrelloService";

export const useGetAllBoardInfo = (id: string) => {
  const [getBoard, { isFetching: boardLoading, isError: boardError }] =
    useLazyGetBoardByIdQuery();
  const [getLists, { isFetching: listsLoading, isError: listsError }] =
    useLazyGetAllListByBoardIdQuery();
  const [getCards, { isFetching: cardsLoading, isError: cardsError }] =
    useLazyGetAllCardsByBoardIdQuery();

  const getAllBoardInfo = useCallback(async () => {
    const { data: board } = await getBoard(id);
    const { data: lists } = await getLists(id);
    const { data: cards } = await getCards(id);
    return { board, lists, cards };
  }, [id, getBoard, getLists, getCards]);

  return {
    getAllBoardInfo,
    isFetching: boardLoading || listsLoading || cardsLoading,
    isError: boardError || listsError || cardsError,
  };
};
