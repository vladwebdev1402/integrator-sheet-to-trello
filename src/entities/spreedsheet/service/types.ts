import { CSheetCard, ISheet } from "@/shared/types";

export interface SheetByIdResponse {
  valueRanges: [
    {
      valueRange: {
        values?: string[][]; 
      }
    }
  ];
}

export interface AddCardRequest {
  spreadsheetId: string;
  sheetId: number;
  countCards: number;
  name: string;
  description?: string;
  cards?: string[][];
}

export interface ISheetMutation {
  spreadsheetId: string;
  sheetId: number;
}

export interface SheetUpdateRequest {
  spreadsheetId: string;
  newSheet: ISheet;
  isMoveUp?: boolean;
  isMoveDown?: boolean;
}

export interface GetAllSheetsResponse {
  nextPageToken?: string;
  files: {
      id: string;
      name: string;
      mimeType: string;
  }[];
}

export interface CardEditRequest extends ISheetMutation {
  card: CSheetCard;
  isShift?: boolean;
}

export interface CardDeleteRequest extends ISheetMutation {
  idx: number;
}

export interface CardShiftInsideRequest extends ISheetMutation {
  newSheet: string[][];
  newIdx: number;
  oldIdx: number;
}

export interface addNewListResponse {
  spreadsheetId: string;
  replies: [
    {
      addSheet: {
        properties: {
          sheetId: number,
          title: string,
          index: number,
        }
      }
    }
  ]
}

export const sheetMimeType = "application/vnd.google-apps.spreadsheet";
