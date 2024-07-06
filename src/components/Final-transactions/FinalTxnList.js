import React, { useContext, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { AccountContext } from "../AppContext/AppContext";

export const FinalTxnList = ({ txns }) => {
  const { friends, setFriends, transactions, setTransactions } =
    useContext(AccountContext);

  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List>
      {txns.length ? (
        txns?.map((txn, idx) => (
          <ListItem key={txn.id} disablePadding>
            <ListItemButton
              //   role={undefined}
              onClick={handleToggle(txn)}
              disableRipple
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(txn) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": `paymentId-${txn.id}` }}
                />
              </ListItemIcon>
              <ListItemText>
                <b>{txn.from_friend.name}</b> gives <b>{txn.to_friend.name}</b>
                {" ₹"}
                {txn.amount}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        <p>
          <b>No payments</b>
        </p>
      )}
    </List>
  );
};
