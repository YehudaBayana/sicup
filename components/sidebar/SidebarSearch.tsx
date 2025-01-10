import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const SidebarSearch = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#616161",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        paddingX: 1,
        marginBottom: 3,
      }}
    >
      <InputBase placeholder="Search" sx={{ color: "#fff", flex: 1 }} />
      <IconButton>
        <SearchIcon sx={{ color: "#fff" }} />
      </IconButton>
    </Box>
  );
};

export default SidebarSearch;
