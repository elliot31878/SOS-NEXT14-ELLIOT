"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { routeNames } from "@/constant/routeNames";
import { useRouter } from "next/navigation";
import { AppBar } from "../appBar/appBar";
import store from "./@reduxStore";

import styles from "./cl.module.scss";
import { Drawer } from "@mui/material";
import { DrawerList } from "@/components/drawerList/drawerList";

const ClientHOCLayout: React.FC<React.PropsWithChildren<unknown>> = React.memo(
  ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = useCallback((newOpen: boolean) => {
      setOpen(newOpen);
    }, []);
    const routerNavigation = useRouter();

    useEffect(() => {
      if (window.location.pathname === "/")
        routerNavigation.push(routeNames.HOME);
    }, [routerNavigation]);

    return (
      <main className={styles["cl-main"]}>
        <Provider store={store}>
          <AppBar toggleDrawer={toggleDrawer} />
          <Drawer
            anchor="right"
            open={open}
            onClose={() => toggleDrawer(false)}
          >
            <DrawerList toggleDrawer={toggleDrawer} />
          </Drawer>
          {children}
        </Provider>
      </main>
    );
  }
);

export default ClientHOCLayout;
