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
import { Divider } from "@mui/material";

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
      setFilteredTxns(allFinalTransactions);
    }
  };

  useEffect(() => {
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
      <Box
        sx={{
          margin: "-5px",
          mb:"5px",
          mb: "-20px",
          bgcolor: "#000000",
          p: 2,
          pb: 0.5,
          borderRadius: "8px",
          boxShadow: "0px 0px 12px 3px #66CCCC",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
           {/* <IconButton
            onClick={() => setShare(true)}
            disabled={share}
            sx={{ color: "#66CCCC" }}
          >
            <ShareIcon />
          </IconButton> */}
          <FormControl size="small">
            <TextField
              value={String(friend ?? "0")}
              select={true}
              size="small"
              onChange={onFriendChange}
              required
              sx={{
                bgcolor: "#333333",
                color: "#66CCCC",
                m: "5px",
                boxShadow: "1.5px 1.5px 5px #000000",
                borderRadius: "10px",
                "& .MuiInputBase-input": { color: "#66CCCC" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#66CCCC",
                },
              }}
            >
              <MenuItem value="0" key={0} sx={{ color: "#66CCCC" }}>
                All Friends
              </MenuItem>
              {friends.map((friend, index) => (
                <MenuItem
                  key={index + 1}
                  value={friend.name}
                  sx={{ color: "#66CCCC" }}
                >
                  {friend.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
        {filteredTxns && <FinalTxnList txns={filteredTxns} />}
        <Divider sx={{ bgcolor: "#66CCCC" }} />
        {total ? (
          <p style={{ color: "#66CCCC", fontSize: "18px" }}>
            Total:
            <b>
            
              <em style={{color:"green"}}>{" ₹"}{total}</em>
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
