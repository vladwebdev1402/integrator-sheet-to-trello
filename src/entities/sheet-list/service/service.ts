import { baseGoogleQuery } from "@/shared/rtk/baseGoogleQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://sheets.googleapis.com"

export const SheetsListService = createApi({
  reducerPath: "SheetsListService",
  baseQuery: baseGoogleQuery,
  endpoints: (builder) => ({
    getAllSheets: builder.query<any, null>({
      query: () => {
        return baseUrl + ``;
      },
    }),
  }),
});

export const { useGetAllSheetsQuery } = SheetsListService;
