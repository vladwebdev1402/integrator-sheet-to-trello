import React from "react";
import { Box, Skeleton } from "@mui/material";
const ActionsSkeletons = () => {
  return (
    <Box display={"flex"} gap={"16px"} marginTop={"16px"}>
      <Skeleton width={130} height={50} />
      <Skeleton width={130} height={50} />
    </Box>
  );
};

export default ActionsSkeletons;
