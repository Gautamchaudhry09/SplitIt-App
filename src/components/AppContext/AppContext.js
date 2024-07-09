import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { TabsContainer } from "./TabsContainer";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { AccountContext } from "../AppContext/AppContext";

export const MainContainer = () => {
  const { setFriends, setTransactions } = useContext(AccountContext);
  const [invert, setInvert] = useState(0);

  const reset = () => {
    if (
      window.confirm(
        "Are You Sure? All data will be reset and everything will be erased"
      )
    ) {
      setFriends([]);
      setTransactions([]);
      localStorage.clear();
    }
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
      {invert == 0 ? (
        <>
          <LightModeIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setInvert(1)}
          />
        </>
      ) : (
        <>
          <Brightness4Icon
            sx={{ cursor: "pointer" }}
            onClick={() => setInvert(0)}
          />
        </>
      )}
      <RotateLeftIcon sx={{ cursor: "pointer" }} onClick={reset} />

      <Box
        sx={{
          filter: `invert(${invert})`,
        }}
      >
        <TabsContainer />
      </Box>
    </Box>
  );
};
