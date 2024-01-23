import React, { useState, useMemo } from "react";

import { ItemsContainer } from "@/shared/ui";
import { useAppSelector } from "@/shared/hooks";
import { BoardCard } from "@/entities/trello-board";
import { NotAuthTrelloBoards } from "@/features/auth/not-auth-trello-boards";

const TrelloBoards = () => {
  const [limit, setLimit] = useState(10);

  const { user, isLoading, error } = useAppSelector(
    (state) => state.AuthTrelloReducer
  );

  const limitBoards = useMemo(() => {
    return user ? user.boards.slice(0, limit) : [];
  }, [user, limit]);

  const moreClick = () => {
    setLimit(limit + 10);
  };

  return (
    <div>
      <ItemsContainer
        clickNextLimit={moreClick}
        isVisibleMore={!!user && user.boards.length > limit}
        notFoundMessage="Your boards not found :("
        isNotFound={!!user && user.boards.length === 0}
        isLoading={isLoading}
        isError={!!error}
        errorMessage={"Oops, an error has occurred. Please reload the page."}
      >
        {limitBoards.map((board) => (
          <BoardCard id={board} key={board} />
        ))}
      </ItemsContainer>
      {!user && !isLoading && <NotAuthTrelloBoards />}
    </div>
  );
};

export default TrelloBoards;
