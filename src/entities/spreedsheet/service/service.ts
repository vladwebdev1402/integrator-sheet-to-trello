import { baseGoogleQuery } from "@/shared/rtk";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IResponseGetSheet, IResponseGetSpreadsheet } from "./types";


const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets'

export const SpreadSheetService = createApi({
    reducerPath: "SpreadSheetService",
    baseQuery: baseGoogleQuery,
    endpoints: (build) => ({
        getSpreadSheetById: build.query<IResponseGetSpreadsheet, string>({
            query: (id: string) => ({
                url: baseUrl + `/${id}`
            })
        }),
        getSheetByName: build.query<IResponseGetSheet, {spreadsheetId: string, sheetTitle: string}>({
            query: ({spreadsheetId, sheetTitle}) => ({
                url: baseUrl + `/${spreadsheetId}/values/'${sheetTitle}'!A1:D100`
            })
        })
    }),
})

export const { useGetSpreadSheetByIdQuery, useGetSheetByNameQuery } = SpreadSheetService;