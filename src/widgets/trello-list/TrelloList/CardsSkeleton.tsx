import React from "react";
import { Skeleton } from "@mui/material";

const CardsSkeleton = () => {
  return (
    <>
      <Skeleton height={150} variant="rectangular" animation="wave" />
      <Skeleton height={150} variant="rectangular" animation="wave" />
      <Skeleton height={150} variant="rectangular" animation="wave" />
    </>
  );
};

export default CardsSkeleton;
