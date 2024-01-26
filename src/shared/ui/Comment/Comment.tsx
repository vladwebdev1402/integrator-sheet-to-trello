import { FC } from "react";

import { Avatar, Card, CardHeader, CardContent } from "@mui/material";

interface Props {
  name: string;
  avatarUrl: string;
  date: string;
  children: React.ReactNode;
}

const Comment: FC<Props> = ({ name, avatarUrl, children, date }) => {
  return (
    <Card sx={{ maxWidth: "640px" }}>
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        title={name}
        subheader={`${new Date(date).toLocaleString("ru")}`}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default Comment;
