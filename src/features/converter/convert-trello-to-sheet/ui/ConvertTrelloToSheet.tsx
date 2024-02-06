import { FC, useState, useEffect, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { formateTrello, useGetAllBoardInfo } from "@/entities/trello-board";
import {
  formateSpreadsheet,
  useCreateNewSpreadSheetMutation,
  useGetAllSpreadsheetInfo,
  useTrelloToSpreadsheet,
} from "@/entities/spreedsheet";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "@/shared/constants";

interface Props {
  toChoice: string;
  fromChoice: string;
  clearChoice: () => void;
}

const ConvertTrelloToSheet: FC<Props> = ({
  fromChoice,
  toChoice,
  clearChoice,
}) => {
  const [message, setMessage] = useState("");
  const [idSpreadsheet, setIdSpreadsheet] = useState("");
  const navigate = useNavigate();

  const { getAllBoardInfo, isFetching: boardLoading } =
    useGetAllBoardInfo(fromChoice);
  const { getAllSpreadsheetInfo, isFetching: spreadsheetLoading } =
    useGetAllSpreadsheetInfo(toChoice);
  const [createSpreadsheet, { isLoading: createLoading }] =
    useCreateNewSpreadSheetMutation();
  const { trelloToSpreadsheet, isFetching: convertFetching } =
    useTrelloToSpreadsheet();

  const isLoading = useMemo(
    () =>
      boardLoading || spreadsheetLoading || convertFetching || createLoading,
    [createLoading, convertFetching, boardLoading, spreadsheetLoading]
  );
  const getSpreadsheet = async (name?: string) => {
    if (toChoice === "create") {
      const res = await createSpreadsheet(name);
      if ("data" in res) return { spreadsheet: res.data, cards: [] };
      return { spreadsheet: undefined, cards: [] };
    } else return getAllSpreadsheetInfo();
  };

  const goSpreadsheetClick = () => {
    navigate(routerPaths.navigateSheetDetail(idSpreadsheet));
  };

  const convertClick = async () => {
    setMessage("Getting trello board");
    const { board, cards, lists } = await getAllBoardInfo();
    if (!board || !cards || !lists) return;
    setMessage("Getting spreadsheet");
    const { spreadsheet, cards: sheetCards } = await getSpreadsheet(board.name);
    if (!spreadsheet || !cards) return;
    setMessage("Formating data");
    const allBoardInfo = formateTrello(board!, lists!, cards!);
    const allSpreadsheetInfo = formateSpreadsheet(spreadsheet, sheetCards);
    setMessage("Converting to spreadsheet");
    await trelloToSpreadsheet(
      allBoardInfo,
      allSpreadsheetInfo,
      toChoice === "create"
    );
    setMessage("");
    setIdSpreadsheet(spreadsheet.spreadsheetId);
  };

  useEffect(() => {
    setIdSpreadsheet("");
  }, []);

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
      <Box display="flex" gap="16px" marginTop="16px">
        {idSpreadsheet && (
          <Button fullWidth variant="contained" onClick={goSpreadsheetClick}>
            Go spreadsheet
          </Button>
        )}
        <Button
          color="error"
          fullWidth
          variant="contained"
          disabled={isLoading}
          onClick={clearChoice}
        >
          clear choice
        </Button>
      </Box>
      <Typography variant="body1" textAlign="center" marginTop="16px">
        {message}
      </Typography>
    </Box>
  );
};

export default ConvertTrelloToSheet;
