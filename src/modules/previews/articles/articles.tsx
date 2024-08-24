"use client";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Doctor } from "@/app/@redux/actions/@types";
import { fetchDoctorsRequest } from "@/app/@redux/actions/actions";
import { Card } from "@/components/card/card";
import { RootState } from "@/modules/clientLayout/@reduxStore";
import { UnknownAction } from "@reduxjs/toolkit";
import { Button, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useNavigate } from "@/hooks/useNavigate";
import { routeNames } from "@/constant/routeNames";

import styles from "./articles.module.scss";

export type ArticlesSectionType = {
  isMore?: boolean;
};

export const ArticlesSection: React.FC<ArticlesSectionType> = React.memo(
  ({ isMore }) => {
    const dispatch = useDispatch();
    const selector = useSelector((state: RootState) => state.doctor);
    const navigation = useNavigate();
    const isMobileQuery = useMediaQuery("(max-width:800px)");
    useEffect(() => {
      dispatch(fetchDoctorsRequest() as UnknownAction);
      const onOnline = () => {
        console.log(
          "%c  network change to Online...",
          "background:#4CAF50; color:#fff"
        );
        setTimeout(() => {
          dispatch(fetchDoctorsRequest() as UnknownAction);
          clearTimeout(this);
        }, 500);
      };
      const onOffline = () => {
        console.log(
          "%c  network change to Offline...",
          "background:#4CAF50; color:#fff"
        );
      };

      window?.addEventListener?.("online", onOnline);
      window?.addEventListener?.("offline", onOffline);
      return () => {
        window?.removeEventListener("online", onOnline);
        window?.removeEventListener("offline", onOffline);
      };
    }, [dispatch]);

    const doctors = useMemo(() => {
      return isMore ? selector?.doctors : selector?.doctors.slice(0, 5);
    }, [isMore, selector?.doctors]);

    const mockItems = useMemo(
      () => (isMore ? [0, 1, 2, 3, 4, 5, 6, 7] : [0, 1, 2, 3, 4]),
      [isMore]
    );

    return (
      <main className={styles["articles"]}>
        <header className={styles["articles__header"]}>
          {!isMobile && !isMobileQuery && !isMore ? (
            <Button
              onClick={() => {
                navigation(routeNames.ARTICLES);
              }}
              variant="text"
              className={styles["articles__header--more"]}
            >
              نمایش همه
            </Button>
          ) : (
            <span />
          )}
          <Typography
            fontWeight={600}
            className={styles["articles__header--title"]}
          >
            مقاله ها
          </Typography>
        </header>
        <article className={styles["articles__grid"]}>
          {selector.loading ? (
            <>
              {mockItems.map((mock) => (
                <Skeleton
                  key={String(mock)}
                  width={"25rem"}
                  height={"23rem"}
                  style={{ transform: "unset" }}
                />
              ))}
            </>
          ) : (
            doctors.map((item: Doctor) => {
              return <Card key={item.id} {...item} />;
            })
          )}
          {isMobile ||
            (isMobileQuery && !isMore && (
              <Button
                variant="outlined"
                className={styles["articles__grid--more"]}
                onClick={() => {
                  navigation(routeNames.ARTICLES);
                }}
              >
                بیشتر
              </Button>
            ))}
        </article>
      </main>
    );
  }
);
