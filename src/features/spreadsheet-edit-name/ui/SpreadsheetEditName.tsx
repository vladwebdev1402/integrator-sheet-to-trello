import React, { FC, useState } from "react";
import { TextField } from "@mui/material";
import { useRenameSpreadSheetMutation } from "@/entities/spreedsheet";
import { useParams } from "react-router-dom";

interface Props {
  currentValue: string;
  setEdit: (value: boolean) => void;
}

const SpreadsheetEditName: FC<Props> = ({ currentValue, setEdit }) => {
  const [value, setValue] = useState(currentValue);

  const [rename] = useRenameSpreadSheetMutation();
  const params = useParams<{ id: string }>();

  const editChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const editAction = () => {
    if (value !== currentValue || value !== "")
      rename({ id: params.id || "", name: value });
    setEdit(false);
  };

  return (
    <TextField
      autoFocus
      fullWidth
      value={value}
      placeholder={"Input name table"}
      onChange={editChange}
      onBlur={editAction}
      variant="standard"
      inputProps={{ style: { fontSize: "1.5rem" } }}
    />
  );
};

export default SpreadsheetEditName;
