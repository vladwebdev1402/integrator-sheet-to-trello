import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
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
}

const ConvertSheetToTrello: FC<Props> = ({ fromChoice, toChoice }) => {
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

  const convertClick = async () => {
    if (idBoard) {
      navigate(routerPaths.navigateTrelloDetail(idBoard));
      return;
    }
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
    setIdBoard(board.id);
    setMessage("Fomating data");
    const allBoardInfo = formateTrello(board!, boardLists!, boardCards!);
    const allSpreadsheetInfo = formateSpreadsheet(spreadsheet, sheetCards);
    setMessage("Converting spreadsheet to trello board");
    await spreadsheetToTrello(allBoardInfo, allSpreadsheetInfo);
    setMessage("");
  };

  useEffect(() => {
    setIdBoard("");
  }, []);

  return (
    <Box>
      <LoadingButton
        color="secondary"
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
        {fromChoice !== "" && toChoice !== "" && !idBoard ? "convert" : ""}
        {idBoard && "Go to board"}
      </LoadingButton>
      <Typography variant="body1" marginTop="16px" textAlign="center">
        {message}
      </Typography>
    </Box>
  );
};

export default ConvertSheetToTrello;
