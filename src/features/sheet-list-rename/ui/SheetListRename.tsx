import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { useRenameListMutation } from "@/entities/spreedsheet";
import { EditValue } from "@/shared/ui";

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
  const [rename, { isLoading }] = useRenameListMutation();

  const mediaSM = useMediaQuery("(max-width: 568px)");

  const editAction = (value: string) => {
    rename({
      sheetId,
      spreadsheetId: params.id || "no-id",
      sheetName: value,
    });
    setEdit(false);
  };

  return (
    <EditValue
      callbackUpdate={editAction}
      currentValue={currentValue}
      isEdit={isEdit}
      setIsEdit={setEdit}
      loaderSize="15px"
      visibleEditIcon={false}
      inputProps={{
        fontSize: mediaSM ? "17px" : "20px",
        fontWeight: "500",
      }}
      isLoading={isLoading}
    />
  );
};

export default SheetListRename;
