import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../AppContext/AppContext";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { SxProps } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";

import Avatar from "@mui/material/Avatar";

const sxAvatar = { fontSize: "18px", fontWeight: "400" };
const sxForm = { display: "flex" };

export const FriendListEntry = ({ friend }) => {
  const { friends, setFriends } = useContext(AccountContext);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(friend.name);

  const onRemoveFriend = () => {
    if (
      window.confirm("Are you sure? This will remove all transactions as well.")
    ) {
      setFriends(friends.filter((frnd) => friend.name !== frnd.name));
      setTransactions(
        transactions.filter((txn) => txn.friend.name !== friend.name)
      );
    }
  };

  const updateName = () => {
    const trimmedNewName = newName ? newName.trim() : newName;

    if (!trimmedNewName || trimmedNewName === "") {
      return alert("Name cannot be empty");
    }

    setFriends((friends) => {
      const uFriends = friends.map((frnd) => {
        if (frnd.name === friend.name) {
          // if (friend !== trimmedNewName) {
          // friend.initials = getInitialsFromName(friendName);
          // }
          frnd.initials = getInitials(trimmedNewName);
          frnd.name = trimmedNewName;
        }
        return frnd;
      });
      return uFriends;
    });
    // setNewName(trimmedNewName); // change untrimmed newName as well (`   x` to `x`)
    setEditing(false);
  };

  const handleNameUpdate = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    updateName();
  };

  const toggleEditting = () => {
    setNewName(friend.name);
    setEditing(true);
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
    <Grid
      container
      gap="8px"
      justifyContent="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <Grid item xs container alignItems="center" wrap="nowrap">
        <Grid item xs gap="8px" container wrap="nowrap" alignItems="center">
          <Avatar
            sx={{
              ...sxAvatar,
              backgroundColor: friend.color.backgroundColor,
              color: friend.color.color,
            }}
          >
            {friend.initials}
          </Avatar>

          {editing ? (
            <form style={sxForm} onSubmit={handleNameSubmit}>
              <TextField
                autoFocus
                autoComplete="false"
                autoCapitalize="false"
                autoCorrect="false"
                value={newName}
                onChange={handleNameUpdate}
                size="small"
              />
              <IconButton type="submit">
                <Check />
              </IconButton>
              <IconButton onClick={() => setEditing(false)}>
                <Clear />
              </IconButton>
            </form>
          ) : (
            <b>{friend.name}</b>
          )}
        </Grid>
      </Grid>

      {!editing && (
        <Grid
          item
          xs
          textAlign="right"
          justifyContent="flex-end"
          container
          alignItems="center"
        >
          <IconButton onClick={() => toggleEditting()}>
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onRemoveFriend()}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};
