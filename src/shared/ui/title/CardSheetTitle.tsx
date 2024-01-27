import { FC } from "react";
import { Typography, Box } from "@mui/material";
import SegmentIcon from "@mui/icons-material/Segment";

interface Props {
  title?: string;
}

const CardSheetTitle: FC<Props> = ({ title = "Sheet" }) => {
  return (
    <Box display="flex" gap="12px" alignItems="center">
      <SegmentIcon />
      <Typography variant="overline" fontWeight={500} fontSize="15px">
        {title}
      </Typography>
    </Box>
  );
};

export default CardSheetTitle;
