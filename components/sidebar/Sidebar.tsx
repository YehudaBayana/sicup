"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SidebarLogo from "./SidebarLogo";
import SidebarSearch from "./SidebarSearch";
import SidebarMenu from "./SidebarMenu";
import { menuItems } from "./MenuItems";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // Render nothing on the server
  }

  return (
    <Box
      sx={{
        width: 240,
        height: "100%",
        backgroundColor: "#424242",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "auto",
      }}
    >
      <SidebarLogo />
      <SidebarSearch />
      <SidebarMenu
        menuItems={menuItems}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
      />
    </Box>
  );
};

export default Sidebar;
