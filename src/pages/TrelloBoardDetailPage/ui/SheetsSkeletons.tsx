import React from "react";
import { Box, Skeleton } from "@mui/material";

const SheetsSkeletons = () => {
  return (
    <Box marginTop={"48px"}>
      <Skeleton variant="rectangular" height={60} animation="wave" />
      <Skeleton
        variant="rectangular"
        height={60}
        sx={{ marginTop: "5px" }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        height={60}
        sx={{ marginTop: "5px" }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        height={60}
        sx={{ marginTop: "5px" }}
        animation="wave"
      />
    </Box>
  );
};

export default SheetsSkeletons;
