import React, { useContext } from "react";
import Divider from "@mui/material/Divider";
import { AddFriends } from "./AddFriends";
import { FriendList } from "./FriendList";
import { AccountContext } from "../AppContext/AppContext";

export const Friends = () => {
  const { friends, setFriends } = useContext(AccountContext);

  return (
    <div>
      <AddFriends />

      <Divider sx={{ my: "1.2rem" }} />

      <FriendList />
    </div>
  );
};
