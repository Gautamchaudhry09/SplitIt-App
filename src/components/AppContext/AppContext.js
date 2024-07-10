import { createContext, useEffect, useState } from "react";
import React from "react";
import { getOccasions } from "../../service/api";

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

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? savedUser : "";
  });

  const [atHome, setAtHome] = useState(() => {
    const savedAtHome = localStorage.getItem("atHome");
    return savedAtHome ? savedAtHome : 1;
  });

  const [invert, setInvert] = useState(() => {
    const savedInvert = localStorage.getItem("invert");
    return savedInvert ? savedInvert : 0;
  });

  const [isSaved, setIsSaved] = useState(() => {
    const savedisSaved = localStorage.getItem("isSaved");
    return savedisSaved ? savedisSaved : 0;
  });

  const [occasions, setOccasions] = useState(() => {
    const savedOccasions = localStorage.getItem("occasions");
    return savedOccasions ? JSON.parse(savedOccasions) : [];
  });

  useEffect(() => {
    localStorage.setItem("occasions", JSON.stringify(occasions));
  }, [occasions]);

  useEffect(() => {
    localStorage.setItem("isSaved", isSaved);
  }, [isSaved]);

  useEffect(() => {
    localStorage.setItem("invert", invert);
  }, [invert]);

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  useEffect(() => {
    localStorage.setItem("atHome", atHome);
  }, [atHome]);

  // Use useEffect to save friends to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("isSaved", 0);
    setIsSaved(0);
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  // Use useEffect to save transactions to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("isSaved", 0);
    setIsSaved(0);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <AccountContext.Provider
      value={{
        friends,
        setFriends,
        transactions,
        setTransactions,
        user,
        setUser,
        invert,
        setInvert,
        atHome,
        setAtHome,
        isSaved,
        setIsSaved,
        occasions,
        setOccasions,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
