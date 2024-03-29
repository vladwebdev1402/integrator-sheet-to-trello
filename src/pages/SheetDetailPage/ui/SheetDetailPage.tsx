import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, useMediaQuery, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useGetSpreadSheetByIdQuery } from "@/entities/spreedsheet";
import { SheetListAdd } from "@/features/sheet-list-add";
import { SpreadsheetDelete } from "@/features/spreadsheet-delete";
import { SheetList } from "@/widgets/sheet-list";
import { ButtonBack, DetailCategory } from "@/shared/ui";

import st from "./SheetDetailPage.module.scss";
import SkeletonsSheetDetail from "./SkeletonsSheetDetail";
import NameSpreadsheet from "./NameSpreadsheet";

const SheetDetailPage = () => {
  const params = useParams<{ id: string }>();
  const mediaMD = useMediaQuery("(max-width: 768px)");

  const { data, isLoading, isFetching, isError } = useGetSpreadSheetByIdQuery(
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
      {data && (
        <>
          <NameSpreadsheet title={data.properties.title} />
          <DetailCategory sx={{ marginTop: "32px" }}>
            your sheets
          </DetailCategory>
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
          <DetailCategory sx={{ marginTop: "32px" }}>
            spreadsheet actions
          </DetailCategory>
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
      {isError && (
        <Typography
          textAlign={"center"}
          paddingTop={"92px"}
          variant={mediaMD ? "h6" : "h5"}
        >
          The spreadsheet was not found. Go back to the list of your tables.
        </Typography>
      )}
      {isLoading && <SkeletonsSheetDetail />}
    </div>
  );
};

export default SheetDetailPage;
