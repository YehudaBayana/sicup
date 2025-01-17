import React from "react";
import { Box, InputBase, IconButton, useTheme } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const SidebarSearch = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.text.primary,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        paddingLeft: 2,
        // marginBottom: 3,
      }}
    >
      <InputBase
        placeholder="Search"
        sx={{
          flex: 1,
          color: theme.palette.background.default,
          "&::placeholder": {
            color: theme.palette.background.paper,
          },
        }}
      />
      <IconButton>
        <SearchIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>
    </Box>
  );
};

export default SidebarSearch;
