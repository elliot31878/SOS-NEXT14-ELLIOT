import React from "react";
import { useLoaderImage } from "@/hooks/useLoaderImage";
import { Button, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Image from "next/image";
import { Doctor } from "@/app/@redux/actions/@types";
import { useNavigate } from "@/hooks/useNavigate";
import { routeNames } from "@/constant/routeNames";

import styles from "./card.module.scss";

export const Card: React.FC<Doctor> = React.memo((doctor) => {
  const loader = useLoaderImage();
  const navigate = useNavigate();
  return (
    <section className={styles["card"]}>
      <Image
        className={styles["card__image"]}
        alt={String(doctor.title)}
        loader={loader}
        width={316}
        height={158}
        src={String(doctor.avatar)}
      />
      <article className={styles["card__article"]}>
        <Typography className={styles["card__article--title"]}>
          {doctor.title}
        </Typography>
        <section className={styles["card__article--clock"]}>
          <Typography className={styles["card__article--clock--time"]}>
            5 دقیقه
          </Typography>
          <AccessTimeIcon className={styles["card__article--clock--icon"]} />
        </section>
        <Typography className={styles["card__article--subtitle"]}>
          {doctor.subtitle}
        </Typography>
        <Button
          onClick={() => {
            navigate(routeNames.navigateToArticle(doctor.id));
          }}
          variant="outlined"
          className={styles["card__article--more"]}
        >
          ادامه
        </Button>
      </article>
    </section>
  );
});
