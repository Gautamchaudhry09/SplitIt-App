import { Box } from "@mui/material";
import React, { useState } from "react";
import { TabsContainer } from "./TabsContainer";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
export const MainContainer = () => {
  const [invert, setInvert] = useState(0);

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
