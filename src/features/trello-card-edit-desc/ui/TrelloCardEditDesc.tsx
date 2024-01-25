import React, { FC, useState } from "react";

import { Typography } from "@mui/material";

import { IBoardCard } from "@/shared/types";
import { EditValue } from "@/shared/ui";
import { useUpdateCardMutation } from "@/entities/trello-board";

interface Props {
  card: IBoardCard;
}

const TrelloCardEditDesc: FC<Props> = ({ card }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateCard] = useUpdateCardMutation();

  const descriptionClick = () => {
    setIsEdit(true);
  };

  const callbackUpdate = (value: string) => {
    updateCard({ ...card, desc: value });
  };

  return (
    <>
      {!isEdit && (
        <Typography
          variant="body1"
          sx={{ cursor: "pointer" }}
          onClick={descriptionClick}
        >
          {card.desc || "Add description"}
        </Typography>
      )}

      <EditValue
        callbackUpdate={callbackUpdate}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        currentValue={card.desc}
        allowedEmpty
        visibleEditIcon={false}
        type={"area"}
        placeholder="Enter description card"
        areaConfig={{
          maxRows: 5,
        }}
      />
    </>
  );
};

export default TrelloCardEditDesc;
