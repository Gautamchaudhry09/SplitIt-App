import React, { useState } from "react";

import Grid from "@mui/material/Grid";

import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export const ExpnsEntryEdit = ({
  open,
  title,
  paid,
  amount,
  reason,
  close,
  save,
}) => {
  const [newAmount, setNewAmount] = useState(amount);
  const [newReason, setNewReason] = useState(reason);

  const onUpdatingAmt = (e) => {
    const amt = e.target.value;

    setNewAmount(amt);
  };

  const onReasonUpdate = (e) => {
    const amt = e.target.value;
    
    setNewReason(amt);
  };

  const onUpdateAmtCancel = (e) => {
    close();
  };

  const onUpdateAmtSubmit = (e) => {
    e.preventDefault();

    if (!Number(newAmount) || Number(newAmount) <= 0) {
      return alert("Invalid amount. Please enter a valid amount.");
    }

    save(newAmount, newReason);
    close();
  };

  return (
    <Dialog open={open} onClose={close} scroll="paper" maxWidth="xs">
      {/* <DialogTitle id="scroll-dialog-title">{title}</DialogTitle> */}
      <DialogContent>
        <form onSubmit={onUpdateAmtSubmit}>
          <Grid container alignItems="center" wrap="nowrap">
            <Grid>
              <TextField
                value={newAmount}
                onChange={onUpdatingAmt}
                size="small"
                autoFocus={true}
                placeholder="Amount"
                required
              />
            </Grid>
            <Grid>
              <IconButton type="submit">
                <Check />
              </IconButton>
              <IconButton onClick={onUpdateAmtCancel}>
                <Clear />
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
            />
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  );
};
