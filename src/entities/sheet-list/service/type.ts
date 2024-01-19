export interface IResponseGetAllSheets {
    nextPageToken?: string;
    files: {
        id: string;
        name: string;
        mimeType: string;
    }[];
}

export const sheetMimeType = "application/vnd.google-apps.spreadsheet";