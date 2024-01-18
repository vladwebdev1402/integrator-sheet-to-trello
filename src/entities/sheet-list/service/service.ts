import { baseGoogleQuery } from "@/shared/rtk/baseGoogleQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const SheetsListService = createApi({
  reducerPath: "SheetsListService",
  baseQuery: baseGoogleQuery,
  endpoints: (builder) => ({
    getAllSheets: builder.query<any, null>({
      query: () => {
        return ``;
      },
    }),
  }),
});

export const { useGetAllSheetsQuery } = SheetsListService;
