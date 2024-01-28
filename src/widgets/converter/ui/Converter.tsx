import { useState, useMemo } from "react";
import { SvgIcon } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  ConverterChoiceBoard,
  ConverterChoiceService,
  ConverterChoiceSpreadsheet,
} from "@/features/converter";
import { ConverterBody, ConverterContainer } from "./styled";
import DisableToChoiceSelect from "./DisableToChoiceSelect";
import { TServiceChoice } from "@/shared/types";

const Converter = () => {
  const [service, setService] = useState<TServiceChoice>("");
  const [fromChoice, setFromChoice] = useState("");
  const [toChoice, setToChoice] = useState("");

  const svgColor = useMemo(() => {
    if (service === "") return "disabled";
    if (service === "trello") return "info";
    return "secondary";
  }, [service]);

  return (
    <ConverterContainer>
      <ConverterBody>
        {service === "" && (
          <ConverterChoiceService setService={setService} service={service} />
        )}
        {service === "trello" && (
          <ConverterChoiceBoard
            setService={setService}
            choice={{
              type: "from",
              current: fromChoice,
              setCurrent: setFromChoice,
            }}
          />
        )}
        {service === "google" && (
          <ConverterChoiceSpreadsheet
            setService={setService}
            choice={{
              type: "from",
              current: fromChoice,
              setCurrent: setFromChoice,
            }}
          />
        )}
        <SvgIcon fontSize="large" color={svgColor}>
          <ArrowForwardIcon />
        </SvgIcon>
        {service === "" && <DisableToChoiceSelect />}
        {service === "trello" && (
          <ConverterChoiceSpreadsheet
            setService={setService}
            choice={{
              type: "to",
              current: toChoice,
              setCurrent: setToChoice,
            }}
          />
        )}
        {service === "google" && (
          <ConverterChoiceBoard
            setService={setService}
            choice={{
              type: "to",
              current: toChoice,
              setCurrent: setToChoice,
            }}
          />
        )}
      </ConverterBody>
    </ConverterContainer>
  );
};

export default Converter;
