import React from "react";
import { ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
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
  const theme = useTheme();

  return (
    <Link style={{ textDecoration: "none" }} href={link!}>
      <ListItem
        component="div"
        sx={{
          cursor: "pointer",
          borderRadius: 1,
          marginBottom: 1,
          padding: "4px 16px",
          backgroundColor: isSelected
            ? theme.palette.action.selected
            : "transparent",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            color: isSelected
              ? theme.palette.primary.main
              : theme.palette.text.primary,
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: "14px",
              color: isSelected
                ? theme.palette.primary.main
                : theme.palette.text.primary,
            },
          }}
        />
      </ListItem>
    </Link>
  );
};

export default SidebarMenuItem;
