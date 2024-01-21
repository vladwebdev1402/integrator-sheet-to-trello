import { SpreadSheetService } from "./service";
import { ISheetMutation, ISheetRenameMutaion } from "./types";
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

    renameList: build.mutation<any, ISheetRenameMutaion>({
      query: ({ sheetId, sheetName, spreadsheetId }) => ({
        url: baseSheetUrl + `/${spreadsheetId}:batchUpdate`,
        method: "POST",
        body: {
          requests: [
            {
              updateSheetProperties: {
                fields: "title",
                properties: {
                  title: sheetName,
                  sheetId: sheetId,
                },
              },
            },
          ],
        },
      }),
      async onQueryStarted(
        { sheetId, sheetName, spreadsheetId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          SpreadSheetService.util.updateQueryData(
            "getSpreadSheetById",
            spreadsheetId,
            (draft) => {
              const renamedList = draft.sheets.filter(
                (sheet) => sheet.properties.sheetId === sheetId
              )[0];
              renamedList.properties.title = sheetName;
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
  useRenameListMutation,
  useDeleteListMutation,
} = sheetListExtendApi;
