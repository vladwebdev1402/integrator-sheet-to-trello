import { IBoardCard, IFormatedBoard, IFormatedList } from "@/shared/types";
import { useCreateListMutation } from "../service/listExtendApi";
import { useAddCardMutation, useDeleteCardMutation } from "../service/cardExtendApi";
import { searchMissingLists } from "@/shared/lib";

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

  const addSpreadsheetCards = async (
    board: IFormatedBoard,
    spreadsheet: IFormatedBoard
  ) => {
    for (let card of spreadsheet.cards) {

      const idListInTrello = board.lists.find((list) => list.name === card.nameList)?.id || "None";

      await addNewCard({
        idList: idListInTrello,
        name: card.name,
        desc: card.description,
      });
    }
  };

  const deleteAllCards = async (board: IFormatedBoard) => {
    for (let card of board.cards) {
    await deteleCard({...card, idBoard: board.id} as unknown as IBoardCard);
    }
  } 

  const spreadsheetToTrello = async (
    board: IFormatedBoard,
    spreadsheet: IFormatedBoard
  ) => {
    const missingLists = searchMissingLists(spreadsheet, board);
    await addMissingList(board, missingLists);
    await deleteAllCards(board);
    await addSpreadsheetCards(board, spreadsheet);
  };

  return { spreadsheetToTrello, isFetching: isListLoading || isCardLoading || isDeleteLoading };
};
