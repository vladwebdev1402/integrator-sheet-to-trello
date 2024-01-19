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

export interface IBodyAddNewList {
  requests: [
    {
      addSheet: {
        properties: {
          title: string;
        };
      };
    }
  ];
}

export interface IQueryMutationAddCard {
  spreadsheetId: string;
  sheetTitle: string;
}
