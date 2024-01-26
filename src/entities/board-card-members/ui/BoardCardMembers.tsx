import { useParams } from "react-router-dom";
import { Box, Avatar, AvatarGroup, Skeleton } from "@mui/material";

import { CardMembersTitle } from "@/shared/ui";
import { useGetlAllMembersQuery } from "../model/service";
import { getTrelloAvatar } from "@/shared/lib";

const BoardCardMembers = () => {
  const params = useParams<{ cardId: string }>();

  const { data, isLoading, isError } = useGetlAllMembersQuery(
    params?.cardId || ""
  );

  return (
    <>
      {(data === undefined || isLoading || data.length > 0) && !isError && (
        <Box display="flex" alignItems="center" gap="15px">
          <CardMembersTitle />
          <AvatarGroup max={5}>
            {data &&
              data.map((member) => (
                <Avatar
                  src={getTrelloAvatar(member.id, member.avatarHash)}
                  sx={{ height: "24px", width: "24px" }}
                />
              ))}
            {isLoading && (
              <>
                <Skeleton width="24px" height="24px" variant="circular" />
                <Skeleton width="24px" height="24px" variant="circular" />
                <Skeleton width="24px" height="24px" variant="circular" />
              </>
            )}
          </AvatarGroup>
        </Box>
      )}
    </>
  );
};

export default BoardCardMembers;
