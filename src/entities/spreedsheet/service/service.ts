import { baseGoogleQuery } from "@/shared/rtk";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  IQueryMutationAddCard,
  IQueryMutationDeleteList,
  IResponseGetSheet,
  IResponseGetSpreadsheet,
} from "./types";

const baseUrl = "https://sheets.googleapis.com/v4/spreadsheets";

export const SpreadSheetService = createApi({
  reducerPath: "SpreadSheetService",
  baseQuery: baseGoogleQuery,
  tagTypes: ["Spreadsheet", "Sheet-List", "Sheet-Card"],
  endpoints: (build) => ({
    getSpreadSheetById: build.query<IResponseGetSpreadsheet, string>({
      query: (id: string) => ({
        url: baseUrl + `/${id}`,
      }),
      providesTags: ["Spreadsheet"],
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
      invalidatesTags: ["Spreadsheet"],
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
      invalidatesTags: ["Spreadsheet"],
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
  useAddNewListMutation,
  useAddNewCardMutation,
  useDeleteListMutation,
} = SpreadSheetService;
