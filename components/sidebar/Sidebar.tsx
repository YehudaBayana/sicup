"use client";
import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import SidebarLogo from "./SidebarLogo";
import SidebarSearch from "./SidebarSearch";
import SidebarMenu from "./SidebarMenu";
// import { menuItems } from "./MenuItems";
import { SIDEBAR_WIDTH } from "../../utils/constants";
import { colors } from "../../app/theme";
import { useMenuItems } from "./MenuItems";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [hydrated, setHydrated] = useState(false);
  const menuItems = useMenuItems();
  const theme = useTheme();
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // Render nothing on the server
  }

  return (
    <Box
      bgcolor={colors.background.paper}
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "auto",
        borderRight: `2px solid ${theme.palette.divider}`,
        zIndex: 10,
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
