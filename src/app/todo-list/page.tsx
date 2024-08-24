import { TodoList } from "@/modules/todoList/todoList";
import React from "react";

const TodoListPage = React.memo(() => {
  return <TodoList />;
});

export default TodoListPage;
