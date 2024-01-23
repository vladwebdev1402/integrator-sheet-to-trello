import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Snackbar,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { BoardColorPicker } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "@/shared/constants";
import { useCreateBoardMutation } from "@/entities/trello-board";

const BoardAdd = () => {
  const [createBoard, { data, isSuccess, isLoading, isError }] =
    useCreateBoardMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    name: { value: "", isError: false },
    description: "",
    theme: "blue",
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (board.name.value === "")
      setBoard({ ...board, name: { ...board.name, isError: true } });
    else {
      createBoard({
        desc: board.description,
        name: board.name.value,
        prefs_background: board.theme,
      });
    }
  };

  const colorBoardThemeChange = (value: string) => {
    setBoard({ ...board, theme: value });
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoard({
      ...board,
      name: { ...board.name, value: e.target.value, isError: false },
    });
  };

  const descChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoard({ ...board, description: e.target.value });
  };

  useEffect(() => {
    setBoard({
      name: { value: "", isError: false },
      description: "",
      theme: "blue",
    });
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) setSnackbarOpen(true);
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data) navigate(routerPaths.navigateTrelloDetail(data.id));
  }, [isSuccess, data, navigate]);

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleOpen}
      >
        Create new board
      </Button>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Create new board</DialogTitle>
        <DialogContent sx={{ overflow: "visible" }}>
          <FormControl onSubmit={submitForm} component="form" fullWidth>
            <TextField
              label="Name board *"
              onChange={nameChange}
              value={board.name.value}
              error={board.name.isError}
              helperText={
                board.name.isError ? "Enter the name of the board" : ""
              }
            />
            <TextField
              label="Description board"
              minRows={5}
              maxRows={5}
              multiline
              sx={{ marginTop: "10px" }}
              onChange={descChange}
              value={board.description}
            />
            <BoardColorPicker
              currentValue={board.theme}
              setCurrentValue={colorBoardThemeChange}
            />
            <Box
              display="flex"
              gap={"10px"}
              justifyContent="center"
              marginTop="24px"
            >
              <LoadingButton
                type="submit"
                loading={isLoading}
                variant="contained"
                color="secondary"
              >
                Create
              </LoadingButton>
              <Button onClick={handleClose}>close</Button>
            </Box>
          </FormControl>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="An error has occurred. You may not be able to create more boards."
      />
    </>
  );
};

export default BoardAdd;
