import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../AppContext/AppContext";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { FinalTxnList } from "./FinalTxnList";
import {
  SplitCalculator,
  calculate_total,
} from "../../Helpers/SplitCalculator";
import { FinalTxnReceipt } from "./FinalTxnReceipt";

export const FinalTxns = () => {
  const { friends, transactions } = useContext(AccountContext);

  const [total, setTotal] = useState();
  const [allFinalTransactions, setAllFinalTransactions] = useState([]);
  const [filteredTxns, setFilteredTxns] = useState();
  const [friend, setFriend] = useState("0");
  const [share, setShare] = useState(false);

  const onFriendChange = (e) => {
    const friendName = e.target.value;
    setFriend(friendName);

    if (friendName !== "0") {
      setFilteredTxns(
        allFinalTransactions?.filter(
          (txn) => txn.from_friend.name === friendName
        )
      );
    } else {
      // console.log("workking");
      setFilteredTxns(allFinalTransactions);
    }
  };

  useEffect(() => {
    // console.log(transactions);

    const finalTransactions = SplitCalculator({
      expenses: transactions,
      friends: friends,
    });
    setTotal(calculate_total(transactions));
    setAllFinalTransactions(finalTransactions);
    setFilteredTxns(finalTransactions);
  }, [transactions, friends]);

  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <IconButton onClick={() => setShare(true)} disabled={share}>
            <ShareIcon />
          </IconButton>
          <FormControl size="small">
            <TextField
              value={String(friend ?? "0")}
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
              <MenuItem value="0" key={0}>
                <small>All Friends</small>
              </MenuItem>
              {friends.map((friend, index) => (
                <MenuItem key={index + 1} value={friend.name}>
                  {friend.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
        {filteredTxns && <FinalTxnList txns={filteredTxns} />}
        {total ? (
          <p>
            Total:{" ₹"}
            <b>
              <em>{total}</em>
            </b>
          </p>
        ) : null}
      </Box>

      <React.Suspense fallback={<div>Loading...</div>}>
        <FinalTxnReceipt isOpen={share} closeModal={() => setShare(false)} />
      </React.Suspense>
    </>
  );
};
