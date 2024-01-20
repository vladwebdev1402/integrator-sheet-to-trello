import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  CircularProgress,
  FormControl,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useRenameSpreadSheetMutation } from "@/entities/spreedsheet";

interface Props {
  currentValue: string;
  isEdit: boolean;
  setEdit: (value: boolean) => void;
}

const SpreadsheetEditName: FC<Props> = ({ currentValue, isEdit, setEdit }) => {
  const mediaMD = useMediaQuery("(max-width: 768px)");
  const params = useParams<{ id: string }>();
  const [value, setValue] = useState(currentValue);

  const [rename, { isLoading }] = useRenameSpreadSheetMutation();

  const editChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const editIconClick = () => {
    setEdit(!isEdit);
  };

  const editAction = () => {
    if (value !== currentValue && value !== "")
      rename({ id: params.id || "", name: value });
    setEdit(false);
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editAction();
  };

  return (
    <>
      {!isEdit && !isLoading && (
        <IconButton size={"small"} onClick={editIconClick}>
          <EditIcon />
        </IconButton>
      )}
      {isEdit && (
        <FormControl fullWidth component={"form"} onSubmit={formSubmit}>
          <TextField
            autoFocus
            value={value}
            placeholder={"Input name spreadsheet"}
            onChange={editChange}
            onBlur={editAction}
            variant="standard"
            inputProps={{ style: { fontSize: mediaMD ? "1.25rem" : "1.5rem" } }}
          />
        </FormControl>
      )}
      {!isEdit && isLoading && <CircularProgress size="15px" />}
    </>
  );
};

export default SpreadsheetEditName;
