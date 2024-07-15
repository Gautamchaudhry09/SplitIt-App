import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";

export const OccasionName = ({ open, onClose, onSave }) => {
  const [occasionName, setOccasionName] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    onSave(occasionName);
    setOccasionName("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "#000000", 
          color: "#FFFFFF",
          border: "2px solid #66CCCC",
          boxShadow: "0px 0px 10px #66CCCC", 
        },
      }}
    >
      <DialogTitle sx={{ color: "#FF69B4", fontSize: "24px" }}>
        {" "}
        Save Occasion
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(event) => handleSave(event)}>
          <TextField
            autoFocus
            margin="dense"
            label="Occasion Name"
            fullWidth
            required
            value={occasionName}
            onChange={(e) => setOccasionName(e.target.value)}
            sx={{
              input: { color: "#FFFFFF" }, 
              label: { color: "#66CCCC" },
              bgcolor: "#333333", 
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#66CCCC",
                },
                "&:hover fieldset": {
                  borderColor: "#FF69B4", 
                },
              },
            }}
          />
          <DialogActions>
            <Button onClick={onClose} sx={{ color: "#FF69B4" }}>
              {" "}
              Cancel
            </Button>
            <Button
              // onClick={handleSave}
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#FF69B4",
                color: "#000000", 
                "&:hover": {
                  bgcolor: "#FF69B4", 
                },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
