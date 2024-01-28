import { useGetBoardByIdQuery } from "@/entities/trello-board";
import { FC } from "react";
import { Skeleton } from "@mui/material";

interface Props {
  id: string;
}

const NameBoard: FC<Props> = ({ id }) => {
  const { data, isLoading, isError } = useGetBoardByIdQuery(id);

  if (isLoading)
    return (
      <Skeleton
        height="32px"
        width="100%"
        variant="rectangular"
        animation="wave"
      />
    );

  if (!isError && data) return data.name;
  return <>This board not found</>;
};

export default NameBoard;
