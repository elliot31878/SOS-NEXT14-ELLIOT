import React, { useCallback, useEffect, useState } from "react";
import { getTodosDB, Todo } from "@/app/network/db/db";
import { CardTodo } from "@/components/cardTodo/cardTodo";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { isMobile } from "react-device-detect";
import { routeNames } from "@/constant/routeNames";
import { useNavigate } from "@/hooks/useNavigate";

import styles from "./todos.module.scss";

export const TodosSection = React.memo(() => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const isMobileQuery = useMediaQuery("(max-width:800px)");
  const navigation = useNavigate();

  const loadTodos = useCallback(async () => {
    const todosFromDB = await getTodosDB();
    setTodos(todosFromDB.splice(0, 5));
  }, []);
  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <main className={styles["todos"]}>
      <header className={styles["todos__header"]}>
        {!isMobile && !isMobileQuery ? (
          <Button
            onClick={() => {
              navigation(routeNames.TODO_LIST);
            }}
            variant="text"
            className={styles["todos__header--more"]}
          >
            نمایش همه
          </Button>
        ) : (
          <span />
        )}
        <Typography fontWeight={600} className={styles["todos__header--title"]}>
          تسک ها
        </Typography>
      </header>
      <article className={styles["todos__grid"]}>
        {todos.map((todo) => (
          <CardTodo key={todo.id} {...todo} />
        ))}
      </article>
    </main>
  );
});
