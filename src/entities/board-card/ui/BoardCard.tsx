import React, { FC } from "react";

import { IBoardCard } from "@/shared/types";
import { CardContainer } from "@/shared/ui";

interface Props {
  card: IBoardCard;
}

const BoardCard: FC<Props> = ({ card }) => {
  const onOpen = () => {};

  return <CardContainer title={card.name} onOpen={onOpen} />;
};

export default BoardCard;
