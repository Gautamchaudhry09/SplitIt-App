import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import PersonIcon from "@mui/icons-material/Person";

// import { SxProps } from "@mui/material";
import { AccountContext } from "../AppContext/AppContext";

const sxInputBox = {
  p: "2px 4px",
  mt: "1rem",
  display: "flex",
  alignItems: "center",
  width: "100%",
};

const sxInput = {
  ml: 1,
  flexGrow: 1,
};
export const AddFriends = () => {
  const { friends, setFriends, transactions, setTransactions } =
    useContext(AccountContext);
  const [name, setName] = useState("");

  const addFriend = () => {
    const _name = name.toLowerCase().trim();

    if (!_name) return;
    const exists = friends?.find(
      (friend) => friend.name.toLowerCase() === _name
    );
    // console.log(friends);
    if (!exists) {
      const colour = getRandomColor();
      const initials = getInitials(_name);
      const newFriend = { name: _name, color: colour, initials: initials };
      setFriends([...friends, newFriend]);

      setName("");
    } else {
      window.alert("Name already exist! Please enter a different name");
    }
  };
  const onNameChangeEvent = (e) => {
    setName(e.target.value);
  };

  const onNameKeyDownEvent = (e) => {
    if (e.key.toLowerCase() === "enter") {
      addFriend();
    }
  };

  const onAddFriendEvent = (e) => {
    addFriend();
  };

  const getRandomColor = () => {
    let color = ((Math.random() * 0xffffff) << 0).toString(16);

    while (color.length < 6) {
      color = ((Math.random() * 0xffffff) << 0).toString(16);
    }

    const red = parseInt(color.substring(0, 2), 16);
    const green = parseInt(color.substring(2, 4), 16);
    const blue = parseInt(color.substring(4, 6), 16);
    const brightness = red * 0.299 + green * 0.587 + blue * 0.114;

    if (brightness > 180) {
      return {
        backgroundColor: "#" + color,
        color: "#000000",
      };
    }

    return {
      backgroundColor: "#" + color,
      color: "#ffffff",
    };
  };

  const getInitials = (str) => {
    return str
      .split(" ")
      .slice(0, 2)
      .map((s) => s[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Stack spacing={2}>
      <Paper component="div" sx={sxInputBox} square={true} variant="outlined">
        <IconButton>
          <PersonIcon />
        </IconButton>
        <InputBase
          onChange={onNameChangeEvent}
          onKeyDown={onNameKeyDownEvent}
          value={name}
          sx={sxInput}
          placeholder="Add friend"
        />
        <Button type="button" onClick={onAddFriendEvent} aria-label="search">
          <Box fontSize="1.2rem">+</Box>
        </Button>
      </Paper>
    </Stack>
  );
};
