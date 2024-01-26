import React from "react";
import { Typography, Box } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
const CardShiftInsideTitle = () => {
  return (
    <Box display="flex" gap="12px" alignItems="center">
      <CreditCardIcon />
      <Typography variant="overline" fontWeight={500} fontSize="15px">
        Position
      </Typography>
    </Box>
  );
};

export default CardShiftInsideTitle;
