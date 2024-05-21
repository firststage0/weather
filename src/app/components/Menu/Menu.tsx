"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";

export const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleListItemClick = (text: any, index: number) => {
    switch (index) {
      case 0:
        router.push("/signin");
    }
  };
  const itemsList: string[] = [
    "Profile",
    "Favorites",
    "Settings",
    "Contact information",
    "Exit",
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {itemsList.map((text, index: number) => (
          <>
            <ListItem
              key={text}
              onClick={(text) => handleListItemClick(text, index)}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>{/* TODO: Добавить иконки */}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            {index === 1 && <Divider />}
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Menu</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
