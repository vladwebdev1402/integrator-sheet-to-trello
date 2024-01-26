import React, { FC } from "react";

import { IBoardCard } from "@/shared/types";
import { ButtonDelete } from "@/shared/ui";
import { useDeleteCardMutation } from "@/entities/trello-board";
import { useNavigate } from "react-router-dom";

interface Props {
  card: IBoardCard;
}

const TrelloCardDelete: FC<Props> = ({ card }) => {
  const navigate = useNavigate();
  const [deleteCard] = useDeleteCardMutation();

  const deleteClick = () => {
    navigate(-1);
    setTimeout(() => {
      deleteCard(card);
    }, 50);
  };

  return <ButtonDelete onClick={deleteClick}>delete</ButtonDelete>;
};

export default TrelloCardDelete;
