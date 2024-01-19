import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";

import st from "./SheetDetailPage.module.scss";
import { useGetSheetByIdQuery } from "@/entities/spreedsheet";
import { ButtonBack } from "@/shared/ui";
import { SheetList } from "@/widgets/sheet-list";
import Skeletons from "./Skeletons";
const SheetDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetSheetByIdQuery(
    params?.id ?? "no-id"
  );

  return (
    <div className={`container ${st.sheet}`}>
      <ButtonBack />
      {isLoading && <Skeletons />}
      {data && (
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{ margin: "0 100px" }}
          component={"div"}
        >
          {data.properties.title}
        </Typography>
      )}
      <Box sx={{ marginTop: "48px" }}>
        {data &&
          data.sheets.map(({ properties: sheet }) => (
            <SheetList
              title={sheet.title}
              sheetId={sheet.sheetId}
              key={sheet.sheetId}
            />
          ))}
      </Box>
    </div>
  );
};

export default SheetDetailPage;
