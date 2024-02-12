import { useState, useMemo } from "react";
import { SvgIcon, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  ConvertSheetToTrello,
  ConvertTrelloToSheet,
  ConverterChoiceBoard,
  ConverterChoiceService,
  ConverterChoiceSpreadsheet,
} from "@/features/converter";
import { ConverterBody, ConverterContainer, ConverterFooter } from "./styled";
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

  const clearChoice = () => {
    setService("");
    setFromChoice("");
    setToChoice("");
  };

  const onFlip = () => {
    setService(service === "google" ? "trello" : "google");
    const fromCopy = fromChoice;
    setFromChoice(toChoice);
    setToChoice(fromCopy);
  };

  return (
    <ConverterContainer>
      <ConverterBody>
        {service === "" && (
          <ConverterChoiceService setService={setService} service={service} />
        )}
        {service === "trello" && (
          <ConverterChoiceBoard
            clearChoice={clearChoice}
            choice={{
              type: "from",
              current: fromChoice,
              setCurrent: setFromChoice,
            }}
          />
        )}
        {service === "google" && (
          <ConverterChoiceSpreadsheet
            clearChoice={clearChoice}
            choice={{
              type: "from",
              current: fromChoice,
              setCurrent: setFromChoice,
            }}
          />
        )}
        <IconButton disabled={service === ""} onClick={onFlip}>
          <ArrowForwardIcon fontSize="large" color={svgColor} />
        </IconButton>
        {service === "" && <DisableToChoiceSelect />}
        {service === "trello" && (
          <ConverterChoiceSpreadsheet
            clearChoice={clearChoice}
            choice={{
              type: "to",
              current: toChoice,
              setCurrent: setToChoice,
            }}
          />
        )}
        {service === "google" && (
          <ConverterChoiceBoard
            clearChoice={clearChoice}
            choice={{
              type: "to",
              current: toChoice,
              setCurrent: setToChoice,
            }}
          />
        )}
      </ConverterBody>
      <ConverterFooter>
        {service === "trello" && (
          <ConvertTrelloToSheet
            fromChoice={fromChoice}
            toChoice={toChoice}
            clearChoice={clearChoice}
          />
        )}
        {service === "google" && (
          <ConvertSheetToTrello
            fromChoice={fromChoice}
            toChoice={toChoice}
            clearChoice={clearChoice}
          />
        )}
      </ConverterFooter>
    </ConverterContainer>
  );
};

export default Converter;
