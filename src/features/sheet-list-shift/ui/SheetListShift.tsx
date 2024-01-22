import React, { FC, useMemo } from "react";
import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  useGetSpreadSheetByIdQuery,
  useUpdateListMutation,
} from "@/entities/spreedsheet";
import { useParams } from "react-router";

interface Props {
  sheetId: number;
}

const SheetListShift: FC<Props> = ({ sheetId }) => {
  const params = useParams<{ id: string }>();

  const { currentData } = useGetSpreadSheetByIdQuery(params?.id ?? "");

  const sheet = useMemo(() => {
    return currentData?.sheets.filter(
      (arrSheet) => arrSheet.properties.sheetId === sheetId
    )[0];
  }, [sheetId, currentData]);

  const [moveSheet] = useUpdateListMutation();
  const moveUpClick = () => {
    if (sheet) {
      moveSheet({
        spreadsheetId: params?.id || "",
        newSheet: sheet.properties,
        isMoveUp: true,
      });
    }
  };

  const moveDownClick = () => {
    if (sheet) {
      moveSheet({
        spreadsheetId: params?.id || "",
        newSheet: sheet.properties,
        isMoveDown: true,
      });
    }
  };

  return (
    <>
      {sheet && sheet.properties.index !== 0 && (
        <Button
          startIcon={<ArrowUpwardIcon />}
          color="inherit"
          onClick={moveUpClick}
        >
          move up
        </Button>
      )}
      {sheet &&
        currentData &&
        currentData.sheets.length - 1 !== sheet.properties.index && (
          <Button
            startIcon={<ArrowDownwardIcon />}
            color="inherit"
            onClick={moveDownClick}
          >
            move down
          </Button>
        )}
    </>
  );
};

export default SheetListShift;
