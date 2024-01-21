import { EditValue, IEditFuatureProps } from "@/shared/ui";
import React, { FC } from "react";

const SheetCardDescriptionEdit: FC<IEditFuatureProps> = ({
  isEdit,
  currentValue,
  setIsEdit,
}) => {
  const updateValue = (value: string) => {};

  return (
    <EditValue
      callbackUpdate={updateValue}
      currentValue={currentValue}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      visibleEditIcon={false}
      inputProps={{
        fontSize: "1rem",
        color: "rgba(0, 0, 0, 0.87)",
      }}
      type="area"
    />
  );
};

export default SheetCardDescriptionEdit;
