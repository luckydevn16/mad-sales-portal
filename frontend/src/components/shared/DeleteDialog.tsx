import { useState } from "react";

import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";

interface Props {
  onDelete: Function;
}

export default function DeleteDialog({ onDelete }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    await onDelete();
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow placement="right" title="Delete">
        <IconButton color="primary" onClick={handleOpen}>
          <Delete />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        disableRestoreFocus
      >
        <DialogTitle>Are You Sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
