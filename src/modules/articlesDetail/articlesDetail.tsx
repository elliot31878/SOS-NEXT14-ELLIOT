"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../clientLayout/@reduxStore";
import { UnknownAction } from "@reduxjs/toolkit";
import { fetchDoctorsRequest } from "@/app/@redux/actions/actions";
import { useLocation } from "@/hooks/useLocation";
import { Doctor } from "@/app/@redux/actions/@types";
import Image from "next/image";
import { Typography } from "@mui/material";
import { useLoaderImage } from "@/hooks/useLoaderImage";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TextSample } from "@/constant/text";

import styles from "./article.detail.module.scss";

export const ArticleDetail = React.memo(() => {
  const { params } = useLocation();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.doctor);
  const loader = useLoaderImage();

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

  const doctor = useMemo(() => {
    const articleId = params["article-id"];

    return (selector.doctors as Doctor[]).find((item) => item.id === articleId);
  }, [params, selector.doctors]);

  const subtitle = useRef<string>(TextSample);

  const images = [
    {
      name: "whale",
    },
    {
      name: "elephants",
    },
    {
      name: "honey-bee",
    },
    {
      name: "arctic-fox",
    },
  ];

  if (!doctor) return null;

  return (
    <section className={styles["article"]}>
      <Image
        className={styles["article__image"]}
        alt={String(doctor.title)}
        loader={loader}
        fill
        src={String(doctor.avatar)}
      />
      <article className={styles["article__detail"]}>
        <Typography className={styles["article__detail--title"]}>
          {doctor.title}
        </Typography>
        <section className={styles["article__detail--clock"]}>
          <Typography className={styles["article__detail--clock--time"]}>
            5 دقیقه
          </Typography>
          <AccessTimeIcon className={styles["article__detail--clock--icon"]} />
        </section>
        <Typography
          variant="subtitle1"
          className={styles["article__detail--subtitle"]}
        >
          {subtitle.current}
        </Typography>
        <section className={styles["article__detail--images"]}>
          {images.map((image) => {
            return (
              <Image
                width={456}
                height={256}
                key={String(image.name)}
                loader={loader}
                src={`/assets/images/${image.name}.webp`}
                alt="whale"
              />
            );
          })}
        </section>
      </article>
    </section>
  );
});
