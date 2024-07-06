import { Box } from "@mui/material";
import React from "react";
import { TabsContainer } from "./TabsContainer";

export const MainContainer = () => {
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
      <TabsContainer />
    </Box>
  );
};
