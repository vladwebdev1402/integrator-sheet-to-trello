import React, { FC } from "react";
import { useMediaQuery, Typography, TypographyProps } from "@mui/material";

const DetailPageTitle: FC<TypographyProps> = ({ children, sx }) => {
  const mediaSM = useMediaQuery("(max-width: 568px)");

  return (
    <Typography
      variant={mediaSM ? "h6" : "h5"}
      component={"div"}
      sx={{ ...sx }}
    >
      {children}
    </Typography>
  );
};

export default DetailPageTitle;
