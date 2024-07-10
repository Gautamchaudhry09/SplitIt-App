import React from "react";
import { AddExpenses } from "./AddExpenses";
import { ExpensesList } from "./ExpensesList";
import { Divider } from "@mui/material";

export const Expenses = () => {
  return (
    <div>
      <AddExpenses />
      <Divider sx={{ my: "1.2rem" }} />
      <ExpensesList />
    </div>
  );
};
