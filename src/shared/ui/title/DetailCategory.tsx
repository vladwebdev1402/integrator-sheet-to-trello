import { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";

const DetailCategory: FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography
      variant="overline"
      fontSize={"16px"}
      fontWeight={500}
      color="GrayText"
      component={"div"}
      {...props}
      sx={{ paddingLeft: "12px", ...props.sx }}
    >
      {children}
    </Typography>
  );
};

export default DetailCategory;
