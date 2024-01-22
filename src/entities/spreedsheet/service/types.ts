import { CSheetCard, ISheet } from "@/shared/types";

export interface IResponseGetSpreadsheet {
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

export interface IResponseGetSheetById {
  valueRanges: [
    {
      valueRange: {
        values?: string[][]; 
      }
    }
  ];
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
  sheetId: number;
  countCards: number;
}

export interface ISheetMutation {
  spreadsheetId: string;
  sheetId: number;
}

export interface ISheetUpdateMutaion {
  spreadsheetId: string;
  newSheet: ISheet;
  isMoveUp?: boolean;
  isMoveDown?: boolean;
}

export interface IResponseGetAllSheets {
  nextPageToken?: string;
  files: {
      id: string;
      name: string;
      mimeType: string;
  }[];
}

export interface ICardEditMutaion extends ISheetMutation {
  card: CSheetCard;
  isShift?: boolean;
}

export interface ICardDeleteMutauin extends ISheetMutation {
  idx: number;
}

export interface ICardShiftInside extends ISheetMutation {
  newSheet: string[][];
  newIdx: number;
  oldIdx: number;
}

export const sheetMimeType = "application/vnd.google-apps.spreadsheet";
