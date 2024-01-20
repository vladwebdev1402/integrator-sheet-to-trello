import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, useMediaQuery, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useGetSpreadSheetByIdQuery } from "@/entities/spreedsheet";
import { SheetListAdd } from "@/features/sheet-list-add";
import { SpreadsheetDelete } from "@/features/spreadsheet-delete";
import { SheetList } from "@/widgets/sheet-list";
import { ButtonBack } from "@/shared/ui";

import st from "./SheetDetailPage.module.scss";
import Skeletons from "./Skeletons";
import NameSpreadsheet from "./NameSpreadsheet";

const SheetDetailPage = () => {
  const params = useParams<{ id: string }>();
  const mediaMD = useMediaQuery("(max-width: 768px)");

  const { data, isLoading, isFetching } = useGetSpreadSheetByIdQuery(
    params?.id ?? "no-id"
  );

  const countSheets = useMemo(() => {
    return data && data.sheets ? data.sheets.length : 0;
  }, [data]);

  const seeSpredsheetClick = () => {
    window.open(data?.spreadsheetUrl, "_blank");
  };

  return (
    <div className={`container ${st.sheet}`}>
      <ButtonBack />
      {isLoading && <Skeletons />}
      {data && (
        <>
          <NameSpreadsheet title={data.properties.title} />
          <Typography
            variant="overline"
            fontSize={"16px"}
            fontWeight={500}
            color="GrayText"
            component={"div"}
            sx={{ marginTop: "16px", paddingLeft: "12px" }}
          >
            Your Sheets
          </Typography>
          <Box>
            {data.sheets.map(({ properties: sheet }, idx) => (
              <SheetList
                title={sheet.title}
                sheetId={sheet.sheetId}
                expanded={idx === 0}
                visibleDelete={countSheets > 1}
                key={sheet.sheetId}
              />
            ))}
          </Box>
        </>
      )}

      {!isLoading && data && (
        <>
          <Typography
            variant="overline"
            fontSize={"16px"}
            fontWeight={500}
            color="GrayText"
            component={"div"}
            sx={{ marginTop: "16px", paddingLeft: "12px" }}
          >
            spreadsheet actions
          </Typography>
          <Box display={"flex"} gap={"16px"} flexWrap={"wrap"}>
            <SheetListAdd count={countSheets} isUpdating={isFetching} />
            <Button
              color="secondary"
              startIcon={<OpenInNewIcon />}
              onClick={seeSpredsheetClick}
              sx={{ flex: mediaMD ? "1 1 150px" : "", whiteSpace: "nowrap" }}
            >
              see spreadsheet
            </Button>
            <SpreadsheetDelete />
          </Box>
        </>
      )}
    </div>
  );
};

export default SheetDetailPage;
