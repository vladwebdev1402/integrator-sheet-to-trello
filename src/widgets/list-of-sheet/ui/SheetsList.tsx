import React, { useMemo, useState } from "react";

import { useAppSelector } from "@/shared/hooks";
import { ItemsContainer } from "@/shared/ui";

import { Spreadsheet, useGetAllSheetsQuery } from "@/entities/spreedsheet";

import { SpreadsheetAdd } from "@/features/spreadsheet-add";
import { ItemsSearch } from "@/features/items-search";
import { NotAuthSheetList } from "@/features/auth";

const SheetsList = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(20);
  const { data, isLoading, isFetching, isError } = useGetAllSheetsQuery(limit);
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
      <ItemsSearch
        activeSearch={search}
        setActiveSearch={setSearch}
        placeholder="Search spreadsheet with name..."
      />
      {!isAuth && <NotAuthSheetList />}
      {isAuth && <SpreadsheetAdd />}

      {isAuth && (
        <ItemsContainer
          isLoading={isLoading}
          isError={isError}
          isNotFound={filterData.length === 0}
          isVisibleMore={!!data && !!data.nextPageToken}
          isMoreFetching={isFetching}
          clickNextLimit={() => {
            setLimit(limit + 20);
          }}
          notFoundMessage="Oops, spreadsheets not found :("
          errorMessage="Oops, an error has occurred. Please reload the page :("
        >
          {filterData.map((file) => (
            <Spreadsheet sheet={file} key={file.id} />
          ))}
        </ItemsContainer>
      )}
    </div>
  );
};

export default SheetsList;
