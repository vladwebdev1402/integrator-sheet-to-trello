import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { LoadingButton } from "@mui/lab";

import { EditValue } from "@/shared/ui";
import { useCreateListMutation } from "@/entities/trello-board";

interface Props {
  isUpdating: boolean;
}

const TrelloListAdd: FC<Props> = ({ isUpdating }) => {
  const [isEdit, setIsEdit] = useState(false);
  const params = useParams<{ id: string }>();
  const mediaSM = useMediaQuery("(max-width: 568px)");

  const [createList, { isLoading }] = useCreateListMutation();

  const createClick = () => {
    setIsEdit(true);
  };
  const createCallback = (value: string) => {
    createList({
      idBoard: params?.id || "",
      name: value,
    });
  };

  return (
    <>
      {!isEdit && (
        <LoadingButton
          size="large"
          sx={{ height: "54px", margin: "5px 0px" }}
          variant={isLoading || isUpdating ? "contained" : "outlined"}
          fullWidth
          onClick={createClick}
          startIcon={<PlaylistAddIcon />}
          loading={isLoading || isUpdating}
        >
          add new sheet
        </LoadingButton>
      )}

      <EditValue
        callbackUpdate={createCallback}
        currentValue=""
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        type="area"
        visibleEditIcon={false}
        inputSize="meduim"
        placeholder="Enter the name of the sheet or leave it blank to cancel"
        sx={{ margin: "5px 0px" }}
        inputProps={{
          fontWeight: "500",
          fontSize: mediaSM ? "17px" : "20px",
        }}
      />
    </>
  );
};

export default TrelloListAdd;
