import React, { FC } from "react";
import { useMediaQuery, Typography, TypographyProps } from "@mui/material";

const DetailPageTitle: FC<TypographyProps> = ({ children, ...props }) => {
  const mediaSM = useMediaQuery("(max-width: 568px)");

  return (
    <Typography variant={mediaSM ? "h6" : "h5"} component={"div"} {...props}>
      {children}
    </Typography>
  );
};

export default DetailPageTitle;
