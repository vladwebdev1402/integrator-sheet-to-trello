import { EditValue, IEditFuatureProps } from "@/shared/ui";
import React, { FC } from "react";

const SheetCardTitleEdit: FC<IEditFuatureProps> = ({
  currentValue,
  isEdit,
  setIsEdit,
}) => {
  const update = (value: string) => {
    console.log(value);
  };

  return (
    <EditValue
      callbackUpdate={update}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      currentValue={currentValue}
      iconSize="small"
      inputProps={{
        fontSize: "1.25rem",
        fontWeight: "500",
      }}
    />
  );
};

export default SheetCardTitleEdit;
