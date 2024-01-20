import React, { FC } from "react";
import { TextField, SxProps, InputAdornment, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  sx?: SxProps;
  onConfirm?: () => void;
  inputStyle?: any;
}

const InputEdit: FC<Props> = ({
  placeholder = "",
  value = "",
  disabled = false,
  onBlur = () => {},
  onConfirm = null,
  onChange = () => {},
  sx = {},
  className = "",
  inputStyle,
}) => {
  return (
    <TextField
      autoFocus
      sx={sx}
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      onBlur={onBlur}
      variant="standard"
      InputProps={{
        style: { ...inputStyle },
        endAdornment: (
          <InputAdornment position="end">
            {onConfirm ? (
              <IconButton
                onClick={onConfirm}
                color="success"
                disabled={disabled}
              >
                <CheckIcon />
              </IconButton>
            ) : (
              ""
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputEdit;
