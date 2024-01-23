import React, { FC, useState } from "react";

import { IBoard } from "@/shared/types";

import { Typography, Box } from "@mui/material";
import { useUpdateBoardMutation } from "@/entities/trello-board";
import { EditValue } from "@/shared/ui";

interface Props {
  board: IBoard;
}

const TrelloBoardEditDescription: FC<Props> = ({ board }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateBoard] = useUpdateBoardMutation();

  const updateCallback = (value: string) => {
    updateBoard({ ...board, desc: value });
  };

  const descriptionClick = () => {
    setIsEdit(true);
  };

  return (
    <Box display={"flex"} gap="5px" alignItems={"center"}>
      {!isEdit && (
        <Typography
          component="div"
          marginTop="8px"
          variant="subtitle1"
          sx={{ cursor: "pointer" }}
          onClick={descriptionClick}
        >
          {board.desc ? board.desc : "Add description"}
        </Typography>
      )}
      <EditValue
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        currentValue={board.desc}
        callbackUpdate={updateCallback}
        visibleEditIcon={false}
        type="area"
        areaConfig={{ maxRows: 5 }}
        allowedEmpty
      />
    </Box>
  );
};

export default TrelloBoardEditDescription;
