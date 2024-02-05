import { CSheetCard, IFormatedBoard, ISpreadsheet } from "@/shared/types";

export const formateSpreadsheet = (
  spreadsheet: ISpreadsheet,
  cards: CSheetCard[]
): IFormatedBoard => {
  return {
    id: spreadsheet.spreadsheetId,
    name: spreadsheet.properties.title,
    lists: spreadsheet.sheets.map((sheet) => ({
      id: sheet.properties.sheetId.toString(),
      name: sheet.properties.title,
    })),
    cards: cards.map((card) => ({
      name: card.title,
      description: card.description,
      idList: card.sheetId.toString(),
      nameList:
        spreadsheet.sheets.find(
          (sheet) => card.sheetId === sheet.properties.sheetId
        )?.properties.title || "None",
    })),
  };
};
