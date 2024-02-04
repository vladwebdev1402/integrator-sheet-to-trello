import { FC } from "react";
import { LoadingButton } from "@mui/lab";
import { useGetAllBoardInfo } from "@/entities/trello-board";
import { formateSpreadsheet, formateTrello } from "@/shared/lib";
import { useGetAllSpreadsheetInfo } from "@/entities/spreedsheet";

interface Props {
  toChoice: string;
  fromChoice: string;
}

const ConvertTrelloToSheet: FC<Props> = ({ fromChoice, toChoice }) => {
  const { getAllBoardInfo, isFetching: boardLoading } =
    useGetAllBoardInfo(fromChoice);
  const { getAllSpreadsheetInfo, isFetching: spreadsheetLoading } =
    useGetAllSpreadsheetInfo(toChoice);

  const convertClick = async () => {
    const { board, cards, lists } = await getAllBoardInfo();
    const { spreadsheet, cards: sheetCards } = await getAllSpreadsheetInfo();
    if (!board || !cards || !lists || !spreadsheet) return;
    const allBoardInfo = formateTrello(board!, lists!, cards!);
    const allSpreadsheetInfo = formateSpreadsheet(spreadsheet, sheetCards);
  };

  return (
    <LoadingButton
      fullWidth
      variant="contained"
      onClick={convertClick}
      loading={boardLoading || spreadsheetLoading}
    >
      convert
    </LoadingButton>
  );
};

export default ConvertTrelloToSheet;
