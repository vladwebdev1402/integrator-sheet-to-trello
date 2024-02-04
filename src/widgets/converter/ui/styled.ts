import {Box, BoxProps} from "@mui/material";
import {styled} from "@mui/material/styles";

export const ConverterContainer = styled(Box)<BoxProps>(() => ({
    margin:"64px auto 0",
    maxWidth:"720px",
}))

export const ConverterBody = styled(Box)<BoxProps>(() => ({
    display:"flex",
    justifyContent:"center",
    gap:"15px",
    marginTop:"64px",
    alignItems:"center",
}))

export const ConverterFooter = styled(Box)<BoxProps>(() => ({
    marginTop:"32px",
}))
