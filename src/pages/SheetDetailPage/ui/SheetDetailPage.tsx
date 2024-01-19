import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";

import st from "./SheetDetailPage.module.scss";
import { SheetList } from "@/widgets/sheet-list";
import { useGetSpreadSheetByIdQuery } from "@/entities/spreedsheet";
import { ButtonBack } from "@/shared/ui";
import Skeletons from "./Skeletons";
import { SheetListAdd } from "@/features/sheet-card-add";
const SheetDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isFetching } = useGetSpreadSheetByIdQuery(
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
          data.sheets.map(({ properties: sheet }, idx) => (
            <SheetList
              title={sheet.title}
              sheetId={sheet.sheetId}
              expanded={idx === 0}
              key={sheet.sheetId}
            />
          ))}
        {!isLoading && (
          <SheetListAdd
            count={data && data.sheets ? data.sheets.length : 0}
            isUpdating={isFetching}
          />
        )}
      </Box>
    </div>
  );
};

export default SheetDetailPage;
