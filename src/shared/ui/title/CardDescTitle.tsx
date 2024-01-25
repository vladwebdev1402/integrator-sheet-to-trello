import React from "react";
import { Typography, Box } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const CardDescTitle = () => {
  return (
    <Box display="flex" gap="12px" alignItems="center">
      <DescriptionIcon />
      <Typography variant="overline" fontWeight={500} fontSize="15px">
        Description
      </Typography>
    </Box>
  );
};

export default CardDescTitle;
