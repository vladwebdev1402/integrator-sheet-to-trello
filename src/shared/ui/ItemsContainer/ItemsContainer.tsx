import React, { FC } from "react";
import { Typography } from "@mui/material";
import st from "./ItemsContainer.module.scss";
import Skeletons from "./Skeletons";
interface Props {
  isLoading: boolean;
  isError: boolean;
  isNotFound: boolean;
  errorMessage: string;
  notFoundMessage: string;
  children: React.ReactNode;
  className?: string;
}

const ItemsContainer: FC<Props> = ({
  isLoading,
  isError,
  isNotFound,
  errorMessage,
  notFoundMessage,
  children,
  className = "",
}) => {
  return (
    <div
      className={`${className} ${st.container} ${
        (isNotFound || isError) && !isLoading ? st.container_notFound : ""
      }`}
    >
      {isLoading && <Skeletons />}

      {!isNotFound && children}

      {isNotFound && !isError && !isLoading && (
        <Typography variant={"h4"} textAlign={"center"} component={"div"}>
          {notFoundMessage}
        </Typography>
      )}

      {isError && !isLoading && (
        <Typography
          variant={"h4"}
          textAlign={"center"}
          color={"red"}
          component={"div"}
        >
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default ItemsContainer;
