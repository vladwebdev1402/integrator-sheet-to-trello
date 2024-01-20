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

export interface IBatchRequest {
  requests: [
    {
      addSheet?: {
        properties: {
          title: string;
        };
      },
      deleteSheet?: {
        sheetId: number;
      }
    }
  ];
}

export interface IQueryMutationAddCard {
  spreadsheetId: string;
  sheetTitle: string;
}

export interface IQueryMutationDeleteList {
  spreadsheetId: string;
  sheetId: number;
}
