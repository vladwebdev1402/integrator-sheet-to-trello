import { SpreadSheetService } from "./service";
import { ICardDeleteMutauin, ICardEditMutaion, IQueryMutationAddCard } from "./types";
import { baseSheetUrl } from "./url";

const sheetCardExtendApi = SpreadSheetService.injectEndpoints({
    endpoints: (build) => ({
        addNewCard: build.mutation<any, IQueryMutationAddCard>({
            query: ({ sheetId, countCards, spreadsheetId }) => ({
              url: baseSheetUrl + `/${spreadsheetId}/values:batchUpdateByDataFilter`,
              method: "POST",
              body: {
                data: [
                  {
                    dataFilter: {
                      gridRange: {
                        sheetId: sheetId,
                        startRowIndex: countCards,
                      },
                    },
                    values: [["New Card"]],
                    majorDimension: "ROWS",
                  },
                ],
                valueInputOption: "RAW",
              },
            }),
      
            onQueryStarted: async (
              { sheetId, spreadsheetId },
              { dispatch, queryFulfilled }
            ) => {
              const patchResult = dispatch(
                SpreadSheetService.util.updateQueryData(
                  "getSheetById",
                  { sheetId, spreadsheetId },
                  (draft) => {
                    draft.push(["New Card"]);
                  }
                )
              );
      
              queryFulfilled.catch(patchResult.undo);
            },
          }),
      
          editCard: build.mutation<any, ICardEditMutaion>({
            query: ({ card, sheetId, spreadsheetId }) => ({
              url: baseSheetUrl + `/${spreadsheetId}/values:batchUpdateByDataFilter`,
              method: "POST",
              body: {
                valueInputOption: "RAW",
                data: [
                  {
                    dataFilter: {
                      gridRange: {
                        sheetId,
                        startRowIndex: card.idx,
                      },
                    },
                    values: [[card.title, card.description]],
                    majorDimension: "ROWS",
                  },
                ],
              },
            }),
            async onQueryStarted(
              { card, sheetId, spreadsheetId, isShift = false },
              { dispatch, queryFulfilled }
            ) {
              const resultPatch = dispatch(
                SpreadSheetService.util.updateQueryData(
                  "getSheetById",
                  { sheetId, spreadsheetId },
                  (draft) => {
                    if (isShift) {
                      draft.push([card.title, card.description]);
                      card.idx = draft.length - 1;
                      card.sheetId = sheetId;
                    } else draft[card.idx] = [card.title, card.description];
                  }
                )
              );
              queryFulfilled.catch(resultPatch.undo);
            },
          }),
      
          deleteCard: build.mutation<any, ICardDeleteMutauin>({
            query: ({ idx, sheetId, spreadsheetId }) => ({
              url: baseSheetUrl + `/${spreadsheetId}:batchUpdate`,
              method: "POST",
              body: {
                requests: [
                  {
                    deleteDimension: {
                      range: {
                        dimension: "ROWS",
                        sheetId: sheetId,
                        startIndex: idx,
                        endIndex: idx + 1,
                      },
                    },
                  },
                ],
              },
            }),
            async onQueryStarted(
              { idx, sheetId, spreadsheetId },
              { dispatch, queryFulfilled }
            ) {
              const resultPatch = dispatch(
                SpreadSheetService.util.updateQueryData(
                  "getSheetById",
                  { sheetId, spreadsheetId },
                  (draft) => {
                    draft.splice(idx, 1);
                  }
                )
              );
              queryFulfilled.catch(resultPatch.undo);
            },
          }), 
    }),
})  

export const {
    useAddNewCardMutation,
    useDeleteCardMutation,
    useEditCardMutation,
} = sheetCardExtendApi; 