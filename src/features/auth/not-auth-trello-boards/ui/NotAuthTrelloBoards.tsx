import React from "react";

import { Button, Box, Typography, Container } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "@/shared/constants";

const NotAuthTrelloBoards = () => {
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
        To get a list of boards, you need to log in to your Trello account
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

export default NotAuthTrelloBoards;
