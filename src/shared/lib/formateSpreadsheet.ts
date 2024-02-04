import {
  CSheetCard,
  IFormatedBoard,
  IFormatedCard,
  ISpreedsheet,
} from "../types";

const formateCards = (
  cards: CSheetCard[],
  sheetId: number
): IFormatedCard[] => {
  return cards
    .filter((card) => card.sheetId === sheetId)
    .map((card) => ({
      name: card.title,
      description: card.description,
    }));
};

export const formateSpreadsheet = (
  spreadsheet: ISpreedsheet,
  cards: CSheetCard[]
): IFormatedBoard => {
  return {
    id: spreadsheet.spreadsheetId,
    name: spreadsheet.properties.title,
    lists: spreadsheet.sheets.map((sheet) => ({
      id: sheet.properties.sheetId.toString(),
      name: sheet.properties.title,
      cards: formateCards(cards, sheet.properties.sheetId),
    })),
  };
};
