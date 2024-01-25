import React, { FC, useState } from "react";
import { Card, CardContent } from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import { LoadingButton } from "@mui/lab";
import EditValue from "../EditValue/EditValue";

interface Props {
  addCallback: (value: string) => void;
  isLoading?: boolean;
}

const CardAdd: FC<Props> = ({ addCallback, isLoading = false }) => {
  const [isAdd, setIsAdd] = useState(false);
  const addClick = () => {
    setIsAdd(true);
  };

  return (
    <Card>
      <CardContent
        sx={{
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isAdd && (
          <LoadingButton
            onClick={addClick}
            sx={{ whiteSpace: "nowrap" }}
            startIcon={<AddCardIcon />}
            loadingPosition="start"
            loading={isLoading}
          >
            add new card
          </LoadingButton>
        )}

        <EditValue
          callbackUpdate={addCallback}
          currentValue=""
          isEdit={isAdd}
          setIsEdit={setIsAdd}
          visibleEditIcon={false}
          placeholder="Enter the name of the card"
          type="area"
          areaConfig={{
            minRows: 2,
            maxRows: 2,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CardAdd;
