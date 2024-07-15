import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { AccountContext } from "../AppContext/AppContext";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { getOccasions, saveOccasion } from "../../service/api";
import { OccasionsMenu } from "../Menu/OccasionsMenu";
import { TabsContainer } from "./TabsContainer";
import { OccasionName } from "./OccasionName";

export const MainContainer = () => {
  const {
    setFriends,
    transactions,
    friends,
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
  } = useContext(AccountContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const reset = () => {
    if (user) {
      if (isSaved) {
        if (
          window.confirm(
            "Are You Sure? All data will be reset, but you can always come back here from the Saved Splits Menu"
          )
        ) {
          setFriends([]);
          setTransactions([]);
          setIsSaved(0);
        }
      } else if (
        window.confirm(
          "You haven't saved the current Occasion's Split, Do you wish to continue to a new Split? *If you click on OK, ALL DATA of this split will be discarded* (IGNORE IF YOU ALREADY SAVED THE LATEST ENTRIES SOMETIME EARLIER)"
        )
      ) {
        setFriends([]);
        setTransactions([]);
        setIsSaved(0);
      }
    } else if (window.confirm("Are You Sure? All data will be reset")) {
      setFriends([]);
      setTransactions([]);
    }
  };

  const handleSaveOccasion = async (name) => {
    if (!friends || friends.length === 0) {
      window.alert(
        "Your Friend List is empty, Please Add some Friends before Saving"
      );
      return;
    }
    if (!name || name.length === 0) {
      window.alert("Please Name the Occasion before Saving");
      return;
    }
    const body = {
      username: user,
      name: name,
      friends: friends,
      transactions: transactions,
    };
    const res = await saveOccasion(body);
    if (res) {
      setIsSaved(1);
      const occRes = await getOccasions({ username: user });
      setOccasions(occRes);
    }
  };

  const handleLogOut = () => {
    setUser("");
    setIsSaved(0);
  };

  return (
    <Box
      sx={{
        maxWidth: "1000px",
        height: "100vh",
        mx: "auto",
        padding: "10px",
        bgcolor: "#000000",
        border: "2px solid #66CCCC",
        overflowX: "hidden",
        boxShadow: "0px 0px 15px #66CCCC",
        borderRadius: "10px",
        color: "#FFFFFF",
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ flexWrap: "nowrap" }}
      >
        <Grid item>
          <RotateLeftIcon
            sx={{ cursor: "pointer", margin: "12px", color: "#FF69B4" }}
            onClick={() => reset()}
          />
        </Grid>
        <Grid item>
          {user && (
            <Grid container alignItems="center">
              <OccasionsMenu />
            </Grid>
          )}
        </Grid>
        <Grid item>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon sx={{ color: "#FF69B4" }} />
          </IconButton>
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: "#333333",
            color: "#FFFFFF",
            border: "2px solid #66CCCC",
            boxShadow: "0px 0px 10px #66CCCC",
          },
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            {!user ? (
              <>
                {Number(atHome) == 1 ? (
                  <></>
                ) : (
                  <ListItem
                    button
                    component="a"
                    href="/"
                    onClick={setAtHome(1)}
                  >
                    <ListItemButton>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                )}
                <ListItem
                  button
                  component="a"
                  href="/login"
                  onClick={setAtHome(0)}
                >
                  <ListItemButton>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="/register"
                  onClick={setAtHome(0)}
                >
                  <ListItemButton>
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      setDialogOpen(true);
                      setDrawerOpen(false);
                    }}
                  >
                    <ListItemText primary="Save" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={handleLogOut}>
                    <ListItemText primary="LogOut" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>

      <OccasionName
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={(name) => {
          handleSaveOccasion(name);
          setDialogOpen(false);
        }}
      />

      {/* <Box
        sx={{
          filter: invert === 0 ? "none" : "invert(1)",
        }}
      > */}
      <Routes>
        <Route exact path="/" element={<TabsContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* </Box> */}
    </Box>
  );
};
