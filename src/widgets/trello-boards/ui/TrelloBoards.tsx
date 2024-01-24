import React, { useState, useMemo } from "react";

import { ItemsContainer } from "@/shared/ui";
import { BoardCard, useGetAllBoardQuery } from "@/entities/trello-board";
import { NotAuthTrelloBoards } from "@/features/auth/not-auth-trello-boards";
import { BoardAdd } from "@/features/board-add";

const TrelloBoards = () => {
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useGetAllBoardQuery(null);

  const limitBoards = useMemo(() => {
    return data ? data.idBoards.slice(0, limit) : [];
  }, [data, limit]);

  const moreClick = () => {
    setLimit(limit + 10);
  };

  return (
    <div>
      <BoardAdd />
      <ItemsContainer
        clickNextLimit={moreClick}
        isVisibleMore={!!data && data.idBoards.length > limit}
        isNotFound={!!data && data.idBoards.length === 0}
        notFoundMessage="The workspace is empty. Create a new board"
        isLoading={isLoading}
        isError={!!isError}
        errorMessage={"Oops, an error has occurred. Please reload the page."}
      >
        {limitBoards.map((board) => (
          <BoardCard id={board} key={board} />
        ))}
      </ItemsContainer>
      {!data && !isLoading && <NotAuthTrelloBoards />}
    </div>
  );
};

export default TrelloBoards;
