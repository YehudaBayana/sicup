import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

interface SidebarMenuItemProps {
  text?: string;
  icon?: React.ReactNode;
  link?: string;
  isSelected: boolean;
  onClick: () => void;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  text,
  icon,
  link,
  isSelected,
  onClick,
}) => {
  return (
    <Link style={{ textDecoration: "none" }} href={link!}>
      <ListItem
        component="div"
        sx={{
          cursor: "pointer",
          borderRadius: 1,
          marginBottom: 1,
          padding: "4px 16px",
          backgroundColor: isSelected ? "#616161" : "transparent",
          "&:hover": {
            backgroundColor: "#757575",
          },
        }}
        onClick={onClick}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: "14px",
              color: "#fff",
            },
          }}
        />
      </ListItem>
    </Link>
  );
};

export default SidebarMenuItem;
