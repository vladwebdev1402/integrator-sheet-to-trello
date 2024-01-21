import React from "react";
import { Skeleton, Typography, Box } from "@mui/material";

const SkeletonsSheetDetail = () => {
  return (
    <>
      <Typography component={"div"} variant="h3" sx={{ paddingTop: "96px" }}>
        <Skeleton variant="text" width={250} />
      </Typography>
      <Box sx={{ marginTop: "48px" }}>
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rectangular" height={60} sx={{ marginTop: "5px" }} />
        <Skeleton variant="rectangular" height={60} sx={{ marginTop: "5px" }} />
        <Skeleton variant="rectangular" height={60} sx={{ marginTop: "5px" }} />
      </Box>
      <Box display={"flex"} gap={"16px"} marginTop={"16px"}>
        <Skeleton width={130} height={50} />
        <Skeleton width={130} height={50} />
      </Box>
    </>
  );
};

export default SkeletonsSheetDetail;
