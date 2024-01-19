export interface IResponseGetSpreadsheet {
  spreadsheetId: string;
  properties: {
    title: string;
  };
  sheets: {
    properties: {
      sheetId: number;
      title: string;
    };
  }[];
  spreadsheetUrl: string;
}

export interface IResponseGetSheet {
  range: string;
  values?: string[][];
}
