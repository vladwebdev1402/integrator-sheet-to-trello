import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { useRenameSpreadSheetMutation } from "@/entities/spreedsheet";
import { EditValue } from "@/shared/ui";

interface Props {
  currentValue: string;
  isEdit: boolean;
  setEdit: (value: boolean) => void;
}

const SpreadsheetEditName: FC<Props> = ({ currentValue, isEdit, setEdit }) => {
  const mediaMD = useMediaQuery("(max-width: 768px)");
  const params = useParams<{ id: string }>();

  const [rename, { isLoading }] = useRenameSpreadSheetMutation();

  const editAction = (value: string) => {
    rename({ id: params.id || "", name: value });
  };

  return (
    <EditValue
      callbackUpdate={editAction}
      currentValue={currentValue}
      isEdit={isEdit}
      setIsEdit={setEdit}
      isLoading={isLoading}
      inputProps={{ fontSize: mediaMD ? "1.25rem" : "1.5rem" }}
    />
  );
};

export default SpreadsheetEditName;
