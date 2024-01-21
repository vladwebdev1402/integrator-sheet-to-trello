import React, { FC } from "react";
import { useParams } from "react-router-dom";

import { useEditCardMutation } from "@/entities/spreedsheet";
import { CSheetCard } from "@/shared/types";
import { EditValue, IEditFuatureObjectProps } from "@/shared/ui";

const SheetCardTitleEdit: FC<IEditFuatureObjectProps<CSheetCard>> = ({
  currentValue,
  isEdit,
  setIsEdit,
}) => {
  const [updateTitle, { isLoading }] = useEditCardMutation();

  const params = useParams<{ id: string }>();

  const update = (value: string) => {
    updateTitle({
      card: { ...currentValue, title: value },
      sheetId: currentValue.sheetId,
      spreadsheetId: params.id || "no-id",
    });
  };

  return (
    <EditValue
      callbackUpdate={update}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      currentValue={currentValue.title}
      iconSize="small"
      inputProps={{
        fontSize: "1.25rem",
        fontWeight: "500",
      }}
      isLoading={isLoading}
    />
  );
};

export default SheetCardTitleEdit;
