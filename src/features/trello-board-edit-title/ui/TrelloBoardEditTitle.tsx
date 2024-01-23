import React, { FC, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

import { DetailCategory, DetailPageTitle, EditValue } from "@/shared/ui";
import { IBoard } from "@/shared/types";
import { useUpdateBoardMutation } from "@/entities/trello-board";

interface Props {
  board: IBoard;
}

const TrelloBoardEditTitle: FC<Props> = ({ board }) => {
  const mediaSM = useMediaQuery("(max-width: 568px)");
  const [isEdit, setIsEdit] = useState(false);

  const [updateBoard, { isLoading }] = useUpdateBoardMutation();

  const updateCallback = (value: string) => {
    updateBoard({ ...board, name: value });
  };

  return (
    <>
      <DetailCategory>your board</DetailCategory>
      <Box display={"flex"} gap="5px" alignItems={"center"}>
        {!isEdit && <DetailPageTitle>{board.name}</DetailPageTitle>}
        <EditValue
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          callbackUpdate={updateCallback}
          currentValue={board["name"]}
          inputProps={{ fontSize: mediaSM ? "1.25rem" : "1.5rem" }}
          isLoading={isLoading}
        />
      </Box>
    </>
  );
};

export default TrelloBoardEditTitle;
