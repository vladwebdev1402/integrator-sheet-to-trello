import { useCallback } from "react";

import {
  useLazyGetSheetByIdQuery,
  useLazyGetSpreadSheetByIdQuery,
} from "../service/service";
import { CSheetCard } from "@/shared/types";

export const useGetAllSpreadsheetInfo = (id: string) => {
  const [
    getSpreadsheet,
    { isFetching: SpreadsheetLoading, isError: SpreadsheetError },
  ] = useLazyGetSpreadSheetByIdQuery();
  const [getSheet, { isFetching: sheetLoading, isError: sheetError }] =
    useLazyGetSheetByIdQuery();

  const getAllSpreadsheetInfo = useCallback(async () => {
    const { data: spreadsheet } = await getSpreadsheet(id);

    const allCards: CSheetCard[] = [];

    if (spreadsheet) {
      for (let sheet of spreadsheet.sheets) {
        const { data: sheetCards } = await getSheet({
          sheetId: sheet.properties.sheetId,
          spreadsheetId: id,
        });
        if (sheetCards)
          sheetCards.forEach((card) =>
            allCards.push(new CSheetCard(card, 0, sheet.properties.sheetId))
          );
      }
    }

    return { spreadsheet, cards: allCards };
  }, [id, getSpreadsheet, getSheet]);

  return {
    getAllSpreadsheetInfo,
    isFetching: SpreadsheetLoading || sheetLoading,
    isError: SpreadsheetError || sheetError,
  };
};
