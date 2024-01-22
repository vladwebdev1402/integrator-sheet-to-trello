import React, { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import {
  useGetSpreadSheetByIdQuery,
  useUpdateListMutation,
} from "@/entities/spreedsheet";
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
  const [rename, { isLoading }] = useUpdateListMutation();
  const { currentData } = useGetSpreadSheetByIdQuery(params?.id || "");
  const sheet = useMemo(() => {
    return currentData?.sheets.filter(
      (sheet) => sheet.properties.sheetId === sheetId
    )[0];
  }, [sheetId, currentData]);
  const mediaSM = useMediaQuery("(max-width: 568px)");

  const editAction = (value: string) => {
    if (sheet) {
      rename({
        newSheet: { ...sheet.properties, title: value },
        spreadsheetId: params.id || "no-id",
      });
    }

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
