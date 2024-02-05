import { FC, useState } from "react";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { formateTrello, useGetAllBoardInfo } from "@/entities/trello-board";
import {
  formateSpreadsheet,
  useCreateNewSpreadSheetMutation,
  useGetAllSpreadsheetInfo,
  useTrelloToSpreadsheet,
} from "@/entities/spreedsheet";

interface Props {
  toChoice: string;
  fromChoice: string;
}

const ConvertTrelloToSheet: FC<Props> = ({ fromChoice, toChoice }) => {
  const [message, setMessage] = useState("");
  const { getAllBoardInfo, isFetching: boardLoading } =
    useGetAllBoardInfo(fromChoice);
  const { getAllSpreadsheetInfo, isFetching: spreadsheetLoading } =
    useGetAllSpreadsheetInfo(toChoice);
  const [createSpreadsheet, { isLoading: createLoading }] =
    useCreateNewSpreadSheetMutation();
  const { trelloToSpreadsheet, isFetching: convertFetching } =
    useTrelloToSpreadsheet();

  const getSpreadsheet = async (name?: string) => {
    if (toChoice === "create") {
      const res = await createSpreadsheet(name);
      if ("data" in res) return { spreadsheet: res.data, cards: [] };
      return { spreadsheet: undefined, cards: [] };
    } else return getAllSpreadsheetInfo();
  };

  const convertClick = async () => {
    setMessage("Getting trello board");
    const { board, cards, lists } = await getAllBoardInfo();
    if (!board || !cards || !lists) return;
    setMessage("Getting spreadsheet");
    const { spreadsheet, cards: sheetCards } = await getSpreadsheet(board.name);
    console.log(spreadsheet);
    if (!board || !cards || !lists || !spreadsheet) return;
    setMessage("Formating data");
    const allBoardInfo = formateTrello(board!, lists!, cards!);
    const allSpreadsheetInfo = formateSpreadsheet(spreadsheet, sheetCards);
    setMessage("Converting to spreadsheet");
    await trelloToSpreadsheet(allBoardInfo, allSpreadsheetInfo);
    setMessage("");
  };

  return (
    <Box>
      <LoadingButton
        fullWidth
        variant="contained"
        onClick={convertClick}
        loading={
          boardLoading || spreadsheetLoading || convertFetching || createLoading
        }
        disabled={fromChoice === "" || toChoice === ""}
      >
        {fromChoice === "" || toChoice === ""
          ? "Choice trello board and spreadsheet"
          : ""}
        {fromChoice !== "" && toChoice !== "" ? "convert" : ""}
      </LoadingButton>
      <Typography variant="body1" textAlign="center" marginTop="16px">
        {message}
      </Typography>
    </Box>
  );
};

export default ConvertTrelloToSheet;
