import { FC, useMemo, ReactNode } from "react";
import { Box } from "@mui/material";

import st from "./ConverterSelectBox.module.scss";
import { BigSheetIcon, BoardIcon, DocumentIcon } from "@/shared/assets";

interface Props {
  type: "document" | "spredsheet" | "trello";
  order?: "forward" | "reverse";
  children: ReactNode;
}

const ConverterSelectBox: FC<Props> = ({
  type,
  order = "forward",
  children,
}) => {
  const Icon = useMemo(() => {
    if (type === "document") return DocumentIcon;
    if (type === "spredsheet") return BigSheetIcon;
    return BoardIcon;
  }, [type]);

  return (
    <Box
      display="flex"
      gap="12px"
      flexDirection={`${order === "forward" ? "row" : "row-reverse"}`}
    >
      <Icon className={`${st.icon}`} />
      {children}
    </Box>
  );
};

export default ConverterSelectBox;
