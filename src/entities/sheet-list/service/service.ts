import { baseGoogleQuery } from "@/shared/rtk/baseGoogleQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IResponseGetAllSheets, sheetMimeType } from "./type";

const baseUrl = "https://www.googleapis.com";

export const SheetsListService = createApi({
  reducerPath: "SheetsListService",
  baseQuery: baseGoogleQuery,
  endpoints: (builder) => ({
    getAllSheets: builder.query<IResponseGetAllSheets, any>({
      query: () => {
        return {
          url: baseUrl + `/drive/v3/files`,
          params: {
            q: `mimeType = '${sheetMimeType}' and 'me' in owners`
          },
        };
      },
    }),
  }),
});

export const { useGetAllSheetsQuery } = SheetsListService;
