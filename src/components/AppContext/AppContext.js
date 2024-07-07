import { createContext, useEffect, useRef, useState } from "react";
import React from "react";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    localStorage.setItem(transactions, transactions);
    localStorage.setItem(friends, friends);
  }, [friends, transactions]);
  // useEffect(() => {
  //   setTransactions(localStorage.getItem(transactions));
  //   setFriends(localStorage.getItem(friends));
  // }, []);
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
