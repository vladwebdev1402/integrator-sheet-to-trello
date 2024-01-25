import React from "react";
import { Typography, Box } from "@mui/material";
import SegmentIcon from "@mui/icons-material/Segment";

const CardSheetTitle = () => {
  return (
    <Box display="flex" gap="12px" alignItems="center">
      <SegmentIcon />
      <Typography variant="overline" fontWeight={500} fontSize="15px">
        Description
      </Typography>
    </Box>
  );
};

export default CardSheetTitle;
