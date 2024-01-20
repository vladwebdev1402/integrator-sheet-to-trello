import React, { FC, useState } from "react";
import {
  TextField,
  CircularProgress,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import { useRenameSpreadSheetMutation } from "@/entities/spreedsheet";
import { useParams } from "react-router-dom";

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
      {!isEdit && isLoading && <CircularProgress />}
    </>
  );
};

export default SpreadsheetEditName;
