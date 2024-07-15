import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import styled from "@mui/system/styled";
import { AccountContext } from "../AppContext/AppContext";
import { FriendListEntry } from "./FriendListEntry";
import { Divider } from "@mui/material";

const UITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
}));

export const FriendList = () => {
  const { friends, setFriends } = useContext(AccountContext);

  return (
    <div>
      <Paper
        sx={{
          width: "100%",
          bgcolor: "#222222",
          boxShadow: "0px 0px 10px 2px #66CCCC",
        }}
      >
        <TableContainer sx={{ maxHeight: "54vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {friends.map((friend, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  <UITableCell align="left">
                    <FriendListEntry key={index} friend={friend} />
                    <Divider sx={{ marginTop: "7px", bgcolor: "#66CCCC" }} />
                  </UITableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
