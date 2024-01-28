import { useState, useMemo } from "react";
import { SvgIcon } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  ConverterChoiceBoard,
  ConverterChoiceService,
  ConverterChoiceSpreadsheet,
} from "@/features/converter";
import { ConverterBox } from "./styled";
import DisableToChoiceSelect from "./DisableToChoiceSelect";
import { TServiceChoice } from "@/shared/types";

const Converter = () => {
  const [service, setService] = useState<TServiceChoice>("document");
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
          setToChoice={setToChoice}
          setService={setService}
          choice={"from"}
        />
      )}
      {service === "google" && (
        <ConverterChoiceSpreadsheet
          setFromChoice={setFromChoice}
          setToChoice={setToChoice}
          setService={setService}
          choice={"from"}
        />
      )}
      <SvgIcon fontSize="large" color={svgColor}>
        <ArrowForwardIcon />
      </SvgIcon>
      {service === "document" && <DisableToChoiceSelect />}
      {service === "trello" && (
        <ConverterChoiceSpreadsheet
          setFromChoice={setFromChoice}
          setToChoice={setToChoice}
          setService={setService}
          choice={"to"}
        />
      )}
      {service === "google" && (
        <ConverterChoiceBoard
          setFromChoice={setFromChoice}
          setToChoice={setToChoice}
          setService={setService}
          choice={"to"}
        />
      )}
    </ConverterBox>
  );
};

export default Converter;
