import { IFormatedBoard, IFormatedCard, IFormatedList } from "@/shared/types";
import { useAddNewListMutation, useDeleteListMutation } from "../service/sheetListExtendApi";
import {
  useAddNewCardMutation,
  useDeleteCardMutation,
} from "../service/sheetCardExtendApi";
import { searchMissingCards, searchMissingLists } from "@/shared/lib";

export const useTrelloToSpreadsheet = () => {
  const [addNewList, { isLoading: isListLoading }] = useAddNewListMutation();
  const [addNewCard, { isLoading: isCardLoading }] = useAddNewCardMutation();
  const [deleteCard, { isLoading: isDeleteLoading }] = useDeleteCardMutation();
  const [deleteList, {isLoading: isDeleteListLoading}] = useDeleteListMutation();

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

  const deleteExtraCards = async (
    spreadsheet: IFormatedBoard,
    cards: IFormatedCard[]
  ) => {
    for (let card of cards) {
      const listCards = spreadsheet.cards.filter(
        (arrCard) => arrCard.nameList === card.nameList
      );
      const idx = listCards.findIndex((arrCard) => arrCard.name === card.name);

      await deleteCard({
        spreadsheetId: spreadsheet.id,
        sheetId: +card.idList,
        idx,
      });

      spreadsheet.cards.filter((arrCard) => arrCard.name !== card.name && arrCard.nameList === card.name);
    }
  };

  const deleleCreatedList = async (spreadsheet: IFormatedBoard) => {
    if (spreadsheet.cards.filter((card) => card.idList === '0').length === 0) {
      await deleteList({
        sheetId: 0,
        spreadsheetId: spreadsheet.id,
      })
    }
  }

  const trelloToSpreadsheet = async (
    board: IFormatedBoard,
    spreadsheet: IFormatedBoard,
    isCreate=false,
  ) => {
    const missingLists = searchMissingLists(board, spreadsheet);
    const missingCards = searchMissingCards(board, spreadsheet);
    const extraCards = searchMissingCards(spreadsheet, board);
    await addMissingList(spreadsheet, missingLists);
    await addMisingCards(spreadsheet, missingCards);
    await deleteExtraCards(spreadsheet, extraCards);
    if (isCreate) await deleleCreatedList(spreadsheet);
  };

  return {
    trelloToSpreadsheet,
    isFetching: isListLoading || isCardLoading || isDeleteLoading || isDeleteListLoading,
  };
};
