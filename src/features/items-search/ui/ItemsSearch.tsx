import React, { FC, useEffect, useState } from "react";

import { SearchField } from "@/shared/ui";
import { useDebounce } from "@/shared/hooks";
interface Props {
  activeSearch: string;
  setActiveSearch: (value: string) => void;
  placeholder?: string;
}

const ItemsSearch: FC<Props> = ({
  activeSearch,
  setActiveSearch,
  placeholder = "",
}) => {
  const [search, setSearch] = useState(activeSearch);

  const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debounceSearch = useDebounce(search);

  useEffect(() => {
    setActiveSearch(debounceSearch);
  }, [debounceSearch, setActiveSearch]);

  return (
    <SearchField
      placeholder={placeholder}
      value={search}
      onChange={searchChange}
    />
  );
};

export default ItemsSearch;
