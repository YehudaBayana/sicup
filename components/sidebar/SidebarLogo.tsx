import React from "react";
import { Box, Typography } from "@mui/material";

const SIDEBAR_ICON_COLOR = "#A06BAF";

const SidebarLogo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 3,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          backgroundColor: SIDEBAR_ICON_COLOR,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 1,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
          Sic-up
        </Typography>
      </Box>
    </Box>
  );
};

export default SidebarLogo;
