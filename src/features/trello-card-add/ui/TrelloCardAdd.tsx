import React, { FC } from "react";

import { IBoardList } from "@/shared/types";
import { CardAdd } from "@/shared/ui";
import { useAddCardMutation } from "@/entities/trello-board";

interface Props {
  list: IBoardList;
}

const TrelloCardAdd: FC<Props> = ({ list }) => {
  const [createCard, { isLoading }] = useAddCardMutation();

  const addCallback = (value: string) => {
    createCard({
      idList: list.id,
      name: value,
    });
  };

  return <CardAdd addCallback={addCallback} isLoading={isLoading} />;
};

export default TrelloCardAdd;
