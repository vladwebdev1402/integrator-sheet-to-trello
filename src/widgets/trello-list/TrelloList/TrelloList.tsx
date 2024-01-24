import React, { FC } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from "@mui/material";

import { IBoardList } from "@/shared/types/IBoardList";
import ListSummary from "@/shared/ui/ListSummary/ListSummary";

interface Props {
  list: IBoardList;
  expanded: boolean;
}

const TrelloList: FC<Props> = ({ list, expanded }) => {
  return (
    <Accordion defaultExpanded={expanded}>
      <ListSummary title={list.name} badgeContent={0}>
        <></>
      </ListSummary>
    </Accordion>
  );
};

export default TrelloList;
