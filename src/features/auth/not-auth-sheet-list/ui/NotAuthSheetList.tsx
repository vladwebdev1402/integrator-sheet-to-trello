import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";

import { routerPaths } from "@/shared/constants";
const NotAuthSheetList = () => {
  const navigate = useNavigate();

  const goAuthorizeClick = () => {
    navigate(routerPaths.profile);
  };

  return (
    <Container>
      <Typography
        textAlign={"center"}
        variant="h4"
        component={"div"}
        marginTop={"32px"}
      >
        To get a list of spreadsheets, you need to log in to your Google account
      </Typography>

      <Box sx={{ marginTop: "8px" }} textAlign="center">
        <Button
          variant={"contained"}
          onClick={goAuthorizeClick}
          startIcon={<LaunchIcon />}
        >
          Go to authorize
        </Button>
      </Box>
    </Container>
  );
};

export default NotAuthSheetList;
