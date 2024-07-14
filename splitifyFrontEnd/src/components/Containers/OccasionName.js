import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export const OccasionName = ({ open, onClose, onSave }) => {
  const [occasionName, setOccasionName] = useState("");

  const handleSave = () => {
    onSave(occasionName);
    setOccasionName("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Occasion</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Occasion Name"
          fullWidth
          value={occasionName}
          onChange={(e) => setOccasionName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
