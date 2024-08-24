import React from "react";
import Image from "next/image";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "@/hooks/useNavigate";
import { useLocation } from "@/hooks/useLocation";
import { useLoaderImage } from "@/hooks/useLoaderImage";
import { APP_BAR_ITEMS, SOS_LINK } from "@/constant/appbar-items";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./appbar.module.scss";

export type AppBarProps = {
  toggleDrawer: (isOpen: boolean) => void;
};

export const AppBar: React.FC<AppBarProps> = React.memo(({ toggleDrawer }) => {
  const loader = useLoaderImage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobileQuery = useMediaQuery("(max-width:800px)");

  return (
    <header className={styles["app-bar"]}>
      {APP_BAR_ITEMS.map((item) => {
        switch (item.type) {
          case "contained":
          case "text":
            return (
              <Button
                onClick={() => {
                  if (item.route) {
                    navigate(item.route);
                  }
                }}
                className={`
                 ${
                   styles[
                     item.type === "text" ? "app-bar__typo" : "app-bar__button"
                   ]
                 }
                 ${
                   styles[
                     item.route === pathname ? "app-bar__typo--active" : ""
                   ]
                 }
                `}
                variant={item.type}
              >
                {item.text}
              </Button>
            );

          case "icon":
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  loader={loader}
                  width={100}
                  height={70}
                  src={SOS_LINK}
                  alt="SOS"
                />
                {isMobileQuery && (
                  <Button onClick={() => toggleDrawer(true)}>
                    <MenuIcon />
                  </Button>
                )}
              </Box>
            );
        }
      })}
    </header>
  );
});
