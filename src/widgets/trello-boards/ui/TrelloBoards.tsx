import React, { useState, useMemo } from "react";

import { ItemsContainer } from "@/shared/ui";
import { TrelloCard, useGetAllBoardQuery } from "@/entities/trello-board";
import { NotAuthTrelloBoards } from "@/features/auth/not-auth-trello-boards";
import { BoardAdd } from "@/features/board-add";
import { useAppSelector } from "@/shared/hooks";

const TrelloBoards = () => {
  const [limit, setLimit] = useState(12);

  const { isAuth } = useAppSelector((state) => state.AuthTrelloReducer);
  const { data, isLoading, isError } = useGetAllBoardQuery(null);

  const limitBoards = useMemo(() => {
    return data ? data.idBoards.slice(0, limit) : [];
  }, [data, limit]);

  const moreClick = () => {
    setLimit(limit + 12);
  };

  return (
    <div>
      {isAuth ? (
        <>
          <BoardAdd />
          <ItemsContainer
            clickNextLimit={moreClick}
            isVisibleMore={!!data && data.idBoards.length > limit}
            isNotFound={!!data && data.idBoards.length === 0}
            notFoundMessage="The workspace is empty. Create a new board"
            isLoading={isLoading}
            isError={!!isError}
            errorMessage={
              "Oops, an error has occurred. Please reload the page."
            }
          >
            {limitBoards.map((board) => (
              <TrelloCard id={board} key={board} />
            ))}
          </ItemsContainer>
        </>
      ) : (
        <></>
      )}

      {!isAuth && !isLoading && <NotAuthTrelloBoards />}
    </div>
  );
};

export default TrelloBoards;
