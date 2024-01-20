import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="text"
      color="inherit"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      sx={{
        position: "absolute",
        top: "5px",
      }}
    >
      go back
    </Button>
  );
};

export default ButtonBack;
