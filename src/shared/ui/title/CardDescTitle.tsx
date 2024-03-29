import { Typography, Box } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const CardDescTitle = () => {
  return (
    <Box display="flex" gap="12px" alignItems="center">
      <DescriptionOutlinedIcon />
      <Typography variant="overline" fontWeight={500} fontSize="15px">
        Description
      </Typography>
    </Box>
  );
};

export default CardDescTitle;
