import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useGetAllCommentsQuery } from "../model/service";
import { CardCommentTitle, Comment, CommentSkeleton } from "@/shared/ui";
import { getTrelloAvatar } from "@/shared/lib";

const BoardCardComments = () => {
  const params = useParams<{ cardId: string }>();
  const { data, isLoading } = useGetAllCommentsQuery(params?.cardId ?? "");

  return (
    <Box marginTop="24px" display="flex" flexDirection="column" gap="12px">
      <CardCommentTitle />
      {isLoading && <CommentSkeleton />}
      {data && data.length === 0 && <>This card not have comments</>}
      {data &&
        data.map((comment) => (
          <Comment
            key={comment.id}
            avatarUrl={getTrelloAvatar(
              comment.idMemberCreator,
              comment.memberCreator.avatarHash
            )}
            date={comment.date}
            name={comment.memberCreator.fullName}
          >
            {comment.data.text}
          </Comment>
        ))}
    </Box>
  );
};

export default BoardCardComments;
