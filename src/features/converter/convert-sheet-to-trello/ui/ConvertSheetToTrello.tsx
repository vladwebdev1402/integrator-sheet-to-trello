import { FC, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import {
  formateTrello,
  useCreateBoardMutation,
  useGetAllBoardInfo,
  useSheetToTrello,
} from "@/entities/trello-board";
import {
  formateSpreadsheet,
  useGetAllSpreadsheetInfo,
} from "@/entities/spreedsheet";
import { routerPaths } from "@/shared/constants";

interface Props {
  fromChoice: string;
  toChoice: string;
  clearChoice: () => void;
}

const ConvertSheetToTrello: FC<Props> = ({
  fromChoice,
  toChoice,
  clearChoice,
}) => {
  const [message, setMessage] = useState("");
  const [idBoard, setIdBoard] = useState("");
  const navigate = useNavigate();

  const { getAllSpreadsheetInfo, isFetching: spreadsheetLoading } =
    useGetAllSpreadsheetInfo(fromChoice);
  const { getAllBoardInfo, isFetching: boardLoading } =
    useGetAllBoardInfo(toChoice);
  const { spreadsheetToTrello, isFetching: convertFetching } =
    useSheetToTrello();

  const [createBoard, { isLoading: createLoading }] = useCreateBoardMutation();

  const isLoading = useMemo(
    () =>
      boardLoading || spreadsheetLoading || convertFetching || createLoading,
    [createLoading, convertFetching, boardLoading, spreadsheetLoading]
  );

  const getBoard = async (name?: string) => {
    if (toChoice === "create") {
      const response = await createBoard({
        name: name ?? "Новая доска",
        prefs_background: "blue",
      });
      if ("data" in response)
        return { board: response.data, cards: [], lists: [] };
      else return { board: undefined, cards: [], lists: [] };
    }
    return await getAllBoardInfo();
  };

  const goBoardClick = () => {
    navigate(routerPaths.navigateTrelloDetail(idBoard));
  };

  const convertClick = async () => {
    setIdBoard("");
    setMessage("Getting spreadsheet");
    const { spreadsheet, cards: sheetCards } = await getAllSpreadsheetInfo();
    if (!spreadsheet || !sheetCards) return;
    setMessage("Getting board");
    const {
      board,
      cards: boardCards,
      lists: boardLists,
    } = await getBoard(spreadsheet.properties.title);
    if (!board || !boardCards || !boardLists) return;
    setMessage("Fomating data");
    const allBoardInfo = formateTrello(board!, boardLists!, boardCards!);
    const allSpreadsheetInfo = formateSpreadsheet(spreadsheet, sheetCards);
    setMessage("Converting spreadsheet to trello board");
    await spreadsheetToTrello(allBoardInfo, allSpreadsheetInfo);
    setMessage("");
    setIdBoard(board.id);
  };

  return (
    <Box>
      <LoadingButton
        color="secondary"
        fullWidth
        variant="contained"
        onClick={convertClick}
        loading={isLoading}
        disabled={fromChoice === "" || toChoice === ""}
      >
        {fromChoice === "" || toChoice === ""
          ? "Choice trello board and spreadsheet"
          : ""}
        {fromChoice !== "" && toChoice !== "" ? "convert" : ""}
      </LoadingButton>
      <Box display="flex" gap="16px" marginTop="16px">
        {idBoard && (
          <Button
            color="secondary"
            fullWidth
            variant="contained"
            onClick={goBoardClick}
          >
            Go board
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

      <Typography variant="body1" marginTop="16px" textAlign="center">
        {message}
      </Typography>
    </Box>
  );
};

export default ConvertSheetToTrello;
