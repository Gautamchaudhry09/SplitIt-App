import React, { memo, useContext, useEffect, useRef } from "react";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@mui/system/styled";
import { useScreenshot } from "../../Helpers/functions";
import {
  SplitCalculator,
  calculate_total,
} from "../../Helpers/SplitCalculator";
import { AccountContext } from "../AppContext/AppContext";
import { Avatar, ListItemText } from "@mui/material";
const Wrapper = styled(Paper)(() => ({
  borderRadius: 0,
  padding: "0.475rem",
  width: "24rem",
  maxWidth: "100%",
}));

const CList = styled(List)(() => ({
  "& > li": {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: "small",
  },
  marginBottom: "0.875rem",
}));

export const FinalTxnSS = ({ setImageUrl }) => {
  const screenShotRef = useRef(null);
  const { transactions, friends } = useContext(AccountContext);

  const [imageBase64Str, takeScreenShot] = useScreenshot();
  const total = calculate_total(transactions);
  const expenses = SplitCalculator({
    expenses: transactions,
    friends: friends,
  });

  useEffect(() => {
    if (screenShotRef.current && transactions?.length) {
      takeScreenShot(screenShotRef.current);
    }
  }, [takeScreenShot, transactions]);

  useEffect(() => {
    if (imageBase64Str && imageBase64Str !== "") {
      setImageUrl(imageBase64Str);
    }
  }, [imageBase64Str, setImageUrl]);

  return (
    <Wrapper ref={screenShotRef}>
      <Typography
        borderBottom={1}
        fontWeight="bold"
        borderColor="text.disabled"
        color="black"
      >
        Expenses
      </Typography>
      <CList dense>
        {transactions.map((txn, index) => (
          <>
            <ListItem key={index + 1}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  <Typography>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Avatar
                        sx={{
                          backgroundColor: txn.friend.color.backgroundColor,
                          color: txn.friend.color.color,
                          height: "22px",
                          width: "22px",
                          boxSizing: "border-box",
                          fontSize: "12px",
                          display: "inline-block",
                          marginRight: "5px",
                          textAlign: "center",
                          //   margin: "5px",
                          paddingTop: "4px",
                          // position: "relative",
                        }}
                      >
                        {txn.friend.initials}
                      </Avatar>
                      <p style={{ color: "black" }}>
                        <b
                          style={{ color: "black" }}
                        >{`${txn.friend.name} `}</b>{" "}
                        paid:
                      </p>
                    </Grid>
                  </Typography>
                  {txn.reason && (
                    <Typography>
                      <small style={{ color: "black" }}>({txn.reason})</small>
                    </Typography>
                  )}
                </div>
                <div style={{ color: "black" }}>
                  {"₹"} {txn.amount}
                </div>
              </Grid>
            </ListItem>
            <Divider sx={{ my: "5px" }} />
          </>
        ))}
        <Typography
          textAlign="right"
          width="100%"
          fontSize="small"
          mt="0.875rem"
          color="black"
        >
          Total: {total ?? 0}
        </Typography>
      </CList>
      <Typography
        borderBottom={1}
        fontWeight="bold"
        borderColor="text.disabled"
        style={{ color: "black" }}
      >
        Final SPLIT Txns
      </Typography>
      <CList dense>
        {expenses &&
          expenses.map((txn, index) => (
            <>
              <ListItem key={index + 1}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ px: "15px" }}
                >
                  <Typography>
                    <p style={{ color: "black" }}>
                      <b style={{ color: "black" }}>
                        {" "}
                        {`${txn.from_friend.name} `}{" "}
                      </b>
                      {`gives`}
                      <b
                        style={{ color: "black" }}
                      >{` ${txn.to_friend.name}`}</b>
                    </p>
                  </Typography>

                  <Typography style={{ color: "black" }}>
                    {"   ₹"}
                    {txn.amount}
                  </Typography>
                </Grid>
              </ListItem>
              <Divider sx={{ my: "5px" }} />
            </>
          ))}
      </CList>
      <Typography textAlign="center" marginTop="0.875rem" fontSize="small">
        <sub style={{ color: "black" }}>❤Made by Gautam Chaudhry</sub>
      </Typography>
    </Wrapper>
  );
};
