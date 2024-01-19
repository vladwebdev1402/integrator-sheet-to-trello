import React, { FC } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import st from "./Spreadsheet.module.scss";

import { ISpreedsheet } from "@/shared/types/ISpredsheets";
import { SheetIcon } from "@/shared/assets";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "@/shared/constants";

interface Props {
  sheet: ISpreedsheet;
}
const Spreadsheet: FC<Props> = ({ sheet }) => {
  const navigate = useNavigate();

  const spreadsheetClick = () => {
    navigate(routerPaths.navigateSheetDetail(sheet.id));
  };

  return (
    <Card>
      <CardActionArea sx={{ height: "100%" }} onClick={spreadsheetClick}>
        <CardContent sx={{ height: "100%" }}>
          <SheetIcon className={st.sheet__icon} />
          <Typography
            component={"div"}
            color={"gray"}
            fontWeight={500}
            textAlign={"center"}
            sx={{ marginTop: "8px" }}
          >
            {sheet.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Spreadsheet;
