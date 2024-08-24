import { openDB, IDBPDatabase } from "idb";

export interface Todo {
  id?: number;
  text: string;
  completed: boolean;
}

export const DB_NAME = "todo-db-sos";
export const STORE_NAME = "todos-sos";
export const VERSION = 1;

export async function initDB(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function getTodosDB(): Promise<Todo[]> {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function addTodoDB(todo: Todo): Promise<IDBValidKey> {
  const db = await initDB();
  return db.add(STORE_NAME, todo);
}

export async function updateTodoDB(
  id: number,
  updatedTodo: Todo
): Promise<IDBValidKey> {
  const db = await initDB();
  return db.put(STORE_NAME, { ...updatedTodo, id });
}

export async function deleteTodoDB(id: number): Promise<void> {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}
