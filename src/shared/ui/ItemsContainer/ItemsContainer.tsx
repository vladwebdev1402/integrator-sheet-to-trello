import React, { FC } from "react";
import { Typography, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import st from "./ItemsContainer.module.scss";
import Skeletons from "./Skeletons";
interface Props {
  isLoading?: boolean;
  isError?: boolean;
  isNotFound?: boolean;
  isVisibleMore?: boolean;
  isMoreFetching?: boolean;
  errorMessage?: string;
  notFoundMessage?: string;
  children: React.ReactNode;
  clickNextLimit?: () => void;
  className?: string;
}

const ItemsContainer: FC<Props> = ({
  isLoading = false,
  isError = false,
  isNotFound = false,
  isVisibleMore = false,
  isMoreFetching = false,
  errorMessage = "",
  notFoundMessage = "",
  children,
  className = "",
  clickNextLimit = () => {},
}) => {
  return (
    <div className={st.contaner}>
      <div
        className={`${className} ${st.container__body} ${
          (isNotFound || isError) && !isLoading
            ? st.container___body_notFound
            : ""
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
      {isVisibleMore && !isNotFound && !isError && !isLoading && (
        <Box textAlign={"center"} sx={{ marginTop: "16px" }}>
          <LoadingButton
            loading={isMoreFetching}
            variant="contained"
            onClick={clickNextLimit}
          >
            show more
          </LoadingButton>
        </Box>
      )}
    </div>
  );
};

export default ItemsContainer;
