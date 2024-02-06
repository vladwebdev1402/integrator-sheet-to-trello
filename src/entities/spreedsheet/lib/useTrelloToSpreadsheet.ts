import { IFormatedBoard, IFormatedList } from "@/shared/types";
import {
  useAddNewListMutation,
  useDeleteListMutation,
} from "../service/sheetListExtendApi";
import {
  useAddNewCardMutation,
  useDeleteAllCardMutation,
} from "../service/sheetCardExtendApi";
import { searchMissingLists } from "@/shared/lib";

export const useTrelloToSpreadsheet = () => {
  const [addNewList, { isLoading: isListLoading }] = useAddNewListMutation();
  const [addNewCard, { isLoading: isCardLoading }] = useAddNewCardMutation();
  const [deleteCards, { isLoading: isDeleteLoading }] =
    useDeleteAllCardMutation();
  const [deleteList, { isLoading: isDeleteListLoading }] =
    useDeleteListMutation();

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

  const addAllCards = async (
    board: IFormatedBoard,
    spreadsheet: IFormatedBoard
  ) => {
    for (let card of board.cards) {
      const idListInSpreadsheet =
        spreadsheet.lists.find((list) => list.name === card.nameList)?.id ||
        "None";
      await addNewCard({
        countCards: spreadsheet.cards.filter(
          (arrCard) => arrCard.idList === idListInSpreadsheet
        ).length,
        name: card.name,
        sheetId: +idListInSpreadsheet,
        spreadsheetId: spreadsheet.id,
        description: card.description,
      });
      spreadsheet.cards.push({ ...card, idList: idListInSpreadsheet });
    }
  };

  const deleleCreatedList = async (spreadsheet: IFormatedBoard) => {
    if (spreadsheet.cards.filter((card) => card.idList === "0").length === 0) {
      await deleteList({
        sheetId: 0,
        spreadsheetId: spreadsheet.id,
      });
    }
  };

  const deleteAllCards = async (spreadsheet: IFormatedBoard) => {
    for (let list of spreadsheet.lists) {
      await deleteCards({
        spreadsheetId: spreadsheet.id,
        sheetId: +list.id,
      });
    }
    spreadsheet.cards = [];
  };

  const trelloToSpreadsheet = async (
    board: IFormatedBoard,
    spreadsheet: IFormatedBoard,
    isCreate = false
  ) => {
    const missingLists = searchMissingLists(board, spreadsheet);
    await addMissingList(spreadsheet, missingLists);
    await deleteAllCards(spreadsheet);
    await addAllCards(board, spreadsheet);
    if (isCreate) await deleleCreatedList(spreadsheet);
  };

  return {
    trelloToSpreadsheet,
    isFetching:
      isListLoading || isCardLoading || isDeleteLoading || isDeleteListLoading,
  };
};
