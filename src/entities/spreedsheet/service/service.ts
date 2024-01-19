import { baseGoogleQuery } from "@/shared/rtk";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IResponseGetSpreadsheet } from "./types";


const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets'

export const SpreadSheetService = createApi({
    reducerPath: "SpreadSheetService",
    baseQuery: baseGoogleQuery,
    endpoints: (build) => ({
        getSheetById: build.query<IResponseGetSpreadsheet, string>({
            query: (id: string) => ({
                url: baseUrl + `/${id}`
            })
        }) 
    }),
})

export const { useGetSheetByIdQuery } = SpreadSheetService;