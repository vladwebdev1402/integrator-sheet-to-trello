import { IBoardCard, IFormatedBoard, IFormatedCard, IFormatedList } from "@/shared/types";
import { useCreateListMutation } from "../service/listExtendApi";
import { useAddCardMutation, useDeleteCardMutation } from "../service/cardExtendApi";
import { searchMissingCards, searchMissingLists } from "@/shared/lib";

export const useSheetToTrello = () => {
  const [addNewList, { isLoading: isListLoading }] = useCreateListMutation();
  const [addNewCard, { isLoading: isCardLoading }] = useAddCardMutation();
  const [deteleCard, {isLoading: isDeleteLoading}] = useDeleteCardMutation();

  const addMissingList = async (
    board: IFormatedBoard,
    missingLists: IFormatedList[]
  ) => {
    for (let list of missingLists) {
      const response = await addNewList({
        idBoard: board.id,
        name: list.name,
      });
      if ("data" in response) board.lists.push({
        id: response.data.id,
        name: response.data.name,
      })
    }
  };

  const addMisingCards = async (
    board: IFormatedBoard,
    missingCards: IFormatedCard[]
  ) => {
    for (let card of missingCards) {

      const idListInTrello = board.lists.find((list) => list.name === card.nameList)?.id || "None";

      await addNewCard({
        idList: idListInTrello,
        name: card.name,
      });
    }
  };

  const deleteCards = async (board: IFormatedBoard, cards: IFormatedCard[]) => {
    for (let card of cards) {
    await deteleCard({...card, idBoard: board.id} as unknown as IBoardCard);
    }
  } 

  const spreadsheetToTrello = async (
    board: IFormatedBoard,
    spreadsheet: IFormatedBoard
  ) => {
    const missingLists = searchMissingLists(spreadsheet, board);
    const missingCards = searchMissingCards(spreadsheet, board);
    const extraCards = searchMissingCards(board, spreadsheet);
    await addMissingList(board, missingLists);
    await addMisingCards(board, missingCards);
    await deleteCards(board, extraCards);
  };

  return { spreadsheetToTrello, isFetching: isListLoading || isCardLoading || isDeleteLoading };
};
