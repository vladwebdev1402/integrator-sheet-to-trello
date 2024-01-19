import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { useAddNewListMutation } from "@/entities/spreedsheet";
import { ButtonAddNew } from "@/shared/ui";

interface Props {
  count: number;
  isUpdating: boolean;
}

const SheetListAdd: FC<Props> = ({ count, isUpdating }) => {
  const [addList, { isLoading }] = useAddNewListMutation();
  const params = useParams<{ id: string }>();

  const addListClick = () => {
    if (params.id) addList({ spreadsheetId: params.id, name: `${count}` });
  };

  return (
    <Box textAlign={"center"} sx={{ marginTop: "16px" }}>
      <ButtonAddNew
        isLoading={isLoading || isUpdating}
        onClick={addListClick}
        title="add new list"
      />
    </Box>
  );
};

export default SheetListAdd;
