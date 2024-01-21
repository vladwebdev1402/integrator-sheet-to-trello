import { baseGoogleQuery } from "@/shared/rtk";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
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
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
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

    getSheetById: build.query<string[][], { spreadsheetId: string; sheetId: number }>({
      query: ({ spreadsheetId, sheetId }) => ({
        method: "POST",
        url: baseUrl + `/${spreadsheetId}/values:batchGetByDataFilter`,
        body: {
          dataFilters: [
            {
              gridRange: {
                sheetId: sheetId
              }
            }
          ]
        }
      }),
      transformResponse(baseQueryReturnValue:IResponseGetSheetById, meta, arg) {
        const values = baseQueryReturnValue.valueRanges[0].valueRange.values;
        return values !== undefined ? values : []
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
      invalidatesTags: ["Spreadsheet-Detail"],
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

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    addNewCard: build.mutation<any, IQueryMutationAddCard>({
      query: ({ sheetId, countCards,spreadsheetId }) => ({
        url: baseUrl + `/${spreadsheetId}/values:batchUpdateByDataFilter`,
        method: "POST",
        body: {
          data: [
            {
              dataFilter: {
                gridRange: {
                  sheetId: sheetId,
                  startRowIndex: countCards,
                }
              },
              values: [
                [
                  "New Card"
                ],
              ],
              majorDimension: "ROWS",
            }
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

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
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
} = SpreadSheetService;
