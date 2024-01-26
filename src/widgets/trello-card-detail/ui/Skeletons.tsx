import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";

const Skeletons = () => {
  return (
    <Box padding={"20px"}>
      <Typography variant="h3">
        <Skeleton width={230} variant={"text"} animation="wave" />
      </Typography>
      <Skeleton
        width={"70%"}
        variant={"rectangular"}
        height="60px"
        animation="wave"
      />

      <Typography variant="h5" sx={{ marginTop: "24px" }}>
        <Skeleton width={230} variant={"text"} animation="wave" />
      </Typography>

      <Skeleton
        width={"230px"}
        variant={"rectangular"}
        height="60px"
        animation="wave"
      />

      <Typography variant="h5" sx={{ marginTop: "24px" }}>
        <Skeleton width={230} variant={"text"} animation="wave" />
      </Typography>

      <Skeleton
        width={"230px"}
        variant={"rectangular"}
        height="60px"
        animation="wave"
      />
    </Box>
  );
};

export default Skeletons;
