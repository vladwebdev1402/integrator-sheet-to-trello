import React from "react";
import st from "./SheetsListPage.module.scss";

import { SheetsList } from "@/widgets/sheet-list";

const SheetsListPage = () => {
  return (
    <div className={`container ${st.sheets}`}>
      <SheetsList />
    </div>
  );
};

export default SheetsListPage;
