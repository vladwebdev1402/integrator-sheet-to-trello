import React, { FC } from "react";
import { Avatar, SxProps } from "@mui/material";
interface Props {
  src: string;
  sx?: SxProps;
}

const ProfileAvatar: FC<Props> = ({ src, sx = {} }) => {
  return (
    <Avatar
      src={src}
      sx={{
        margin: `0 auto 32px`,
        width: "140px",
        height: "140px",
        ...sx,
      }}
    />
  );
};

export default ProfileAvatar;
