import React, { FC } from "react";

import { IBoardList } from "@/shared/types";
import { CardAdd } from "@/shared/ui";
import { useAddCardMutation } from "@/entities/trello-board";

interface Props {
  list: IBoardList;
  isFetching: boolean;
}

const TrelloCardAdd: FC<Props> = ({ list, isFetching }) => {
  const [createCard, { isLoading }] = useAddCardMutation();

  const addCallback = (value: string) => {
    createCard({
      idList: list.id,
      name: value,
    });
  };

  return (
    <CardAdd addCallback={addCallback} isLoading={isFetching || isLoading} />
  );
};

export default TrelloCardAdd;
