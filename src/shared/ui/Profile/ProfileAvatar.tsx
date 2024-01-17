import React, { FC } from "react";
import { Avatar, SxProps } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
interface Props {
  src: string;
  sx?: SxProps;
}

const ProfileAvatar: FC<Props> = ({ src, sx = {} }) => {
  const matches = useMediaQuery("(max-width:768px)");
  return (
    <Avatar
      src={src}
      sx={{
        margin: `${matches ? "0 auto" : ""}`,
        width: "140px",
        height: "140px",
        ...sx,
      }}
    />
  );
};

export default ProfileAvatar;
