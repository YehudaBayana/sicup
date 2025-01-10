import React from "react";
import { List, Divider, Typography } from "@mui/material";
import SidebarMenuItem from "./SidebarMenuItem";

interface MenuItem {
  text?: string;
  icon?: React.ReactNode;
  divider?: boolean;
  header?: string;
  link?: string;
}

interface SidebarMenuProps {
  menuItems: MenuItem[];
  selectedItem: string;
  onSelect: (item: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  menuItems,
  selectedItem,
  onSelect,
}) => {
  return (
    <List sx={{ width: "100%" }}>
      {menuItems.map((item, index) => {
        if (item.divider) {
          return (
            <Divider key={index} sx={{ borderColor: "#757575", marginY: 2 }} />
          );
        }

        if (item.header) {
          return (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: "#bdbdbd",
                textTransform: "uppercase",
                marginLeft: 2,
                marginBottom: 1,
              }}
            >
              {item.header}
            </Typography>
          );
        }

        return (
          <SidebarMenuItem
            key={index}
            text={item.text}
            icon={item.icon}
            link={item.link}
            isSelected={selectedItem === item.text}
            onClick={() => onSelect(item.text || "")}
          />
        );
      })}
    </List>
  );
};

export default SidebarMenu;
