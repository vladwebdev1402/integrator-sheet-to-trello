import React, { FC } from "react";
import { useParams } from "react-router-dom";

import { useEditCardMutation } from "@/entities/spreedsheet";
import { CSheetCard } from "@/shared/types";
import { EditValue, IEditFuatureObjectProps } from "@/shared/ui";

const SheetCardDescriptionEdit: FC<IEditFuatureObjectProps<CSheetCard>> = ({
  isEdit,
  currentValue,
  setIsEdit,
}) => {
  const params = useParams<{ id: string }>();
  const [update] = useEditCardMutation();

  const updateValue = (value: string) => {
    update({
      card: { ...currentValue, description: value },
      spreadsheetId: params.id || "no-id",
      sheetId: currentValue.sheetId,
    });
  };

  return (
    <EditValue
      callbackUpdate={updateValue}
      currentValue={currentValue.description}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      visibleEditIcon={false}
      inputProps={{
        fontSize: "1rem",
        color: "rgba(0, 0, 0, 0.87)",
      }}
      type="area"
      allowedEmpty
    />
  );
};

export default SheetCardDescriptionEdit;
