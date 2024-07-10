import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  Input,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { TabsContainer } from "./TabsContainer";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { AccountContext } from "../AppContext/AppContext";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { getOccasions, saveOccasion } from "../../service/api";
import { OccasionsMenu } from "../Menu/OccasionsMenu";
import { OptionsMenu } from "../Menu/OptionsMenu";

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
  const [name, setName] = useState("");

  const reset = () => {
    if (user) {
      if (isSaved) {
        if (
          window.confirm(
            "Are You Sure? All data will be reset, but you can always come back here from the Saved Splits Menu"
          )
        ) {
          setName("");
          setFriends([]);
          setTransactions([]);
          setIsSaved(0);
        }
      } else if (
        window.confirm(
          "You haven't saved the current Occasion's Split, Do you wish to continue to a new Split? *If you click on OK, ALL DATA of this split will be discarded* (IGNORE IF YOU ALREADY SAVED THE LATEST ENTRIES SOMETIME EARLIER)"
        )
      ) {
        setName("");
        setFriends([]);
        setTransactions([]);
        setIsSaved(0);
      }
    } else if (window.confirm("Are You Sure? All data will be reset")) {
      setName("");
      setFriends([]);
      setTransactions([]);
    }
  };

  const handleSaveOccasion = async () => {
    if (!friends || friends.length == 0) {
      window.alert(
        "Your Friend List is empty, Please Add some Friends before Saving"
      );
      return;
    }
    if (!name || name.length == 0) {
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
      // console.log("onSave occRes", occRes);
      // console.log("onSave occasions", occasions);
    }
  };

  const handleLogOut = () => {
    setUser("");
    setIsSaved(0);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsSaved(0);
  };

  return (
    <Box
      sx={{
        maxWidth: "450px",
        mx: "auto",
        my: "20px",
        padding: "10px",
        bgcolor: "grey",
        border: "1px solid black",
        overflowX: "hidden",
        boxShadow: "3px 3px 10px black",
        borderRadius: "10px",
      }}
    >
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        sx={{ flexWrap: "nowrap" }}
      >
        <Grid container sx={{ maxWidth: "50px" }}>
          {invert == 0 ? (
            <>
              <LightModeIcon
                sx={{ cursor: "pointer", margin: "5px" }}
                onClick={() => setInvert(1)}
              />
            </>
          ) : (
            <>
              <Brightness4Icon
                sx={{ cursor: "pointer", margin: "5px" }}
                onClick={() => setInvert(0)}
              />
            </>
          )}
          <RotateLeftIcon
            sx={{ cursor: "pointer", margin: "5px" }}
            onClick={() => reset()}
          />
        </Grid>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ flexWrap: "nowrap" }}
        >
          {!user ? (
            <>
              {Number(atHome) ? (
                <></>
              ) : (
                <>
                  <Button
                    variant="contained"
                    onClick={() => setAtHome(1)}
                    sx={{ margin: "10px" }}
                    href="/"
                  >
                    Home
                  </Button>
                </>
              )}
              <Button
                variant="contained"
                onClick={() => setAtHome(0)}
                sx={{ margin: "10px" }}
                href="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{ margin: "10px" }}
                href="/register"
                onClick={() => setAtHome(0)}
              >
                Register
              </Button>
            </>
          ) : (
            <Grid container justifyContent="space-around" alignItems="center">
              <Input
                placeholder="Name the Occasion"
                sx={{ color: "white", fontSize: "18px", width: "80%" }}
                value={name}
                onChange={handleNameChange}
              />
              <ButtonGroup>
                <OptionsMenu
                  handleSaveOccasion={handleSaveOccasion}
                  handleLogOut={handleLogOut}
                />
                <OccasionsMenu />
              </ButtonGroup>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          filter: `invert(${invert})`,
        }}
      >
        <Routes>
          <Route exact path="/" element={<TabsContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </Box>
  );
};
