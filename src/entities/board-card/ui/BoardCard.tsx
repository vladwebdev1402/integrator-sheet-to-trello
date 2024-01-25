import React, { FC } from "react";

import { IBoardCard } from "@/shared/types";
import { CardContainer } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "@/shared/constants";

interface Props {
  card: IBoardCard;
}

const BoardCard: FC<Props> = ({ card }) => {
  const navigate = useNavigate();
  const onOpen = () => {
    navigate(routerPaths.navigatetrelloCardDetail(card.id));
  };

  return <CardContainer title={card.name} onOpen={onOpen} />;
};

export default BoardCard;
