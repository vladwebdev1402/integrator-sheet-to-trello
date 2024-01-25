import React, { FC, useState } from "react";

import { IBoardCard } from "@/shared/types";
import { EditValue } from "@/shared/ui";
import { useUpdateCardMutation } from "@/entities/trello-board";

interface Props {
  card: IBoardCard;
}

const TrelloCardRename: FC<Props> = ({ card }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateCard, { isLoading }] = useUpdateCardMutation();

  const callbackUpdate = (value: string) => {
    updateCard({ ...card, name: value });
  };

  return (
    <>
      {!isEdit && <>{card.name}</>}

      <EditValue
        callbackUpdate={callbackUpdate}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        currentValue={card.name}
        isLoading={isLoading}
        placeholder="Enter name card"
        inputProps={{
          fontSize: "1.25rem",
          fontWeight: "500",
        }}
      />
    </>
  );
};

export default TrelloCardRename;
