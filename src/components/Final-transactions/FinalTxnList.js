import React, { useContext, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { AccountContext } from "../AppContext/AppContext";
import Avatar from "@mui/material/Avatar";
import { Grid, Typography } from "@mui/material";

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
            {/* <ListItemButton
              //   role={undefined}
              sx={{ display: "inline" }}
              onClick={handleToggle(txn)}
              disableRipple
              dense
            > */}
            <ListItemIcon sx={{ marginRight: "-20px" }}>
              <Checkbox
                edge="start"
                sx={{ marginLeft: "5px" }}
                checked={checked.indexOf(txn) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": `paymentId-${txn.id}` }}
              />
            </ListItemIcon>
            {/* </ListItemButton> */}
            <ListItemText>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ px: "15px" }}
              >
                <p>
                  <b>{`${txn.from_friend.name} `} </b>
                  {`gives`}
                  <b>{` ${txn.to_friend.name}`}</b>
                </p>
                <Typography>
                  {"   ₹"}
                  {txn.amount}
                </Typography>
              </Grid>
            </ListItemText>
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
