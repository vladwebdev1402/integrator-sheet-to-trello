export interface IResponseGetAllSheets {
    files: {
        id: string;
        name: string;
        mimeType: string;
    }[];
}

export const sheetMimeType = "application/vnd.google-apps.spreadsheet";