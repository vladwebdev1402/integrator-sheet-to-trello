import { baseGoogleQuery } from "@/shared/rtk";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ISpreadsheet } from "@/shared/types";
import {SheetByIdResponse} from "./types";
const baseUrl = "https://sheets.googleapis.com/v4/spreadsheets";

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
    getSpreadSheetById: build.query<ISpreadsheet, string>({
      query: (id: string) => ({
        url: baseUrl + `/${id}`,
      }),
      providesTags: ["Spreadsheet-Detail"],
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
        baseQueryReturnValue: SheetByIdResponse,
        meta,
        arg
      ) {
        const values = baseQueryReturnValue.valueRanges[0].valueRange.values;
        return values !== undefined ? values : [];
      },
      providesTags: ["Sheet-List"],
    }),
  }),
});

export const {
  useGetSpreadSheetByIdQuery,
  useGetSheetByIdQuery,
  useLazyGetSheetByIdQuery,
  useLazyGetSpreadSheetByIdQuery,
} = SpreadSheetService;
