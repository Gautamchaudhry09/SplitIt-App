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
  const { transactions } = useContext(AccountContext);

  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "#333",
        color: "#66CCCC",
        borderRadius: 2,
        boxShadow: "0 0 10px #66CCCC",
      }}
    >
      <TableContainer sx={{ maxHeight: "42.8vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow
                hover
                key={index}
                sx={{ boxShadow: "1.5px 1.5px 2px #66CCCC" }}
              >
                <UITableCell align="left">
                  <ExpnsListEntry txn={transaction} />
                  <Divider sx={{ marginTop: "7px", borderColor: "#66CCCC" }} />
                </UITableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
