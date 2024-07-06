import React, { useContext } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import styled from "@mui/system/styled";
import { AccountContext } from "../AppContext/AppContext";
import { ExpnsListEntry } from "./ExpnsListEntry";
import { Divider } from "@mui/material";

const UITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
}));

export const ExpensesList = () => {
  const { transactions, setTransactions } = useContext(AccountContext);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow hover key={index}>
                <UITableCell align="left">
                  <ExpnsListEntry txn={transaction} />
                  <Divider sx={{ marginTop: "7px" }} />
                </UITableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
