import { baseGoogleQuery } from "@/shared/rtk";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ICardDeleteMutauin,
  ICardEditMutaion,
  IQueryMutationAddCard,
  IResponseGetAllSheets,
  IResponseGetSheetById,
  IResponseGetSpreadsheet,
  ISheetMutation,
  ISheetRenameMutaion,
  sheetMimeType,
} from "./types";

const baseUrl = "https://sheets.googleapis.com/v4/spreadsheets";
const baseDriveUrl = "https://www.googleapis.com/drive/v3";

export const SpreadSheetService = createApi({
  reducerPath: "SpreadSheetService",
  baseQuery: baseGoogleQuery,
  tagTypes: [
    "List of Spreadsheet",
    "Spreadsheet-Detail",
    "Sheet-List",
    "Sheet-Card",
  ],
  endpoints: (build) => ({
    getAllSheets: build.query<IResponseGetAllSheets, number>({
      query: (limit) => {
        return {
          url: baseDriveUrl + `/files`,
          params: {
            q: `mimeType = '${sheetMimeType}' and 'me' in owners`,
            pageSize: limit,
          },
        };
      },
      providesTags: ["List of Spreadsheet"],
    }),

    getSpreadSheetById: build.query<IResponseGetSpreadsheet, string>({
      query: (id: string) => ({
        url: baseUrl + `/${id}`,
      }),
      providesTags: ["Spreadsheet-Detail"],
    }),

    createNewSpreadSheet: build.mutation<IResponseGetSpreadsheet, any>({
      query: () => ({
        url: baseUrl,
        method: "POST",
      }),
      invalidatesTags: ["List of Spreadsheet"],
    }),

    renameSpreadSheet: build.mutation<any, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: baseUrl + `/${id}:batchUpdate`,
        method: "POST",
        body: {
          requests: [
            {
              updateSpreadsheetProperties: {
                properties: {
                  title: name,
                },
                fields: "title",
              },
            },
          ],
        },
      }),
      async onQueryStarted({ id, name }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          SpreadSheetService.util.updateQueryData(
            "getSpreadSheetById",
            id,
            (draft) => {
              draft.properties.title = name;
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
      invalidatesTags: ["List of Spreadsheet"],
    }),

    deleteSpreadSheet: build.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: baseDriveUrl + `/files/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["List of Spreadsheet"],
    }),

    getSheetById: build.query<
      string[][],
      { spreadsheetId: string; sheetId: number }
    >({
      query: ({ spreadsheetId, sheetId }) => ({
        method: "POST",
        url: baseUrl + `/${spreadsheetId}/values:batchGetByDataFilter`,
        body: {
          dataFilters: [
            {
              gridRange: {
                sheetId: sheetId,
              },
            },
          ],
        },
      }),
      transformResponse(
        baseQueryReturnValue: IResponseGetSheetById,
        meta,
        arg
      ) {
        const values = baseQueryReturnValue.valueRanges[0].valueRange.values;
        return values !== undefined ? values : [];
      },
      providesTags: ["Sheet-List"],
    }),

    addNewList: build.mutation<any, { spreadsheetId: string; name: string }>({
      query: ({ spreadsheetId, name }) => ({
        url: baseUrl + `/${spreadsheetId}:batchUpdate`,
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
        url: baseUrl + `/${spreadsheetId}:batchUpdate`,
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
        url: baseUrl + `/${spreadsheetId}:batchUpdate`,
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

    addNewCard: build.mutation<any, IQueryMutationAddCard>({
      query: ({ sheetId, countCards, spreadsheetId }) => ({
        url: baseUrl + `/${spreadsheetId}/values:batchUpdateByDataFilter`,
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
        url: baseUrl + `/${spreadsheetId}/values:batchUpdateByDataFilter`,
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
        url: baseUrl + `/${spreadsheetId}:batchUpdate`,
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
});

export const {
  useGetSpreadSheetByIdQuery,
  useGetSheetByIdQuery,
  useGetAllSheetsQuery,
  useAddNewCardMutation,
  useAddNewListMutation,
  useDeleteListMutation,
  useRenameListMutation,
  useCreateNewSpreadSheetMutation,
  useRenameSpreadSheetMutation,
  useDeleteSpreadSheetMutation,
  useEditCardMutation,
  useDeleteCardMutation,
} = SpreadSheetService;
