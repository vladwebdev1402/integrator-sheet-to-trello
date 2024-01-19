import React from "react";
import { Skeleton } from "@mui/material";
const Skeletons = () => {
  return (
    <>
      <Skeleton height={150} variant={"rectangular"} />
      <Skeleton height={150} variant={"rectangular"} />
      <Skeleton height={150} variant={"rectangular"} />
    </>
  );
};

export default Skeletons;
