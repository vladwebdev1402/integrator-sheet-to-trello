import { Typography, Box } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

const CardCommentTitle = () => {
  return (
    <Box display="flex" gap="12px" alignItems="center">
      <CommentOutlinedIcon />
      <Typography variant="overline" fontWeight={500} fontSize="15px">
        Comments
      </Typography>
    </Box>
  );
};

export default CardCommentTitle;
