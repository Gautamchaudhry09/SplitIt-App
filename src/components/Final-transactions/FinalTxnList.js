import React, { useContext, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { AccountContext } from "../AppContext/AppContext";
import Avatar from "@mui/material/Avatar";

const sxAvatar = { fontSize: "18px", fontWeight: "400" };

export const FinalTxnList = ({ txns }) => {
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
          <ListItem
            key={txn.id}
            disablePadding
            sx={{
              boxShadow: "1.5px 1.5px 2px black",
              bgcolor: "white",
              borderRadius: "5px",
              margin: "5px",
            }}
          >
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
                <Avatar
                  sx={{
                    ...sxAvatar,
                    backgroundColor: txn.from_friend.color.backgroundColor,
                    color: txn.from_friend.color.color,
                    height: "22px",
                    width: "22px",
                    boxSizing: "border-box",
                    fontSize: "12px",
                    display: "inline-block",
                    margin: "5px",
                    textAlign: "center",
                    paddingTop: "4px",
                  }}
                >
                  {txn.from_friend.initials}
                </Avatar>
                <b>{txn.from_friend.name}</b> gives
                <Avatar
                  sx={{
                    ...sxAvatar,
                    backgroundColor: txn.to_friend.color.backgroundColor,
                    color: txn.to_friend.color.color,
                    height: "22px",
                    width: "22px",
                    display: "inline-block",
                    boxSizing: "border-box",
                    margin: "5px",
                    fontSize: "12px",
                    textAlign: "center",
                    paddingTop: "4px",
                  }}
                >
                  {txn.to_friend.initials}
                </Avatar>
                <b>{txn.to_friend.name}</b>
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
