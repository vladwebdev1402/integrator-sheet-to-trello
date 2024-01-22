import { SpreadSheetService } from "./service";
import { ISheetMutation, ISheetUpdateMutaion } from "./types";
import { baseSheetUrl } from "./url";

const sheetListExtendApi = SpreadSheetService.injectEndpoints({
  endpoints: (build) => ({
    addNewList: build.mutation<any, { spreadsheetId: string; name: string }>({
      query: ({ spreadsheetId, name }) => ({
        url: baseSheetUrl + `/${spreadsheetId}:batchUpdate`,
        method: "POST",
        body: {
          requests: [
            {
              addSheet: {
                properties: {
                  // title: `New List ${name}`,
                },
              },
            },
          ],
        },
      }),
      invalidatesTags: ["Spreadsheet-Detail"],
    }),

    deleteList: build.mutation<any, ISheetMutation>({
      query: ({ spreadsheetId, sheetId }) => ({
        url: baseSheetUrl + `/${spreadsheetId}:batchUpdate`,
        method: "POST",
        body: {
          requests: [
            {
              deleteSheet: {
                sheetId,
              },
            },
          ],
        },
      }),
      async onQueryStarted(
        { sheetId, spreadsheetId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          SpreadSheetService.util.updateQueryData(
            "getSpreadSheetById",
            spreadsheetId,
            (draft) => {
              draft.sheets = draft.sheets.filter(
                (sheet) => sheet.properties.sheetId !== sheetId
              );
            }
          )
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),

    updateList: build.mutation<any, ISheetUpdateMutaion>({
      query: ({
        newSheet,
        spreadsheetId,
        isMoveDown = false,
        isMoveUp = false,
      }) => ({
        url: baseSheetUrl + `/${spreadsheetId}:batchUpdate`,
        method: "POST",
        body: {
          requests: [
            {
              updateSheetProperties: {
                fields: "title, index",
                properties: {
                  title: newSheet.title,
                  sheetId: newSheet.sheetId,
                  index: isMoveDown
                    ? newSheet.index + 2
                    : isMoveUp
                    ? newSheet.index - 1
                    : newSheet.index,
                },
              },
            },
          ],
        },
      }),
      async onQueryStarted(
        { newSheet, spreadsheetId, isMoveDown = false, isMoveUp = false },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          SpreadSheetService.util.updateQueryData(
            "getSpreadSheetById",
            spreadsheetId,
            (draft) => {
              const updateList = draft.sheets.filter(
                (sheet) => sheet.properties.sheetId === newSheet.sheetId
              )[0];
              updateList.properties.title = newSheet.title;
              if (isMoveDown || isMoveUp) {
                if (isMoveUp) {
                  const newIdx = updateList.properties.index -= 1;
                  updateList.properties.index = newIdx;
                  draft.sheets[newIdx].properties.index += 1;
                }
                else if (isMoveDown) {
                  const newIdx = updateList.properties.index += 1;
                  updateList.properties.index = newIdx;
                  draft.sheets[newIdx].properties.index -= 1;
                }
                draft.sheets.sort((a, b) => a.properties.index - b.properties.index);  
              }
            }
          )
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const {
  useAddNewListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} = sheetListExtendApi;
