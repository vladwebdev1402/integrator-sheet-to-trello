import { baseGoogleQuery } from "@/shared/rtk/baseGoogleQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IResponseGetAllSheets, sheetMimeType } from "./type";

const baseUrl = "https://www.googleapis.com";

export const SheetsListService = createApi({
  reducerPath: "SheetsListService",
  baseQuery: baseGoogleQuery,
  endpoints: (builder) => ({
    getAllSheets: builder.query<IResponseGetAllSheets, number>({
      query: (limit) => {
        return {
          url: baseUrl + `/drive/v3/files`,
          params: {
            q: `mimeType = '${sheetMimeType}' and 'me' in owners`,
            pageSize: limit,
          },
        };
      },
    }),
  }),
});

export const { useGetAllSheetsQuery } = SheetsListService;
