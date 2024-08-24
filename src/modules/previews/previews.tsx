"use client";
import React from "react";
import { ArticlesSection } from "./articles/articles";
import { TodosSection } from "./todos/todos";

import styles from "./previews.module.scss";

export const Previews = React.memo(() => {
  return (
    <main className={styles["previews"]}>
      <ArticlesSection />
      <TodosSection />
    </main>
  );
});
