import { Todo } from "@/app/network/db/db";
import React, { useMemo } from "react";
import { Button, Checkbox, TextField, Typography } from "@mui/material";

import styles from "./todo.module.scss";

export interface ITodoProps {
  todo: Todo;
  editableTodo?: Todo;
  onUpdate: (value: string) => void;
  onSave: () => void;
  onCompleteTodo: (todo: Todo, isCompleted: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}
export const TodoComponent: React.FC<ITodoProps> = React.memo((props) => {
  const todo = useMemo(() => props.todo, [props.todo]);
  const editingTodo = useMemo(() => props.editableTodo, [props?.editableTodo]);
  return (
    <li key={todo.id} className={styles["todo"]}>
      {editingTodo?.id === todo.id ? (
        <>
          <TextField
            className={styles["todo__textfiled"]}
            type="text"
            value={editingTodo?.text}
            onChange={(e) => props?.onUpdate(e.target.value)}
          />
          <Button
            variant="contained"
            className={styles["todo__save"]}
            onClick={props?.onSave}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <header className={styles["todo__header"]}>
            <Checkbox
              defaultChecked={todo.completed}
              value={todo.completed}
              onChange={(checkbox) => {
                props.onCompleteTodo(todo, checkbox.target.checked as boolean);
              }}
            />
            <Typography
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              noWrap
              className={styles["todo__header--title"]}
            >
              {todo.text}
            </Typography>
          </header>
          ‍
          <section className={styles["todo__content"]}>
            <Button
              className={styles["todo__content--edit"]}
              variant="contained"
              onClick={() => props.onEdit(todo)}
            >
              Edit
            </Button>
            <Button
              className={styles["todo__content--delete"]}
              variant="contained"
              onClick={() => props.onDelete(todo.id!)}
            >
              Delete
            </Button>
          </section>
        </>
      )}
    </li>
  );
});
