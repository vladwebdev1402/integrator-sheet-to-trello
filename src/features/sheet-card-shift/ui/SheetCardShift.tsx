import React, { FC, useState, useMemo, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useParams } from "react-router-dom";

import {
  useDeleteCardMutation,
  useEditCardMutation,
  useGetSpreadSheetByIdQuery,
} from "@/entities/spreedsheet";
import { CSheetCard } from "@/shared/types";

interface Props {
  card: CSheetCard;
}

const SheetCardShift: FC<Props> = ({ card }) => {
  const params = useParams<{ id: string }>();
  const [currentSheet, setCurrentSheet] = useState(card.sheetId);

  const { data } = useGetSpreadSheetByIdQuery(params?.id || "no-id");
  const [deleteCard] = useDeleteCardMutation();
  const [updateCard] = useEditCardMutation();

  const sheets = useMemo(() => {
    return data ? data.sheets : [];
  }, [data]);

  const changeSelect = (e: SelectChangeEvent) => {
    setCurrentSheet(Number(e.target.value));
  };

  useEffect(() => {
    if (currentSheet !== card.idx) {
      deleteCard({
        idx: card.idx,
        sheetId: card.sheetId,
        spreadsheetId: params?.id || "no-id",
      });
      updateCard({
        card: card,
        sheetId: currentSheet,
        spreadsheetId: params?.id || "no-id",
        isShift: true,
      });
    }
  }, [currentSheet]);

  return (
    <FormControl size="small" sx={{ width: "270px" }}>
      <InputLabel>Sheets</InputLabel>
      <Select
        value={currentSheet.toString()}
        label="Sheets"
        onChange={changeSelect}
      >
        {sheets.map((sheet) => (
          <MenuItem
            key={sheet.properties.sheetId}
            value={sheet.properties.sheetId}
          >
            {sheet.properties.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SheetCardShift;
