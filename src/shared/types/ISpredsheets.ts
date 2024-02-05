export interface ISpreadsheet {
    spreadsheetId: string;
    properties: {
      title: string;
    };
    sheets: {
      properties: {
        sheetId: number;
        title: string;
        index: number;
      };
    }[]; 
    spreadsheetUrl: string;
}