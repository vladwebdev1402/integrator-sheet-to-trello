import { baseGoogleQuery } from "@/shared/rtk";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  IQueryMutationAddCard,
  IQueryMutationDeleteList,
  IResponseGetAllSheets,
  IResponseGetSheet,
  IResponseGetSpreadsheet,
  sheetMimeType,
} from "./types";

const baseUrl = "https://sheets.googleapis.com/v4/spreadsheets";
const baseDriveUrl = "https://www.googleapis.com/drive/v3";

export const SpreadSheetService = createApi({
  reducerPath: "SpreadSheetService",
  baseQuery: baseGoogleQuery,
  tagTypes: ["List of Spreadsheet", "Spreadsheet-Detail", "Sheet-List", "Sheet-Card"],
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

    createNewSpreadSheet: build.mutation<IResponseGetSpreadsheet, any>({
      query: () => ({
        url: baseUrl,
        method: "POST",
      }),
      invalidatesTags: ["List of Spreadsheet"],
    }),

    getSpreadSheetById: build.query<IResponseGetSpreadsheet, string>({
      query: (id: string) => ({
        url: baseUrl + `/${id}`,
      }),
      providesTags: ["Spreadsheet-Detail"],
    }),

    getSheetByName: build.query<
      IResponseGetSheet,
      { spreadsheetId: string; sheetTitle: string }
    >({
      query: ({ spreadsheetId, sheetTitle }) => ({
        method: "GET",
        url: baseUrl + `/${spreadsheetId}/values/'${sheetTitle}'!A1:D100`,
      }),
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
                  title: `New List ${name}`,
                },
              },
            },
          ],
        },
      }),
      invalidatesTags: ["Spreadsheet-Detail"],
    }),
    
    deleteList: build.mutation<any, IQueryMutationDeleteList>({
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

    addNewCard: build.mutation<any, IQueryMutationAddCard>({
      query: ({ sheetTitle, spreadsheetId }) => ({
        url: baseUrl + `/${spreadsheetId}/values/'${sheetTitle}'!A1:append`,
        params: {
          valueInputOption: "RAW",
        },
        method: "POST",
        body: {
          values: [["New Card"]],
        },
      }),
      invalidatesTags: ["Sheet-List"],
    }),
  }),
});

export const {
  useGetSpreadSheetByIdQuery,
  useGetSheetByNameQuery,
  useGetAllSheetsQuery,
  useAddNewListMutation,
  useAddNewCardMutation,
  useDeleteListMutation,
  useCreateNewSpreadSheetMutation,
} = SpreadSheetService;
