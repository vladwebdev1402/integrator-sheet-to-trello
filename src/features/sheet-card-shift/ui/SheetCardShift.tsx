import { FC, useMemo } from "react";
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
  closeDialog: () => void;
}

const SheetCardShift: FC<Props> = ({ card, closeDialog }) => {
  const params = useParams<{ id: string }>();

  const { data } = useGetSpreadSheetByIdQuery(params?.id || "no-id");
  const [deleteCard] = useDeleteCardMutation();
  const [updateCard] = useEditCardMutation();

  const sheets = useMemo(() => {
    return data ? data.sheets : [];
  }, [data]);

  const changeSelect = (e: SelectChangeEvent) => {
    const newSheet = Number(e.target.value);
    if (newSheet !== card.sheetId) {
      deleteCard({
        idx: card.idx,
        sheetId: card.sheetId,
        spreadsheetId: params?.id || "no-id",
      });
      updateCard({
        card: card,
        sheetId: newSheet,
        spreadsheetId: params?.id || "no-id",
        isShift: true,
      });
      closeDialog();
    }
  };

  return (
    <FormControl size="small" sx={{ width: "270px" }}>
      <InputLabel>Sheets</InputLabel>
      <Select
        value={card.sheetId.toString()}
        label="Sheets"
        onChange={changeSelect}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: "225px",
            },
          },
        }}
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
