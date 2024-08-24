import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "@/hooks/useNavigate";
import { routeNames } from "@/constant/routeNames";
import { Todo } from "@/app/network/db/db";

import styles from "./card.todo.module.scss";

export const CardTodo: React.FC<Todo> = React.memo((todo) => {
  const navigate = useNavigate();
  return (
    <section className={styles["card"]}>
      <div
        className={`${styles["card__image"]} ${todo.completed ? styles["card__image--completed"] : ""}`}
      />
      <article className={styles["card__todo"]}>
        <Typography className={styles["card__todo--title"]}>
          {todo.text}
        </Typography>

        <Typography className={styles["card__todo--subtitle"]}>
          {`Todo status is ${todo.completed ? "completed" : "in progress"}`}
        </Typography>
        <Button
          onClick={() => {
            navigate(routeNames.TODO_LIST);
          }}
          variant="outlined"
          className={styles["card__todo--more"]}
        >
          ویرایش
        </Button>
      </article>
    </section>
  );
});
