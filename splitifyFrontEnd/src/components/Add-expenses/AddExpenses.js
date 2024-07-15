import React, { useContext, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AccountContext } from "../AppContext/AppContext";

export const AddExpenses = () => {
  const { friends, setFriends, transactions, setTransactions } =
    useContext(AccountContext);
  const [selectedFriend, setSelectedFriend] = useState("0");
  const [txnAmount, setTxnAmount] = useState("");
  const [reason, setReason] = useState("");

  const onTxnAmountChange = (e) => {
    setTxnAmount(e.target.value);
  };

  const onFriendChange = (e) => {
    setSelectedFriend(e.target.value);
  };

  const onReasonChange = (e) => {
    setReason(e.target.value);
  };

  const onTxnSubmit = (e) => {
    e.preventDefault();
    if (!selectedFriend || selectedFriend == "0") {
      return alert("Please select a friend");
    }

    if (!Number(txnAmount) || Number(txnAmount) <= 0) {
      return alert("Invalid transaction amount");
    }

    const friend = friends.find((frnd) => frnd.name === selectedFriend);
    setTransactions([
      ...transactions,
      {
        friend: friend,
        amount: Number(txnAmount),
        reason: reason || null,
      },
    ]);
    setTxnAmount("");
    setReason("");
  };

  return (
    <Box
      sx={{
        p: 1.2,
        maxHeight: "175px",
        backgroundColor: "#333",
        borderRadius: 2,

        boxShadow: "0 0 10px #66CCCC",
      }}
    >
      <Typography variant="h6" sx={{ color: "#66CCCC", fontWeight: "bold" }}>
        Add Expenses
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#FFFFFF" }}>
        Select friend, input amount, and add expense
      </Typography>
      <form onSubmit={onTxnSubmit} style={{ marginTop: 5 }}>
        <Grid
          container
          spacing={1}
          wrap="nowrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={7} sm={8}>
            <FormControl size="small" fullWidth>
              <TextField
                value={selectedFriend}
                select
                size="small"
                onChange={onFriendChange}
                required
                sx={{
                  boxShadow: "0.8px 0.8px 3px #66CCCC",
                  bgcolor: "#000000",
                  borderRadius: "10px",
                  color: "#66CCCC",
                }}
                InputProps={{
                  style: {
                    color: "#66CCCC",
                  },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        backgroundColor: "#333333",
                        color: "#66CCCC",
                      },
                    },
                  },
                }}
              >
                <MenuItem value="0" disabled>
                  <small>Select Friend</small>
                </MenuItem>
                {friends.map((friend, index) => (
                  <MenuItem key={index} value={friend.name}>
                    {friend.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={3}>
            <FormControl fullWidth>
              <TextField
                value={txnAmount}
                onChange={onTxnAmountChange}
                size="small"
                placeholder="Amount"
                required
                autoComplete="off"
                sx={{
                  boxShadow: "0.8px 0.8px 3px #66CCCC",
                  bgcolor: "#000000",
                  borderRadius: "10px",
                  color: "#66CCCC",
                }}
                InputProps={{
                  style: {
                    color: "#66CFFC",
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs textAlign="center">
            <IconButton type="submit">
              <AddCircleIcon
                color="secondary"
                sx={{
                  boxShadow: "0px 0px 5px #66CCCC",
                  borderRadius: "15px",
                  // bgcolor: "#33CC33",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <FormControl margin="dense" fullWidth>
          <TextField
            value={reason}
            size="small"
            placeholder="Reason (optional)"
            type="text"
            sx={{
              boxShadow: "0.8px 0.8px 3px #66CCCC",
              bgcolor: "#000000",
              borderRadius: "10px",
              color: "#66CCCC",
            }}
            InputProps={{
              style: {
                color: "#66CCCC",
              },
            }}
            onChange={onReasonChange}
          />
        </FormControl>
      </form>
    </Box>
  );
};
