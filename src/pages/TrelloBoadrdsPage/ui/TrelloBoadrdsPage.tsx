import React from "react";

import st from "./TrelloBoadrdsPage.module.scss";
import { TrelloBoards } from "@/widgets/trello-boards";

const TrelloBoadrdsPage = () => {
  return (
    <div className={`container ${st.boards}`}>
      <TrelloBoards />
    </div>
  );
};

export default TrelloBoadrdsPage;
