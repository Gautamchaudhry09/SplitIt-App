import React from "react";
import { AddExpenses } from "./AddExpenses";
import { ExpensesList } from "./ExpensesList";
import { Box, Divider } from "@mui/material";

export const Expenses = () => {
  return (
    <Box sx={{ m: "-5px", mb: "-23px" }}>
      <AddExpenses />
      <Divider sx={{ my: "0.8rem" }} />
      <ExpensesList />
    </Box>
  );
};
