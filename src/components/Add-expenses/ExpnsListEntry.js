import React, { useContext, useState } from "react";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { SxProps } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AccountContext } from "../AppContext/AppContext";
import { ExpnsEntryEdit } from "./ExpnsEntryEdit";

const sxAvatar = { fontSize: "18px", fontWeight: "400" };

export const ExpnsListEntry = ({ txn }) => {
  const { transactions, setTransactions } = useContext(AccountContext);
  const [editing, setEditing] = useState(false);

  const onTxnRemove = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure?")) {
      //   removeTxn(txn.id);
      setTransactions(
        transactions.filter((transaction) => transaction !== txn)
      );
    }
  };

  const startEditing = () => {
    setEditing(true);
    // inputRef.current?.focus();
    // inputRef.current?.select();
  };

  const updateExpense = (newAmount, newReason) => {
    // updateTxn(txn, amount, reason);
    setTransactions((transactions) =>
      transactions.map((transaction) => {
        if (txn.friend === transaction.friend) {
          transaction.amount = newAmount;
          if (newReason) transaction.reason = newReason;
        }
        return transaction;
      })
    );
  };

  return (
    <Grid
      container
      spacing="2"
      justifyContent="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <Grid item xs container alignItems="center" wrap="nowrap">
        <Avatar
          sx={{
            ...sxAvatar,
            backgroundColor: txn.friend.color?.backgroundColor,
            color: txn.friend.color?.color,
          }}
        >
          {txn.friend.initials}
        </Avatar>
        <Grid item xs marginLeft="8px">
          <b>{txn.friend.name}</b> paid <b>{" ₹" + txn.amount}</b>
          {txn.reason ? (
            <div>
              <small>({txn.reason})</small>
            </div>
          ) : null}
        </Grid>
      </Grid>
      {!editing && (
        <Grid
          item
          xs
          textAlign="right"
          justifyContent="flex-end"
          container
          alignItems="center"
        >
          <IconButton onClick={() => startEditing()}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onTxnRemove}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      )}

      {editing && (
        <ExpnsEntryEdit
          open={editing}
          title={`${txn.friend} paid ${txn.amount}`}
          amount={txn.amount}
          reason={txn.reason}
          close={() => setEditing(false)}
          save={updateExpense}
        />
      )}
    </Grid>
  );
};
