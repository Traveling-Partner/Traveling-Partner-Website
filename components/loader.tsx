// app/components/loader.tsx
"use client";

import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const CircularIndeterminate: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "linear-gradient(to bottom, #fce001, #fdb813)",
      }}
    >
      <CircularProgress
        size={70}
        thickness={2}
        sx={{
          color: "#fdb813",
        }}
      />
    </Box>
  );
};

export default CircularIndeterminate;