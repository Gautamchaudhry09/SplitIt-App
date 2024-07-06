import { createContext, useEffect, useRef, useState } from "react";
import React from "react";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [transactions, setTransactions] = useState([]);

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
