import { useState, useMemo } from "react";
import { SvgIcon } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  ConverteChoiceToBoard,
  ConverterChoiceBoard,
  ConverterChoiceService,
  ConverterChoiceSpreadsheet,
  ConverterChoiceToSpreadsheet,
} from "@/features/converter";
import { ConverterBox } from "./styled";
import DisableToChoiceSelect from "./DisableToChoiceSelect";

const Converter = () => {
  const [service, setService] = useState("document");
  const [fromChoice, setFromChoice] = useState("");
  const [toChoice, setToChoice] = useState("");

  const svgColor = useMemo(() => {
    if (service === "document") return "disabled";
    if (service === "trello") return "info";
    return "secondary";
  }, [service]);

  return (
    <ConverterBox>
      {service === "document" && (
        <ConverterChoiceService setService={setService} />
      )}
      {service === "trello" && (
        <ConverterChoiceBoard
          setFromChoice={setFromChoice}
          setService={setService}
        />
      )}
      {service === "google" && (
        <ConverterChoiceSpreadsheet
          setFromChoice={setFromChoice}
          setService={setService}
        />
      )}
      <SvgIcon fontSize="large" color={svgColor}>
        <ArrowForwardIcon />
      </SvgIcon>
      {service === "document" && <DisableToChoiceSelect />}
      {service === "trello" && (
        <ConverterChoiceToSpreadsheet setToChoice={setToChoice} />
      )}
      {service === "google" && (
        <ConverteChoiceToBoard setToChoice={setToChoice} />
      )}
    </ConverterBox>
  );
};

export default Converter;
