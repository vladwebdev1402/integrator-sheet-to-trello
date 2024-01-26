import { FC } from "react";
import { Box } from "@mui/material";
import { colors } from "./colors";

interface Props {
  children: React.ReactNode;
  color: string;
}

const Label: FC<Props> = ({ children, color }) => {
  return (
    <Box
      sx={{
        backgroundColor: colors[color],
        color: color.includes("dark") ? "white" : "black",
      }}
      padding="10px 15px"
    >
      {children}
    </Box>
  );
};

export default Label;
