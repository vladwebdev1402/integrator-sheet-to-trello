import React, { FC, useState } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import { SpreadsheetEditName } from "@/features/spreadsheet-edit-name";

interface Props {
  title: string;
}

const NameSpreadsheet: FC<Props> = ({ title }) => {
  const [isEdit, setIsEdit] = useState(false);

  const mediaSM = useMediaQuery("(max-width: 568px)");

  return (
    <>
      <Typography
        variant="overline"
        fontSize={"16px"}
        fontWeight={500}
        color="GrayText"
        component={"div"}
        sx={{ marginTop: "16px", padding: "96px 0px 0px 12px" }}
      >
        spreadsheet name
      </Typography>
      <Box display={"flex"} gap={"5px"} padding="0" alignItems={"center"}>
        {!isEdit && (
          <Typography variant={mediaSM ? "h6" : "h5"} component={"div"}>
            {title}
          </Typography>
        )}
        <SpreadsheetEditName
          currentValue={title}
          setEdit={setIsEdit}
          isEdit={isEdit}
        />
      </Box>
    </>
  );
};

export default NameSpreadsheet;
