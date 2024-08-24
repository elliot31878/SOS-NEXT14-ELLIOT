import { routeNames } from "@/constant/routeNames";
import { useNavigate } from "@/hooks/useNavigate";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";

export interface IDrawerList {
  toggleDrawer: (state: boolean) => void;
}

export const DrawerList: React.FC<IDrawerList> = React.memo(
  ({ toggleDrawer }) => {
    const navigate = useNavigate();

    return (
      <Box
        component={"main"}
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
      >
        <List>
          {["صفحه اصلی", "ُTodo List"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                key={text}
                onClick={() => {
                  if (text.includes("ُTodo")) {
                    navigate(routeNames.TODO_LIST);
                  } else {
                    navigate(routeNames.HOME);
                  }
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["سوال های متداول", "شعبه های ما", "مراکز خدمات درمانی"].map(
            (text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Box>
    );
  }
);
