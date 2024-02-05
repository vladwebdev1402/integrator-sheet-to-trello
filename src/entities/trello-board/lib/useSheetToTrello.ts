import { IFormatedBoard, IFormatedCard, IFormatedList } from "@/shared/types";
import { useCreateListMutation } from "../service/listExtendApi";
import { useAddCardMutation } from "../service/cardExtendApi";
import { searchMissingCards, searchMissingLists } from "@/shared/lib";

export const useSheetToTrello = () => {
  const [addNewList, { isLoading: isListLoading }] = useCreateListMutation();
  const [addNewCard, { isLoading: isCardLoading }] = useAddCardMutation();

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

  const spreadsheetToTrello = async (
    board: IFormatedBoard,
    spreadsheet: IFormatedBoard
  ) => {
    const missingLists = searchMissingLists(spreadsheet, board);
    const missingCards = searchMissingCards(spreadsheet, board);
    await addMissingList(board, missingLists);
    await addMisingCards(board, missingCards);
  };

  return { spreadsheetToTrello, isFetching: isListLoading || isCardLoading };
};
