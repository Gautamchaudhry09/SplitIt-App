import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";

const sxAvatar = { fontSize: "18px", fontWeight: "400", bgcolor: "#66CCCC" };

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
    <Paper
      sx={{
        p: "5px",
        pl:"0px",
        
        m: "5px",
        ml:"0px",
        border: "none",
        bgcolor: "inherit",
        boxShadow: "none",
      }}
    >
      <TableContainer sx={{ maxHeight: "47vh", overflowX: "hidden" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            <List>
              {txns.length ? (
                txns.map((txn) => (
                  <ListItem
                    key={txn.id}
                    disablePadding
                    onClick={handleToggle(txn)}
                    sx={{
                      boxShadow: "0 0 8px #66CCCC",
                      bgcolor: "#333",
                      borderRadius: "10px",
                      margin: "5px",
                      ml:"0px",
                      cursor: "pointer",
                    }}
                  >
                    <ListItemIcon sx={{ marginRight: "-20px" }}>
                      <Checkbox
                        edge="start"
                        sx={{ marginLeft: "5px", color: "#66CCCC" }}
                        checked={checked.indexOf(txn) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                          "aria-labelledby": `paymentId-${txn.id}`,
                        }}
                      />
                    </ListItemIcon>

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
                <ListItem>
                  <ListItemText>
                    <Typography sx={{ color: "#FFFFFF", textAlign: "center" }}>
                      <b>No payments</b>
                    </Typography>
                  </ListItemText>
                </ListItem>
              )}
            </List>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
