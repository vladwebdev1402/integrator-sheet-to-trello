import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";

const HeadSkeletons = () => {
  return (
    <Box>
      <Typography variant="h3">
        <Skeleton variant="text" width={150} animation="wave" />
      </Typography>

      <Skeleton
        width={"40%"}
        height="60px"
        variant="rectangular"
        animation="wave"
        sx={{ marginTop: "8px" }}
      />
    </Box>
  );
};

export default HeadSkeletons;
