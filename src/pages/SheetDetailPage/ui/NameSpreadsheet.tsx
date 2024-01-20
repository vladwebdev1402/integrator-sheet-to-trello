import React, { FC, useState } from "react";
import { Typography, Box, IconButton, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { SpreadsheetEditName } from "@/features/spreadsheet-edit-name";

interface Props {
  title: string;
}

const NameSpreadsheet: FC<Props> = ({ title }) => {
  const [isEdit, setIsEdit] = useState(false);
  const editClick = () => {
    setIsEdit(true);
  };

  const mediaSM = useMediaQuery("(max-width: 568px)");

  return (
    <Box
      display={"flex"}
      sx={{ padding: "96px 0px 0px 0px" }}
      gap={"5px"}
      padding="0"
      alignItems={"center"}
    >
      {!isEdit && (
        <>
          <Typography variant={mediaSM ? "h6" : "h5"} component={"div"}>
            {title}
          </Typography>

          <IconButton size={"small"} onClick={editClick}>
            <EditIcon />
          </IconButton>
        </>
      )}
      <SpreadsheetEditName
        currentValue={title}
        setEdit={setIsEdit}
        isEdit={isEdit}
      />
    </Box>
  );
};

export default NameSpreadsheet;
