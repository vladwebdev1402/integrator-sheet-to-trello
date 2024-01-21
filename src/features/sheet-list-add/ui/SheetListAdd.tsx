import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import { useAddNewListMutation } from "@/entities/spreedsheet";
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
    <LoadingButton
      loading={isLoading || isUpdating}
      onClick={addListClick}
      sx={{ whiteSpace: "nowrap", flex: mediaMD ? "1 1 150px" : "" }}
      startIcon={<PlaylistAddIcon />}
      loadingPosition="start"
    >
      add new sheet
    </LoadingButton>
  );
};

export default SheetListAdd;
