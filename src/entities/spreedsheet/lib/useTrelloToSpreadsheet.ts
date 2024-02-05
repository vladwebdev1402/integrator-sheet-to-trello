import { IFormatedBoard, IFormatedCard, IFormatedList } from "@/shared/types";
import { useAddNewListMutation } from "../service/sheetListExtendApi";
import { useAddNewCardMutation } from "../service/sheetCardExtendApi";
import { searchMissingCards, searchMissingLists } from "@/shared/lib";

export const useTrelloToSpreadsheet = () => {
  const [addNewList, { isLoading: isListLoading }] = useAddNewListMutation();
  const [addNewCard, { isLoading: isCardLoading }] = useAddNewCardMutation();

  const addMissingList = async (
    spreadsheet: IFormatedBoard,
    missingLists: IFormatedList[]
  ) => {
    for (let list of missingLists) {
      const response = await addNewList({
        spreadsheetId: spreadsheet.id,
        name: list.name,
      });
      if ("data" in response)
        spreadsheet.lists.push({
          id: response.data.replies[0].addSheet.properties.sheetId.toString(),
          name: response.data.replies[0].addSheet.properties.title,
        });
    }
  };

  const addMisingCards = async (
    spreadsheet: IFormatedBoard,
    missingCards: IFormatedCard[]
  ) => {
      for (let card of missingCards) {
      const idListInSpreadsheet =
        spreadsheet.lists.find((list) => list.name === card.nameList)?.id ||
        "None";
      await addNewCard({
        countCards: spreadsheet.cards.filter((arrCard) => arrCard.idList === idListInSpreadsheet).length,
        name: card.name,
        sheetId: +idListInSpreadsheet,
        spreadsheetId: spreadsheet.id,
        description: card.description,
      });
      spreadsheet.cards.push({...card, idList: idListInSpreadsheet});
    }
  };

  const trelloToSpreadsheet = async (
    board: IFormatedBoard,
    spreadsheet: IFormatedBoard
  ) => {
    const missingLists = searchMissingLists(board, spreadsheet);
    const missingCards = searchMissingCards(board, spreadsheet);
    await addMissingList(spreadsheet, missingLists);
    await addMisingCards(spreadsheet, missingCards);
  };

  return { trelloToSpreadsheet, isFetching: isListLoading || isCardLoading };
};
