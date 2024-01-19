import React from "react";
import { Skeleton, Typography, Box } from "@mui/material";

const Skeletons = () => {
  return (
    <>
      <Typography component={"div"} variant="h3">
        <Skeleton sx={{ margin: "0 auto" }} variant="text" width={250} />
      </Typography>
      <Box sx={{ marginTop: "48px" }}>
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rectangular" height={60} sx={{ marginTop: "5px" }} />
        <Skeleton variant="rectangular" height={60} sx={{ marginTop: "5px" }} />
        <Skeleton variant="rectangular" height={60} sx={{ marginTop: "5px" }} />
      </Box>
    </>
  );
};

export default Skeletons;
