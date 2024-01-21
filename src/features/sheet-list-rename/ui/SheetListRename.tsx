import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  TextField,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";

import { useRenameListMutation } from "@/entities/spreedsheet";

interface Props {
  currentValue: string;
  isEdit: boolean;
  setEdit: (value: boolean) => void;
  sheetId: number;
}

const SheetListRename: FC<Props> = ({
  currentValue,
  sheetId,
  isEdit,
  setEdit,
}) => {
  const params = useParams<{ id: string }>();
  const [value, setValue] = useState(currentValue);
  const [rename, { isLoading }] = useRenameListMutation();
  const editChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const mediaSM = useMediaQuery("(max-width: 568px)");

  const editAction = () => {
    if (value !== currentValue && value !== "")
      rename({
        sheetId,
        spreadsheetId: params.id || "no-id",
        sheetName: value,
      });
    setEdit(false);
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editAction();
  };

  const inputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
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
            onClick={inputClick}
            onBlur={editAction}
            variant="standard"
            inputProps={{
              style: {
                fontSize: mediaSM ? "17px" : "20px",
                fontWeight: 500,
              },
            }}
          />
        </FormControl>
      )}
      {!isEdit && isLoading && (
        <CircularProgress sx={{ marginLeft: "5px" }} size="15px" />
      )}
    </>
  );
};

export default SheetListRename;
