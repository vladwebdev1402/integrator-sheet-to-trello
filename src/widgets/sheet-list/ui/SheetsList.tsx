import React, { useMemo, useState } from "react";
import { Typography } from "@mui/material";
import st from "./SheetList.module.scss";

import { useGetAllSheetsQuery } from "@/entities/sheet-list";
import { Spreadsheet } from "@/entities/spreedsheet";

import { ItemsSearch } from "@/features/items-search";
import Skeletons from "./Skeletons";
import { useAppSelector } from "@/shared/hooks";
import { NotAuthSheetList } from "@/features/auth";

const SheetsList = () => {
  const [search, setSearch] = useState("");
  const { data, isFetching, isError } = useGetAllSheetsQuery(null);
  const { isAuth } = useAppSelector((state) => state.AuthGoogleReducer);

  const filterData = useMemo(() => {
    return data
      ? data.files.filter((file) =>
          file.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
      : [];
  }, [data, search]);

  return (
    <div>
      <ItemsSearch activeSearch={search} setActiveSearch={setSearch} />
      {!isAuth && <NotAuthSheetList />}

      {isAuth && (
        <div
          className={`${st.list__body} ${
            (filterData.length === 0 || isError) && !isFetching
              ? st.list__notFound
              : ""
          }`}
        >
          {isFetching && <Skeletons />}

          {data &&
            filterData.map((file) => (
              <Spreadsheet sheet={file} key={file.id} />
            ))}

          {data && filterData.length === 0 && (
            <Typography variant={"h4"} textAlign={"center"} component={"div"}>
              Oops, spreadsheets not found :(
            </Typography>
          )}

          {isError && (
            <Typography
              variant={"h4"}
              textAlign={"center"}
              color={"red"}
              component={"div"}
            >
              Oops, an error has occurred. Please reload the page :(
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default SheetsList;
