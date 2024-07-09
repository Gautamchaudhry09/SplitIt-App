import { createContext, useEffect, useState } from "react";
import React from "react";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  // Initialize state from local storage
  const [friends, setFriends] = useState(() => {
    const savedFriends = localStorage.getItem("friends");
    return savedFriends ? JSON.parse(savedFriends) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Use useEffect to save friends to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  // Use useEffect to save transactions to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <AccountContext.Provider
      value={{
        friends,
        setFriends,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
