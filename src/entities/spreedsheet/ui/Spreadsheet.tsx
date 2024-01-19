import React, { FC } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import st from "./Spreadsheet.module.scss";

import { ISpreedsheet } from "@/shared/types/ISpredsheets";
import { SheetIcon } from "@/shared/assets";

interface Props {
  sheet: ISpreedsheet;
}
const Spreadsheet: FC<Props> = ({ sheet }) => {
  return (
    <Card>
      <CardActionArea sx={{ height: "100%" }}>
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
