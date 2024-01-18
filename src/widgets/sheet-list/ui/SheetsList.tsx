import React, { useState } from "react";

import { ItemsSearch } from "@/features/items-search";

const SheetsList = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <ItemsSearch activeSearch={search} setActiveSearch={setSearch} />
      {search}
    </div>
  );
};

export default SheetsList;
