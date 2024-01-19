import React, { useMemo, useState } from "react";

import { useGetAllSheetsQuery } from "@/entities/sheet-list";
import { Spreadsheet } from "@/entities/spreedsheet";

import { ItemsSearch } from "@/features/items-search";
import { useAppSelector } from "@/shared/hooks";
import { NotAuthSheetList } from "@/features/auth";
import { ItemsContainer } from "@/shared/ui";

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
        <ItemsContainer
          isLoading={isFetching}
          isError={isError}
          isNotFound={filterData.length === 0}
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
