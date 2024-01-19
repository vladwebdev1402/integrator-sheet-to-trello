import React, { FC } from "react";
import { Card, CardContent } from "@mui/material";

import { ISheetCard } from "@/shared/types/ISheetCard";

interface Props {
  card: ISheetCard;
}

const SheetCard: FC<Props> = ({ card }) => {
  return (
    <Card>
      <CardContent>{card.title}</CardContent>
    </Card>
  );
};

export default SheetCard;
