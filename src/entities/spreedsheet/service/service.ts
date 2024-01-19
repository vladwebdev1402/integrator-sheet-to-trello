import { baseGoogleQuery } from "@/shared/rtk";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IResponseGetSheet, IResponseGetSpreadsheet } from "./types";


const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets'

export const SpreadSheetService = createApi({
    reducerPath: "SpreadSheetService",
    baseQuery: baseGoogleQuery,
    tagTypes: ["Spreadsheet", "Sheet-List", "Sheet-Card"],
    endpoints: (build) => ({
        getSpreadSheetById: build.query<IResponseGetSpreadsheet, string>({
            query: (id: string) => ({
                url: baseUrl + `/${id}`,
            }),
            providesTags: [{type: 'Sheet-List'}],
        }),
        getSheetByName: build.query<IResponseGetSheet, {spreadsheetId: string, sheetTitle: string}>({
            query: ({spreadsheetId, sheetTitle}) => ({
                method: "GET",
                url: baseUrl + `/${spreadsheetId}/values/'${sheetTitle}'!A1:D100`,
            }),

        }),
        addNewList: build.mutation<any, {spreadsheetId: string, name: string}>({
            query: ({spreadsheetId, name}) => ({
                url: baseUrl + `/${spreadsheetId}:batchUpdate`,
                method: "POST",
                body: {
                    requests: [
                      {
                        addSheet: {
                          properties: {
                            title: `New List ${name}`
                          }
                        }
                      }
                    ]
                  }
            }),
            invalidatesTags: [{type: 'Sheet-List'}],
        })
    }),
})

export const { useGetSpreadSheetByIdQuery, useGetSheetByNameQuery, useAddNewListMutation } = SpreadSheetService;