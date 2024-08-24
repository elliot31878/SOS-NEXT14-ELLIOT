"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  getTodosDB,
  Todo,
  addTodoDB,
  deleteTodoDB,
  updateTodoDB,
} from "@/app/network/db/db";
import { TodoComponent } from "@/components/todo/todo";
import { Button, TextField, Typography } from "@mui/material";

import styles from "./todoList.module.scss";

export const TodoList = React.memo(() => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [_, startTransition] = useTransition();
  const loadTodos = useCallback(async () => {
    const todosFromDB = await getTodosDB();
    setTodos(todosFromDB);
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = useCallback(async () => {
    if (newTodoTitle.trim() === "") return;
    await addTodoDB({ text: newTodoTitle, completed: false });
    setNewTodoTitle("");
    await loadTodos();
  }, [loadTodos, newTodoTitle]);

  const onDelete = async (id: number) => {
    await deleteTodoDB(id);
    await loadTodos();
  };

  const onComplete = useCallback(
    async (todo: Todo, checked: boolean) => {
      const cloneTodo = structuredClone(todo);
      cloneTodo.completed = checked;
      await updateTodoDB(Number(todo.id), cloneTodo);
      await loadTodos();
    },
    [loadTodos]
  );

  const onEdit = useCallback((todo: Todo) => {
    setEditingTodo(todo);
  }, []);

  const onSaveTodo = useCallback(async () => {
    if (editingTodo) {
      await updateTodoDB(Number(editingTodo.id), editingTodo);
      setEditingTodo(null);
      await loadTodos();
    }
  }, [editingTodo, loadTodos]);

  const onUpdate = useCallback((value: string) => {
    setEditingTodo((prev) => {
      const editedValue = structuredClone(prev);
      if (editedValue) {
        editedValue.text = String(value);
      }
      return editedValue;
    });
  }, []);

  return (
    <main className={styles["todo-list"]}>
      <Typography className={styles["todo-list__title"]} fontWeight={600}>
        Todo List
      </Typography>

      <header className={styles["todo-list__header"]}>
        <TextField
          type="text"
          className={styles["todo-list__header--input"]}
          value={newTodoTitle}
          onChange={(e) => {
            setNewTodoTitle(e.target.value);
            startTransition(() => {
              loadTodos().then(() => {
                setTodos((prev) => {
                  let clonePrev = structuredClone(prev);
                  clonePrev = clonePrev.filter((item) =>
                    item.text.includes(e.target.value)
                  );
                  return clonePrev;
                });
              });
            });
          }}
          placeholder="Add new todo"
          variant="outlined"
        />
        <Button
          variant="contained"
          className={styles["todo-list__header--button"]}
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </header>

      <ul className={styles["todo-list__todos"]}>
        {todos.map((todo) => (
          <TodoComponent
            key={todo.id}
            todo={todo}
            onCompleteTodo={onComplete}
            onDelete={onDelete}
            onEdit={onEdit}
            onSave={onSaveTodo}
            onUpdate={onUpdate}
            editableTodo={editingTodo as Todo}
          />
        ))}
      </ul>
    </main>
  );
});
