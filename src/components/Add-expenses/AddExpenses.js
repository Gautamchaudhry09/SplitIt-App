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
import { Input } from "@mui/material";

// import MuiNumberInputField from "../UI/MuiNumberInputField";

export const AddExpenses = () => {
  const { friends, setFriends, transactions, setTransactions } =
    useContext(AccountContext);

  // const amtInputRef = React.useRef<HTMLInputElement>(null);

  const [selectedFriend, setSelectedFriend] = useState(undefined);
  const [txnAmount, setTxnAmount] = useState(undefined);
  const [reason, setReason] = useState();

  const onTxnAmountChange = (e) => {
    setTxnAmount(e.target.value);
  };

  const onFriendChange = (e) => {
    const indx = parseInt(e.target.value);

    if (indx !== 0) {
      setSelectedFriend(e.target.value);
    }
  };

  const onReasonChange = (e) => {
    setReason(e.target.value);
  };

  const onTxnSubmit = (e) => {
    e.preventDefault();

    if (!selectedFriend) {
      return alert("Please select a friend");
    }

    if (!Number(txnAmount) || Number(txnAmount) <= 0) {
      return alert("Invalid transaction amount");
    }

    // addTxn(selectedFriend, {
    //     amount: txnAmount,
    //     reason
    // });
    const friend = friends.filter((frnd) => frnd.name === selectedFriend);
    setTransactions([
      ...transactions,
      {
        friend: friend[0],
        amount: Number(txnAmount),
        reason: reason ? reason : null,
      },
    ]);
    setTxnAmount("");

    // amtInputRef.current?.focus();
    // amtInputRef.current?.select(); // it may not work on safari mobile
  };

  return (
    <div>
      <Box marginBottom=".875rem">
        <Typography variant="h6" fontWeight="bold">
          Add expenses
        </Typography>
        <Typography variant="subtitle2">
          Select friend, input amount, and add expense
        </Typography>
      </Box>

      <form onSubmit={onTxnSubmit}>
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
                id="demo-customized-select"
                value={String(selectedFriend ?? "0")}
                select={true}
                size="small"
                onChange={onFriendChange}
                required
                sx={{
                  boxShadow: "1.5px 1.5px 5px black",
                  bgcolor: "white",
                  borderRadius: "10px",
                }}
              >
                <MenuItem value="0">
                  <small>Friend</small>
                </MenuItem>
                {friends.map((friend, index) => (
                  <MenuItem value={friend.name}>{friend.name}</MenuItem>
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
                  boxShadow: "1.5px 1.5px 5px black",
                  bgcolor: "white",
                  borderRadius: "10px",
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs textAlign="center">
            <IconButton type="submit">
              <AddCircleIcon
                color="primary"
                sx={{
                  boxShadow: "0px 0px 10px black",
                  borderRadius: "15px",
                  bgcolor: "#a8f1c3",
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
              boxShadow: "1.5px 1.5px 5px black",
              bgcolor: "white",
              borderRadius: "10px",
            }}
            onChange={onReasonChange}
          />
        </FormControl>
      </form>

      <Divider />

      {/* <ExpensesList /> */}
    </div>
  );
};
