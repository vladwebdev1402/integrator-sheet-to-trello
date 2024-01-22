import React, { FC, useState, useEffect } from "react";
import {
  IconButton,
  Input,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { Textarea } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  currentValue: string;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  callbackUpdate: (newValue: string) => void;
  isLoading?: boolean;
  visibleEditIcon?: boolean;
  inputProps?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
  iconSize?: "small" | "inherit" | "large" | "medium";
  loaderSize?: string;
  type?: "area" | "input";
  placeholder?: string;
  areaConfig?: {
    minRows?: number;
    maxRows?: number;
  };
  allowedEmpty?: boolean;
}

const EditValue: FC<Props> = ({
  currentValue,
  isEdit,
  setIsEdit,
  callbackUpdate,
  isLoading = false,
  visibleEditIcon = true,
  inputProps = {},
  iconSize = "medium",
  loaderSize = "16px",
  type = "input",
  placeholder = "",
  areaConfig = {},
  allowedEmpty = false,
}) => {
  const [value, setValue] = useState(currentValue);

  const handleOpenEdit = () => {
    setIsEdit(true);
  };

  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  const valueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateValue();
  };

  const clickInput = (
    e: React.MouseEvent<HTMLDivElement | HTMLTextAreaElement>
  ) => {
    e.stopPropagation();
  };

  const updateValue = () => {
    handleCloseEdit();
    if ((value !== "" || allowedEmpty) && value !== currentValue)
      callbackUpdate(value);
  };

  useEffect(() => {
    setValue(currentValue);
  }, [isEdit, currentValue]);

  return (
    <>
      {isEdit && (
        <FormControl component="form" fullWidth onSubmit={formSubmit}>
          {type === "input" && (
            <Input
              value={value}
              onChange={valueChange}
              autoFocus
              onBlur={updateValue}
              placeholder={placeholder}
              inputProps={{ style: { ...inputProps } }}
              onClick={clickInput}
            />
          )}
          {type === "area" && (
            <Textarea
              value={value}
              onChange={valueChange}
              autoFocus
              onBlur={updateValue}
              placeholder={placeholder}
              maxRows={areaConfig.maxRows}
              minRows={areaConfig.minRows}
              sx={{
                fontSize: inputProps.fontSize,
                fontWeight: inputProps.fontWeight,
              }}
              onClick={clickInput}
            />
          )}
        </FormControl>
      )}
      {!isEdit && !isLoading && visibleEditIcon && (
        <IconButton onClick={handleOpenEdit}>
          <EditIcon fontSize={iconSize} />
        </IconButton>
      )}
      {isLoading && (
        <CircularProgress size={loaderSize} sx={{ marginLeft: "8px" }} />
      )}
    </>
  );
};

export default EditValue;
