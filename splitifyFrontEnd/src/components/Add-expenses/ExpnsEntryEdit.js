import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export const ExpnsEntryEdit = ({
  open,
  title,
  amount,
  reason,
  close,
  save,
}) => {
  const [newAmount, setNewAmount] = useState(amount);
  const [newReason, setNewReason] = useState(reason);

  const onUpdatingAmt = (e) => {
    setNewAmount(e.target.value);
  };

  const onReasonUpdate = (e) => {
    setNewReason(e.target.value);
  };

  const onUpdateAmtCancel = () => {
    close();
  };

  const onUpdateAmtSubmit = (e) => {
    e.preventDefault();
    if (!newAmount || newAmount <= 0) {
      return alert("Invalid amount. Please enter a valid amount.");
    }
    save(newAmount, newReason);
    close();
  };

  return (
    <Dialog open={open} onClose={close} scroll="paper" maxWidth="xs">
      <DialogContent>
        <form onSubmit={onUpdateAmtSubmit}>
          <Grid container alignItems="center" wrap="nowrap">
            <Grid item xs>
              <TextField
                value={newAmount}
                onChange={onUpdatingAmt}
                size="small"
                autoFocus={true}
                placeholder="Amount"
                required
                sx={{
                  bgcolor: "#000000",
                  color: "#66CCCC",
                  boxShadow: "0.8px 0.8px 3px #66CCCC",
                }}
                InputProps={{
                  style: {
                    color: "#66CCCC",
                  },
                }}
              />
            </Grid>
            <Grid item>
              <IconButton type="submit">
                <Check sx={{ color: "#33CC33" }} />
              </IconButton>
              <IconButton onClick={onUpdateAmtCancel}>
                <Clear sx={{ color: "#FF69B4" }} />
              </IconButton>
            </Grid>
          </Grid>
          <FormControl margin="dense" fullWidth>
            <TextField
              value={newReason}
              size="small"
              placeholder="Reason (optional)"
              type="text"
              onChange={onReasonUpdate}
              sx={{
                bgcolor: "#000000",
                color: "#66CCCC",
                boxShadow: "0.8px 0.8px 3px #66CCCC",
              }}
              InputProps={{
                style: {
                  color: "#66CCCC",
                },
              }}
            />
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  );
};
