import { SpreadSheetService } from "./service";
import {
  IResponseGetAllSheets,
  IResponseGetSpreadsheet,
  sheetMimeType,
} from "./types";
import { baseDriveUrl, baseSheetUrl } from "./url";

const spreadsheetExtendApi = SpreadSheetService.injectEndpoints({
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


    deleteSpreadSheet: build.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: baseDriveUrl + `/files/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["List of Spreadsheet"],
    }),


    createNewSpreadSheet: build.mutation<IResponseGetSpreadsheet, any>({
      query: () => ({
        url: baseSheetUrl,
        method: "POST",
      }),
      invalidatesTags: ["List of Spreadsheet"],
    }),


    renameSpreadSheet: build.mutation<any, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: baseSheetUrl + `/${id}:batchUpdate`,
        method: "POST",
        body: {
          requests: [
            {
              updateSpreadsheetProperties: {
                properties: {
                  title: name,
                },
                fields: "title",
              },
            },
          ],
        },
      }),
      async onQueryStarted({ id, name }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          SpreadSheetService.util.updateQueryData(
            "getSpreadSheetById",
            id,
            (draft) => {
              draft.properties.title = name;
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
      invalidatesTags: ["List of Spreadsheet"],
    }),
  }),
});

export const {
  useGetAllSheetsQuery,
  useDeleteSpreadSheetMutation,
  useCreateNewSpreadSheetMutation,
  useRenameSpreadSheetMutation,
} = spreadsheetExtendApi;
