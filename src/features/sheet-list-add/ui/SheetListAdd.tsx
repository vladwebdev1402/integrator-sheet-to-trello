import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { useAddNewListMutation } from "@/entities/spreedsheet";
import { ButtonAddNew } from "@/shared/ui";

interface Props {
  count: number;
  isUpdating: boolean;
}

const SheetListAdd: FC<Props> = ({ count, isUpdating }) => {
  const [addList, { isLoading }] = useAddNewListMutation();
  const params = useParams<{ id: string }>();
  const mediaMD = useMediaQuery("(max-width: 768px)");

  const addListClick = () => {
    if (params.id)
      addList({
        spreadsheetId: params.id,
        // name: `${count + new Date().getTime()}`, подумать что с этим сделать
        name: "",
      });
  };

  return (
    <ButtonAddNew
      isLoading={isLoading || isUpdating}
      onClick={addListClick}
      title="add new list"
      sx={{ flex: mediaMD ? "1 1 150px" : "" }}
    />
  );
};

export default SheetListAdd;
