import React, { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";

const DetailCategory: FC<TypographyProps> = ({ children, sx = {} }) => {
  return (
    <Typography
      variant="overline"
      fontSize={"16px"}
      fontWeight={500}
      color="GrayText"
      component={"div"}
      sx={{ paddingLeft: "12px", ...sx }}
    >
      {children}
    </Typography>
  );
};

export default DetailCategory;
